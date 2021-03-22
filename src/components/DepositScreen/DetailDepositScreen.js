'use strict';

import React, { Component } from 'react';

import {
  StyleSheet, TouchableOpacity, View, ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import _ from 'lodash'
import {
    Container, Header, Content, Button, List, ListItem, Text, Icon, Left, Body,
    Right, Switch, Title, Subtitle, Card, Footer
} from 'native-base';
import { everyStyles, URL, Reload, formatPrice } from '../Container'


class DepositScreen extends Component {
  state = {
    isDetail: [],
    isReload: false
  }

  componentDidMount() {
    this._onReceiveValDetailCashier()
  }

  _onReceiveValDetailCashier = async() => {
    try {
      let { navigation } = this.props
      let val = navigation.getParam('nota')
      let response = await axios.get(`${URL}detailnota/${val}`)
      if (_.isEmpty(response.data)) return
        this.setState({
          isDetail: response.data,
          isReload: false
        })
    } catch(e) {
      console.log(e);
    }
  }

   _onReload = () => {
      this.setState({
        isReload: true,
        isDeposit: []
      }, () => this._onReceiveValDetailCashier())
    }
  _onRenderComponent = () => {
    let { isDetail } = this.state;
    return _.map(isDetail, (item, i) => {
      console.log(item)
      let {
        harga_satuan, harga_total, jumlah_product, nama_product, no_nota,
        outlet_id, product_id, tanggal_mutasi_outlet, transaksi_mutasi_outlet
      } = item
      return (
        <Card style={styles.cardStyles} key={i} pointerEvents="none">
          <ListItem icon>
            <Left>
              <Text>Tanggal Transaksi</Text>
            </Left>
            <Body />
            <Right>
              <Text>{tanggal_mutasi_outlet}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Text>Nomor Nota</Text>
            </Left>
            <Body />
            <Right>
              <Text>{no_nota}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Text>Nama Produk</Text>
            </Left>
            <Body />
            <Right>
              <Text>{nama_product}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Text>Jumlah Beli</Text>
            </Left>
            <Body />
            <Right>
              <Text>{jumlah_product}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Text>Status</Text>
            </Left>
            <Body />
            <Right>
              <Text>{transaksi_mutasi_outlet}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Text>Harga Satuan</Text>
            </Left>
            <Body />
            <Right>
              <Text style={styles.total}>Rp. {formatPrice(harga_satuan)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Text >Harga Total</Text>
            </Left>
            <Body />
            <Right>
              <Text style={styles.total}>Rp. {formatPrice(harga_total)}</Text>
            </Right>
          </ListItem>
          </Card>
      )
    })
  }

  render() {
    let { navigation } = this.props;
    return (
        <Container style={everyStyles.contStyles}>
        <Reload
       refreshing={this.state.isReload}
       onRefresh={this._onReload}
       >
        <Header style={everyStyles.headerStyles}>
          <Left>
            <Button transparent
              onPress={() => navigation.navigate('Products')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Detail Setoran</Title>
             <Subtitle>Setoran & Cetak Struk</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
        {this._onRenderComponent()}
        </Content>
        </Reload>
        <Button block
         style={everyStyles.headerStyles}
         onPress={() => ToastAndroid.show(`Printer is busy`, ToastAndroid.SHORT)}>
          <Text>Cetak Struk</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  cardStyles: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    borderRadius: 14
  },
  total: {
    fontWeight: '800',
    fontStyle: 'italic',
    color: 'blue'
  }
});


export default DepositScreen;
