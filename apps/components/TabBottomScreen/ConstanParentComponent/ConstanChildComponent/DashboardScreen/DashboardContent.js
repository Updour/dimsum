'use strict';

import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { View, TouchableOpacity, Image } from 'react-native';
import { Content, Text, Icon, Card } from 'native-base'
import { Col } from "react-native-easy-grid";

import { dStyles } from '../../../../CollectionScreen'
import { ApiMenuContent, ApiMenuVoucher, ApiMenuVirtualAccount } from './ApiMenuContent'


export default class DashboardContent extends Component {
  state = {
    eletric: [],
    voucer: [],
    virtual: []
  }
  componentDidMount() {
    this._onSetItemRender()
    this._onGetItemContentRender()
    this._onRenderDataEletric()
    this._onRenderDataVoucher()
    this._onRenderDataVirtualAccount()
  }

  _onSetItemRender = async () => {
    ApiMenuContent, ApiMenuVoucher, ApiMenuVirtualAccount
    AsyncStorage.setItem('@storage_Key', JSON.stringify(ApiMenuContent))
    AsyncStorage.setItem('@vouchers', JSON.stringify(ApiMenuVoucher))
    AsyncStorage.setItem('@virtual', JSON.stringify(ApiMenuVirtualAccount))
  }
  

  _onGetItemContentRender = async () => {
    let data = await AsyncStorage.getItem('@storage_Key')
    let voucer = await AsyncStorage.getItem('@vouchers')
    let virtual = await AsyncStorage.getItem('@virtual')
      let parsed = JSON.parse(data)
      let parsing = JSON.parse(voucer)
      let parsesed = JSON.parse(virtual)
      this.setState({ eletric : parsed, voucer: parsing, virtual: parsesed })
  }

  // eletric render
  _onRenderDataEletric = () => {
    let { eletric } = this.state;
     return  eletric.map((i, j) => {
        let { navigate } = this.props.navigation;
        let { cTextStyle, cImgStyle } = dStyles;
        return (
          <Col key={j} >
            <TouchableOpacity onPress={() => navigate(i.nav)}>
              <Image source={i.img} style={cImgStyle}/>
              <Text style={cTextStyle}>{i.name}</Text>
            </TouchableOpacity>
          </Col>
        )
      })
  }

  // voucher
  _onRenderDataVoucher = () => {
    let { voucer } = this.state;
     return  voucer.map((i, j) => {
        let { navigate } = this.props.navigation;
        let { cTextStyle, cImgStyle } = dStyles;
        return (
          <Col key={j} >
            <TouchableOpacity onPress={() => navigate(i.nav)}>
              <Image source={i.img} style={cImgStyle}/>
              <Text style={cTextStyle}>{i.name}</Text>
            </TouchableOpacity>
          </Col>
        )
    })
  }
  
  // voucher
  _onRenderDataVirtualAccount = () => {
    let { virtual } = this.state;
     return  virtual.map((i, j) => {
        let { navigate } = this.props.navigation;
        let { cTextStyle, cImgStyleAcc } = dStyles;
        return (
          <Col key={j} >
            <TouchableOpacity onPress={() => navigate(i.nav)}>
              <Image source={i.img} style={cImgStyleAcc}/>
              <Text style={cTextStyle}>{i.name}</Text>
            </TouchableOpacity>
          </Col>
        )
    })
  }


  render() {
    let { cIconStyle, cContentStyle } = dStyles;
    return (
      <View style={cContentStyle}>
        <View style={cIconStyle}>
       {this._onRenderDataEletric()}
        </View>
        <View style={cIconStyle}>
        {this._onRenderDataVoucher()}
        </View>
        <View style={cIconStyle}>
        {this._onRenderDataVirtualAccount()}
        </View>
      </View>
      );
  }
}