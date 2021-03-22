'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import _ from 'lodash'
import {
  StyleSheet, TouchableOpacity,  View, ToastAndroid
} from 'react-native';
import {
  Container, Header, Title, Subtitle, Content, Button, Left, Right, Body, Icon,
  Text, List, ListItem, Thumbnail, Footer
} from 'native-base';
import { everyStyles, Submit, URL, formatPrice } from '../Container'


export default class DetailCashier extends Component {
  state = {
    isCount: 0,
    isSetPrice: 0,
    isIcon: false,
    isValProduct: []
  }

  componentDidMount() {
    this._onReceiveDetailProduct()
  }

  _onReceiveDetailProduct = async () => {
    try {
      const { navigation } = this.props;
      const val = navigation.getParam('id')
      let uri = `${URL}product/${val}`
      let response = await axios.get(uri)
      if (_.isEmpty(response.data)) return
      this.setState({ isValProduct: response.data })
    } catch(e) {
      console.log(e);
    }
  }

  _onMainDecrement = () => {
    let { isValProduct } = this.state;
    if (this.state.isCount < 1) return;
    return _.map(isValProduct, item => {
      this.setState({
        isCount: this.state.isCount - 1,
        isSetPrice: (item.harga_jual_product) * (this.state.isCount - 1),
        isSnackbar: true,
        isIcon: false
      })
    })
  }

  _onMainIncrement = () => {
    let { isValProduct, isCount } = this.state;
    let isStock = _.get(isValProduct[0], 'stock_product_outlet')
    let isPrice = _.get(isValProduct[0], 'harga_jual_product')
        this.setState({
          isCount: this.state.isCount + 1,
          isSetPrice: (isPrice) * (isCount + 1),
          isSnackbar: true
        }, () => {
          if (_.isEqual(isCount, isStock)) {
            ToastAndroid.show(`Stock Kurang Dari ${isStock}`, ToastAndroid.SHORT)
            console.log(isCount)
            this.setState({
              isCount: isCount,
              isIcon: true,
            })
          }
        })



  }

  _onSaveValueCart = async () => {
    try {
      let { isValProduct, isCount, isSetPrice } = this.state;
      let { navigation } = this.props;
      if (_.isEqual(isCount, 0)) return ToastAndroid.show("Data Can`t be Empty", ToastAndroid.SHORT)
      return _.map(isValProduct, async item => {
        let items = {
          id_outlet: item.outletid,
          product: item.id_product,
          harga_satuan: item.harga_jual_product,
          jumlah: isCount
        }
        let response = await axios.post(`${URL}cart/save`, items)
        if (_.isEqual(response.status, 200)) {
          ToastAndroid.show(`Berhasil menambahkan ke cart`, ToastAndroid.SHORT)
          setTimeout(() => navigation.navigate('Cart'), 800)
        }
      })
    } catch(error) {
      alert(error)
    }
  }


  _onRenderMain = () => {
    let { isValProduct } = this.state;
    return _.map(isValProduct, (item, i) => {
      let {
        gambar_product, harga_jual_product, id_product, keterangan_product,
        nama_product, stock_product_outlet
      } = item;
      return (
        <View key={i}>
          <List >
            <View style={{ alignContent: 'center', alignItems: 'center', backgroundColor: '#fff',  }}>
              <Thumbnail
                square source={{ uri: gambar_product }}
                style= {{ width: 360, height: 250, marginTop: 6, marginBottom: 6 }}
                resizeMode='contain'
              />
            </View>
            <ListItem thumbnail last style={{backgroundColor: '#fff'}}>
              <Left>
                <Text style={{ fontWeight: '800', fontSize: 24, marginLeft: 18 }}>{nama_product}</Text>
              </Left>
              <Body/>
              <Right>
                <Text style={styles.textPrice} >Rp. {formatPrice(harga_jual_product)}</Text>
              </Right>
            </ListItem>
          </List>
          <View style={styles.infoStyle}>
            <Text style={styles.textInfo}>Keterangan: </Text>
            <Text note style={styles.textDInfo}>Sisa Stock: {stock_product_outlet}</Text>
            <Text note style={styles.textDInfo}>{keterangan_product}</Text>
          </View>
          <View style={styles.styleCount}>
            <Icon
              onPress={this._onMainDecrement}
              name="remove" style={styles.icon} />
            <Text style={styles.textIcon}>{this.state.isCount}</Text>
            {
              this.state.isIcon ?  <Text style={styles.textIcon}></Text>:
              <Icon
              onPress={this._onMainIncrement}
              name="ios-add-circle-outline" style={styles.icon}/>

            }

          </View>
        </View>
      )
    })
  }
  render() {
    let { navigation } =  this.props;
    return (
       <Container style={everyStyles.contentStyle, {marginTop: 24}}>
        <Header style={everyStyles.headerStyles}>
          <Left>
            <Button
            onPress={() => navigation.navigate('Dashboard')}
            transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Produk</Title>
          </Body>
          <Right />
        </Header>
        <Content style={everyStyles.contentStyle}>
        {this._onRenderMain()}
        </Content>
        <TouchableOpacity
        onPress={this._onSaveValueCart}
        style={styles.viewSnack}>
        <Text style={styles.textSnack}>{this.state.isCount} Add Cart</Text>
        <Text style={styles.textSnacks}>Rp. {this.state.isSetPrice}</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textIcon: {
        fontSize: 17,
        marginLeft: 9,
        marginRight: 9,
        alignItems: 'center',
        fontWeight: '800',
        fontFamily: 'roboto'
      },
      textInfo: {
        fontSize: 21,
        marginTop: 12,
        marginLeft: 12,
        fontWeight: '600',
        fontStyle: 'italic',
        fontFamily: 'roboto'
      },
      textDInfo: {
        fontSize: 16,
        // marginTop: 12,
        marginLeft: 12,
        fontStyle: 'italic',
        fontFamily: 'roboto'
      },
      textPrice: {
        fontWeight: '800',
        fontSize: 22,
        color: 'green',
        fontStyle: 'italic'
      },
      infoStyle: {
        marginTop: 12,
        backgroundColor: '#fff',
        borderRadius: 14
      },
      styleCount: {
        flex:1,
        // marginTop: 10,
        height: 110,
        backgroundColor: '#fff',
        alignContent: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: "center",
        alignItems: "center",
      },
      textIcon: {
        fontSize: 46,
        fontWeight: '800'
      },
      icon: {
        fontSize: 50,
        padding: 22,
        color: '#7400e7'
    },
    viewSnack: {
      marginLeft: 17,
      marginRight: 17,
      marginBottom: 6,
      height: 50,
      borderRadius: 15,
      flexDirection:'row',
      flexWrap:'wrap',
      alignContent: 'center',
      backgroundColor: '#7400e7',
    },
    textSnacks: {
      marginLeft: 110,
      fontSize: 18,
      paddingTop: 12,
      alignContent: 'center',
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontFamily: 'roboto'
    },
    textSnack: {
      paddingLeft: 14,
      paddingTop: 12,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'roboto'
    },
});
