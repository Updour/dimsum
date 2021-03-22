'use strict';

import React, { Component } from 'react';

import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import _ from 'lodash'
import {
    Container, Header, Content, Button, List, ListItem, Text, Icon, Left, Body,
    Right, Switch, Title, Subtitle, Card
} from 'native-base';
import { everyStyles, URL, Reload, formatPrice } from '../Container'


class DepositScreen extends Component {
  state = {
    isDeposit: [],
    isReload: false
  }

  componentDidMount() {
    this._onReceiveValAsyncStorage()
  }

  _onReceiveValAsyncStorage = async() => {
    try {
     let val = await AsyncStorage.getItem('#sign')
     let parsing = JSON.parse(val)
     let response = await axios.get(`${URL}list_nota/${parsing.data.outlet_id}`)
      if (_.isEmpty(response.data)) return
        console.log('response', response)
       this.setState({
        isDeposit: response.data,
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
      }, () => this._onReceiveValAsyncStorage())
    }

  _onRenderComponent = () => {
    let { isDeposit } = this.state;
    return _.map(isDeposit, (item, i) => {
      let {
        bayar, id_header, kembali, no_nota, outlet, tgl_create, total_belanja
      } = item
      let { navigate } = this.props.navigation
      return (
        <TouchableOpacity key={i}
        onPress={() => navigate('DetailDeposit', {nota: no_nota})}>
        <Card style={styles.cardStyles} pointerEvents="none">
          <ListItem icon>
            <Left>
              <Text>Tanggal</Text>
            </Left>
            <Body />
            <Right>
              <Text>{tgl_create}</Text>
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
              <Text>Total Belanja</Text>
            </Left>
            <Body />
            <Right>
              <Text>Rp. {formatPrice(total_belanja)}</Text>
            </Right>
          </ListItem>
          </Card>
          </TouchableOpacity>
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
            <Title>Setoran</Title>
             <Subtitle>Setoran Tunai</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
        {this._onRenderComponent()}

        </Content>
        </Reload>
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
  }
});


export default DepositScreen;
