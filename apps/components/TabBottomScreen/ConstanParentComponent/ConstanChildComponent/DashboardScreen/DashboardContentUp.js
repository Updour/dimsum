'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { View, TouchableOpacity} from 'react-native'
import { Content, Text, Card, Icon, Button } from 'native-base';
import { dStyles, formatPrice, netUsers } from '../../../../CollectionScreen'

export default class DashboardContentUp extends Component {
  state = {
    refreshing: false
  }
  componentDidMount() {
   this._onRetrieveValueDataStorage()
  }
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      this.setState({ 
        id : parsed.agenid,
        refreshing: false
      })
      setTimeout(() => { this._onRetrieveValueDataUser() }, 3000);
    }catch(err) {
      throw err;
    }
  }
  _onRetrieveValueDataUser = async () => {
    try {
      let results = await axios.get(netUsers() + this.state.id)
      let data = results.data.data
      this.setState({ balance: data.balance })
    }catch(err) {
      throw err
    }
  }
  _onReloadScreenAndData = () => {
    this.setState({ 
      refreshing: true, 
      id: '', 
      balance: ''
    }, () => this._onRetrieveValueDataStorage())
  }
  render() {
    let { 
      cardStyles, contentTop, contentRender, contentStyles, cardText, 
      RpStyle, textPrice, cardReload, btnDeposits, contenAgent, content, 
      textDeposits
    } = dStyles
    return (
      <View>
      <Content style={contentTop} />
          <Content style={contentRender}>
            <Card style={cardStyles}>
            <View style={contenAgent}>
              <Text style={cardText}>{this.state.id}</Text>
              <Icon name='ios-refresh' style={cardReload} 
                onPress={this._onReloadScreenAndData}
              />
            </View>
            <View style={content}>
              <Text style={RpStyle}>Rp </Text>
              <Text style={textPrice}>{formatPrice(this.state.balance)}</Text>
              <TouchableOpacity style={btnDeposits} onPress={() => this.props.navigation.navigate('topUp')}>
                <Text style={textDeposits}>Deposit</Text>
              </TouchableOpacity>
              </View>
            </Card>
          </Content>
      </View>
      );
  }
}