'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {
  StyleSheet, StatusBar, View, TouchableOpacity, Modal, Alert
} from 'react-native';
import {
    Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Badge,
    Body, Icon, Text, Card, Item, Input, Tabs, Tab, TabHeading, List, ListItem, Thumbnail
} from 'native-base';

import { Submit } from '../Container'

class DashboardScreen extends Component {
    state = {
        isProducts: [],
        isDetailProduct: [],
        isCount: 0,
        isCounter: 0,
        isSnackbar: false,
        modalVisible: false,
        isSumPrice: 0
    }

    componentDidMount() {
      this._onReceiveProducts()
    }

    _onSetModalVisible = () => {
      this.setState({
        modalVisible: !this.state.modalVisible
      })
    }

    _onReceiveProducts = async () => {
      try {
        let url = `http://192.168.0.212/api_dimsum/product`
        let response = await axios.get(url)
        this.setState({
          isProducts: response.data
        })
      } catch(e) {
        console.log(e);
      }
    }

    /* detail product */
    _onReceiveDetailProduct = async (val) => {
      try {
        let url = `http://192.168.0.212/api_dimsum/product/${val}`
        let response = await axios.get(url)
        console.log(response.data)
        this.setState({
          isDetailProduct: response.data,
          modalVisible: true
        })
      } catch(e) {
        console.log(e);
      }
    }

    _onMainIncrement = async (val) => {
        if (_.isEqual(stock_product, 0)) return;
          this.setState({
            isCount: this.state.isCount + 1,
            isSnackbar: true
          })
    }

    _onMainDecrement = () => {
        if (this.state.isCount < 1) return this.setState({ isSnackbar: false })
        this.setState({
          isCount: this.state.isCount - 1,
      })
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
            <List style={{ marginTop: 12 }}>
            <ListItem thumbnail last>
              <Left>
                <Thumbnail square source={{ uri: gambar_product }} />
              </Left>
              <Body>
            <TouchableOpacity onPress={() => navigation.navigate('Product')}>
               <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text>{nama_product}</Text>
                </View>
                <Text note numberOfLines={1}>{keterangan_product}</Text>
            </TouchableOpacity>
              </Body>
              <Right>
                <Text style={styles.textPrice}>Rp.{harga_jual_product}</Text>
              </Right>
            </ListItem>
          </List>
          </View>
        )
      })
    }

    _isVisibleModal = () => {
      let { modalVisible, isDetailProduct } = this.state;
      return _.map(isDetailProduct, (item, i) => {
        let {
          gambar_product, harga_jual_product, id_product, nama_product,
          keterangan_product, stock_product
        } = item
        console.log('gambar_product', gambar_product)
      return (
        <View style={styles.centeredView} key={i}>
        <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this._onSetModalVisible(!modalVisible);
        }}
        >
        <Content>
        <ListItem thumbnail last>
              <Left>
                <Thumbnail square source={{ uri: gambar_product }} />
              </Left>
              <Body>
            <TouchableOpacity onPress={() => this._onReceiveDetailProduct(id_product)}>
               <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text>{nama_product}</Text>
                </View>
                <Text note numberOfLines={1}>{keterangan_product}</Text>
            </TouchableOpacity>
              </Body>
              <Right>
                <Text style={styles.textPrice}>Rp.{harga_jual_product}</Text>
                  <View style={styles.viewIconRight}>
                    <Icon
                      onPress={this._onMainDecrement}
                      name="remove" style={styles.icon} />
                    <Text style={styles.textIcon}>{this.state.isCount}</Text>
                    <Icon
                      onPress={this._onMainIncrement}
                      name="ios-add-circle-outline" style={styles.icon}/>
                  </View>
              </Right>

            </ListItem>

        </Content>
        {this.state.isSnackbar ?
          <TouchableOpacity style={styles.viewSnack}>
          <Text style={styles.textSnack}>{this.state.isCount} Items</Text>
          <Text style={styles.textSnacks}>Rp. {this.state.isSumPrice}</Text>
          </TouchableOpacity>
          : null
        }
        <Footer>
        <Button onPress={() => this._onSetModalVisible(!modalVisible)} >
        <Text>Hide Modal</Text>
        </Button>
        </Footer>
        </Modal>

        </View>
      )
    })
    }

  render() {
    return (
      <Container style={{ backgroundColor: '#efefef' }}>
      <View style={{ backgroundColor: '#7400e7'}}>
       <Header transparent hasTabs>
        <Left/>
          <Body>
            <Title>DIMSUM PROB</Title>
          </Body>
           <StatusBar backgroundColor="#6700ce" barStyle="light-content" />
          <Right>
          <Button transparent>
          <Icon name='cart' style={{ marginRight: -20 }}/>
          <Badge style={{scaleX: 0.7, scaleY: 0.7, top: -10, right: -13}} danger>
          <Text>12</Text>
          </Badge>
          </Button>
            <Button transparent>
              <Icon name='notifications' />
             <Badge style={{scaleX: 0.7, scaleY: 0.7, top: -10, left: -12}} danger>
          <Text>0</Text>
          </Badge>
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
                <Icon name="restaurant" />
                <Text>Kebab</Text>
            </TabHeading>
            }>

            {this._renderProduct_()}
          </Tab>
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
        {this._isVisibleModal()}
        </Content>
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
