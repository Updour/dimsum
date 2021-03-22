'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {
  StyleSheet, StatusBar, TouchableOpacity, View, ToastAndroid, Alert
} from 'react-native';
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Badge,
    Body, Icon, Text, Card, Item, Input, Tabs, Tab, TabHeading, List, ListItem, Thumbnail
} from 'native-base';

import { Submit, URL, Reload, formatPrice } from '../Container'

class DashboardScreen extends Component {
    state = {
        isProducts: [],
        isReload: false,
        isCart: 0
    }

    componentDidMount() {
      this._onReceiveCartAsyncStorage()
      this._onReceiveValProducts()
    }

    _onReceiveCartAsyncStorage = async () => {
      try {
        let response = await AsyncStorage.getItem('cartItem')
        let val = await AsyncStorage.getItem('#sign')
        let parsing = JSON.parse(response)
        let parse = JSON.parse(val)
        let results =  await axios.get(`${URL}listcart/${parse.data.outlet_id}`)
        if (_.isEmpty(results.data)) return
          this.setState({
            isCart: results.data.length,
            isReload: false
          })
      } catch(e) {
        console.log(e);
      }
    }

    _onCartValidating =  () => {
      if (_.isEqual(this.state.isCart, 0)) return ToastAndroid.show("Maaf Cart Kosong", ToastAndroid.SHORT)
        this.props.navigation.navigate('Cart')
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

    /*checking stock in validation*/
    _onValidatingReStock = async (val) => {
      let response = await axios.get(`${URL}product/${val}`)
      let isStock = _.get(response.data[0], 'stock_product_outlet')
      if (_.isEqual(isStock, 0)) return ToastAndroid.show("Maaf Stock Kosong", ToastAndroid.SHORT)

        this.props.navigation.navigate('DetailCashier', {id: val })}


    _onReload = () => {
      this.setState({
        isReload: true,
        isProducts: '',
        isCart: 0
      }, () => {
        this._onReceiveCartAsyncStorage(),
        this._onReceiveValProducts()
      })
    }

    _renderProduct_ = () => {
      let { isProducts } = this.state;
      let { navigation } = this.props;
      return _.map(isProducts, (item, i) => {
        let {
          gambar_product, harga_jual_product, id_product, nama_product,
          keterangan_product, stock_product_outlet
        } = item
        return (
          <View key={i}>
            <List style={{ marginTop: 12 }}>
            <ListItem thumbnail last>
              <Left>
                <Thumbnail square source={{ uri: gambar_product }} />
              </Left>
              <Body>
            <TouchableOpacity onPress={() => this._onValidatingReStock(id_product)}>
               <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text>{nama_product}</Text>
                </View>
                <Text note numberOfLines={1}>{keterangan_product}</Text>
            </TouchableOpacity>
              </Body>
              <Right>
                <Text style={styles.textPrice}>Rp.{formatPrice(harga_jual_product)}</Text>
                {
                  stock_product_outlet ? <Text note numberOfLines={2}>Stock {stock_product_outlet}</Text> :
                  <Text note numberOfLines={2}>Stock Kosong</Text>
                }
              </Right>
            </ListItem>
          </List>
          </View>
        )
      })
    }


  render() {
    let { navigate } = this.props.navigation
    return (
      <Container style={{ backgroundColor: '#efefef' }}>
      <Reload
        refreshing={this.state.isReload}
        onRefresh={this._onReload}
      >
      <View style={{ backgroundColor: '#7400e7'}}>
       <Header transparent hasTabs>
        <Left/>
          <Body>
            <Title>DIMSUM PROB</Title>
          </Body>
           <StatusBar backgroundColor="#6700ce" barStyle="light-content" />
          <Right>
          <Button transparent>
          <Icon name='cart' onPress={this._onCartValidating}
          style={{ marginRight: -20 }} />
          <Badge style={{scaleX: 0.7, scaleY: 0.7, top: -10, right: -13}} danger>
          <Text>{this.state.isCart}</Text>
          </Badge>
          </Button>
            <Button transparent>
              <Icon name='notifications' />
             <Badge style={{scaleX: 0.7, scaleY: 0.7, top: -10, left: -12}} danger>
          <Text>0</Text>
          </Badge>
              <Icon name='log-out'
              onPress={() => Alert.alert(
                "Peringatan !",
                "Apakah Anda Ingin Keluar ?",
                [
                {
                  text: "Batal",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => navigate('sign')}
                ],
                { cancelable: false }
                )}
              />
            </Button>
          </Right>
        </Header>
        <Item style={styles.search}>
            <Input placeholder="What are you looking here ..? " />
            <Icon name="ios-search" />
          </Item>
          </View>
        <Content style={{ backgroundColor: '#efefef' }}>
          <Tabs style={{ backgroundColor: '#7400e7'}}>
          <Tab
          heading={
            <TabHeading style={{ backgroundColor: '#7400e7'}}>
                <Icon name="rose" />
                <Text>Dimsum</Text>
            </TabHeading>
            }>
            {this._renderProduct_()}
          </Tab>
        </Tabs>
        </Content>
        </Reload>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: 'white',
        alignContent: 'center',
        borderRadius: 25,
        height: 45,
        marginTop: 8,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 9
    },
    textPrice: {
      color: 'red',
      fontFamily: 'roboto',
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
    viewIconRight: {
      flexDirection:'row',
      flexWrap:'wrap',
      marginTop: 8
    },
    textIcon: {
        fontSize: 17,
        marginLeft: 9,
        marginRight: 9,
        alignItems: 'center',
        fontWeight: '800',
        fontFamily: 'roboto'
    },
    icon: {
        fontSize: 30,
        color: '#7400e7'
    },
    viewSnack: {
      marginLeft: 17,
      marginRight: 17,
      height: 40,
      borderRadius: 15,
      flexDirection:'row',
      flexWrap:'wrap',
      backgroundColor: '#7400e7',
    },
    textSnacks: {
      marginLeft: 165,
      fontSize: 17,
      paddingTop: 8,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontFamily: 'roboto'
    },
    textSnack: {
      paddingLeft: 16,
      paddingTop: 8,
      fontSize: 17,
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'roboto'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 600,
    width: 390
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});


export default DashboardScreen;
