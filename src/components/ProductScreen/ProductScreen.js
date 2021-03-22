'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import {
  StyleSheet, TouchableOpacity,  View,
} from 'react-native';
import {
  Container, Header, Title, Subtitle, Content, Button, Left, Right, Body, Icon,
  Text, List, ListItem, Thumbnail, Footer
} from 'native-base';
import { everyStyles, Submit, URL, formatPrice, Reload } from '../Container'


class ProductScreen extends Component {
   static navigationOptions = { header: null }
  state = {
    isCount: 0,
    isProducts: [],
    isReload: false
  }

  componentDidMount() {
    this._onReceiveValProducts()
  }

  _onReceiveValProducts = async () => {
      try {
        let results = await AsyncStorage.getItem('#sign')
        let params = JSON.parse(results)
        let response = await axios.get(`${URL}productall/${params.data.outlet_id}`)
        if (_.isEmpty(response.data)) return
        this.setState({
          isProducts: response.data,
          isReload: false
        })
      } catch(e) {
        console.log(e);
      }
    }

    _onReload = () => {
      this.setState({
        isReload: true,
      }, () => this._onReceiveValProducts())
    }

   _renderProduct_ = () => {
      let { isProducts } = this.state;
      let { navigation } = this.props;
      return _.map(isProducts, (item, i) => {
        let {
          gambar_product, harga_jual_product, id_product, nama_product,
          keterangan_product, stock_product
        } = item
        return (
          <View key={i}>
            <List>
            <ListItem thumbnail last>
              <Left>
                <Thumbnail square source={{ uri: gambar_product }} />
              </Left>
              <Body>
            <TouchableOpacity onPress={() => navigation.navigate('DetailCashier',
              {id:id_product })
          }>
               <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text>{nama_product}</Text>
                </View>
                <Text note numberOfLines={1}>{keterangan_product}</Text>
            </TouchableOpacity>
              </Body>
              <Right>
                <Text style={styles.textPrice}>Rp.{formatPrice(harga_jual_product)}</Text>
              </Right>
            </ListItem>
          </List>
          </View>
        )
      })
    }
  render() {
    let { navigation } =  this.props;
    return (
       <Container style={{paddingTop: 24}}>
       <Reload
       refreshing={this.state.isReload}
       onRefresh={this._onReload}
       >
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
        <Content>
        {this._renderProduct_()}
        </Content>
        </Reload>
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
        marginTop: 12,
        marginLeft: 12,
        fontStyle: 'italic',
        fontFamily: 'roboto'
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
      marginLeft: 135,
      fontSize: 19,
      paddingTop: 14,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontFamily: 'roboto'
    },
    textSnack: {
      paddingLeft: 18,
      paddingTop: 14,
      fontSize: 19,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'roboto'
    },
});


export default ProductScreen;
