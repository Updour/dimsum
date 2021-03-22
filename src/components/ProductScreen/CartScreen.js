'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet, CheckBox, View, TouchableOpacity, ToastAndroid, Alert
} from 'react-native';
import {
    Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body,
    Right, Button, Title, Icon, Footer, Label, Input, Form, Item, FooterTab
} from 'native-base';
import { everyStyles, Submit, URL, formatPrice, Reload } from '../Container'


export default class CartScreen extends Component {
    state = {
        isCheck: false,
        isReload: false,
        isShow: false,
        isTotalBuy: '',
        isBuyBack: '',
        isChange: '',
        isOrder: ''
    }

    componentDidMount() {
        this._onRetrieveDataStorage()
    }

    _onRetrieveDataStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('#sign')
            let parsing = JSON.parse(val)
            let response =  await axios.get(`${URL}listcart/${parsing.data.outlet_id}`)
            this.setState({
              isOutlet: parsing.data.outlet_id,
              isCart: response.data,
              isReload: false
            }, () => this._onCheckingValtoChange())
        } catch(e) {
            console.log(e);
        }
    }


    _onCheckingValtoChange = async (val) => {
      let { isCart } = this.state;
      if (_.isEqual(isCart.length, 1)) {
        this.setState({
          isTotalBuy: _.get(isCart[0], 'total_pesan'),
          isCheck: true,
        })
      } else {
        let isReduce = isCart.reduce((a, b) => ({price: Number(a.total_pesan) + Number(b.total_pesan) }));
        this.setState({
          isTotalBuy: isReduce.price,
          isCheck: true,
        })
      }

    }

    _onProcessCheckOut = async () => {
      let { isCart, isChange, isBuyBack, isTotalBuy } = this.state;
      if (_.isEmpty(isBuyBack)) return ToastAndroid.show("Form Can`t be Empty", ToastAndroid.SHORT)
      let item = {
        outlet: this.state.isOutlet,
        total: isTotalBuy,
        bayar: isBuyBack,
        kembali: isChange
      }

      let response = await axios.post(`${URL}/product/getnota`, item)
        if (_.isEqual(response.status, 200)) {
          return _.map(isCart, async item => {
           let items = {
            no_nota: response.data.no_nota,
            id_outlet: item.outletid,
            id_product: item.kode_product,
            jumlah_product: item.jumlah_pesan,
            harga_satuan: item.harga_jual_product,
            harga_total: item.total_pesan
          }
          let results = await axios.post(`${URL}/product/save`, items)
          if (_.isEqual(results.status, 200)) {
           ToastAndroid.show("Data Successfully inserted", ToastAndroid.SHORT)
           await AsyncStorage.removeItem('cartItem')
           setTimeout(() => this.props.navigation.navigate('Dashboard'), 800);
         }
       })
      }else {
        ToastAndroid.show(`Internal Error ${response.data}`, ToastAndroid.SHORT)
      }
    }

    _onChangeValueCount = async (val, vol) => {
      let response = await axios.get(`${URL}detailcart/${val}/${vol}`)
      this.setState({
        isShow: true,
        isIdKode: response.data.kode_product,
        isIdOutlet: response.data.outletid,
        isIdSell: response.data.harga_jual_product,
        isIdUname: response.data.nama_product,
        isIdOrder: response.data.jumlah_pesan,
        isIdTotal: response.data.total_pesan
      })
    }

    /*change data chart*/
    _onChangeValueStock = async () => {
      let { isShow, isIdSell, isIdKode, isIdOutlet, isIdOrder } = this.state;
      // if (isIdOrder) {}
      console.log(isIdOrder)
      let items = {
         id_outlet: isIdOutlet,
         product: isIdKode,
         jumlah: isIdOrder,
         harga_satuan: isIdSell
      }
      let results = await axios.post(`${URL}/cart/edit`, items)
      if (_.isEqual(results.status, 200)) {
        this._onRetrieveDataStorage()
        this.setState({
          isShow: false
        }, () => ToastAndroid.show(`${results.data}`, ToastAndroid.SHORT))
      }else {
        ToastAndroid.show(`Internal error ${results.data}`, ToastAndroid.SHORT)
      }
    }

    /*remove data cart*/
    _onRemoveValueStock = async () => {
      let { isIdOutlet, isIdKode } = this.state;
      let response = await axios.get(`${URL}/cart/delete/${isIdOutlet}/${isIdKode}`)
      if (_.isEqual(response.status, 200)) {
        this._onRetrieveDataStorage()
        this.setState({
          isShow: false
        }, () => ToastAndroid.show(`${response.data}`, ToastAndroid.SHORT))
      }else {
        ToastAndroid.show(`Internal error ${response.data}`, ToastAndroid.SHORT)
      }
    }


    _onCountBuyBack = () => {
      this.setState({
        isChange: (this.state.isBuyBack) - (this.state.isTotalBuy)
      })

      if (_.isEmpty(this.state.isBuyBack)) {
        this.setState({ isChange: '' })
      }
    }

     _onReload = () => {
      this.setState({
        isReload: true,
        isShow: false,
        isCart: []
      }, () => this._onRetrieveDataStorage())
    }


    _onRenderComponents =  () => {
        let { isCart, isCheck } = this.state;
        let { navigate } = this.props.navigation;
        return _.map(isCart, (item, i) => {
            let {
              gambar_product, jumlah_pesan, keterangan_product,
              kode_product, nama_product, outletid, total_pesan
            } = item;
            return (
              <View key={i}>
                <List>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail square source={{ uri: gambar_product }} />
                    </Left>
                    <Body>
                    <TouchableOpacity
                      onPress={() => this._onChangeValueCount(outletid, kode_product)}>
                      <Text>{nama_product}</Text>
                      <Text note numberOfLines={1}>{keterangan_product}</Text>
                    </TouchableOpacity>
                    </Body>
                    <Right>
                      <Text>X {formatPrice(jumlah_pesan)}</Text>
                      <Text>{formatPrice(total_pesan)}</Text>
                    </Right>
                  </ListItem>
                </List>
              </View>
            )
        })

    }
  render() {
    let { navigate } = this.props.navigation
    let { isShow, isIdUname, isIdTotal, isIdOrder } = this.state;
    return (
       <Container style={everyStyles.contentStyle, {marginTop: 24}}>
         <Header style={everyStyles.headerStyles}>
         <Left>
           <Button
             onPress={() => navigate('Dashboard')}
             transparent>
           <Icon name='arrow-back' />
           </Button>
         </Left>
         <Body>
         {isShow ? <Title>Cart Update</Title> : <Title>Cart</Title>}
         </Body>
           <Right>
            {
            isShow ?
              <Button
                onPress={() => this.setState({ isShow: false })}
                transparent>
                <Text>Batal</Text>
              </Button> : null
            }
            </Right>
          </Header>
        <Reload
          refreshing={this.state.isReload}
          onRefresh={this._onReload}
        >
        <Content>
          {this._onRenderComponents()}
        </Content>
        </Reload>
        <View style={styles.viewSnack}>
        {
          isShow ? <Form>
            <Item stackedLabel last>
              <Label>Nama Produk</Label>
              <Input
                editable={false}
                value={isIdUname}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Total Order</Label>
              <Input
                onChangeText={isIdOrder => this.setState({isIdOrder})}
                value={isIdOrder}
                keyboardType='number-pad'
              />
            </Item>
            <Item stackedLabel>
              <Label>Total Belanja</Label>
              <Input
              editable={false}
                value={formatPrice(isIdTotal)}
              />
            </Item>
          </Form> :
          <Form>
            <Item stackedLabel last>
              <Label>Total Pembayaran</Label>
              <Input
                editable={false}
                value={formatPrice(this.state.isTotalBuy)}
              />
            </Item>
            <Item stackedLabel>
              <Label>Bayar</Label>
              <Input
                onChangeText={isBuyBack => this.setState({isBuyBack},
                    () => this._onCountBuyBack()
                  )}
                keyboardType='number-pad'

              />
            </Item>
            <Item stackedLabel last>
              <Label>Total Kembali</Label>
              <Input
              keyboardType='number-pad'
              editable={false}
                value={formatPrice(this.state.isChange.toString())}
              />
            </Item>
          </Form>
        }
        </View>
        {
          isShow ?
           <Footer style={everyStyles.headerStyles}>
             <Button info
                style={styles.btnStyle}
                onPress={this._onChangeValueStock}>
              <Text>Update Order</Text>
            </Button>
            <Button danger
                style={styles.btnStyle}
                onPress={this._onRemoveValueStock}>
              <Text>Hapus Order</Text>
            </Button>
          </Footer>
          :
          <Button block
            style={everyStyles.headerStyles}
            onPress={this._onProcessCheckOut}>
          <Text>Check Out</Text>
          </Button>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 4,
    borderRadius: 16,
    margin: 12
  },
    viewSnack: {
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 4,
      // height: 180,
      borderRadius: 15,
      alignContent: 'center',
      backgroundColor: '#efefef',
    }
});
