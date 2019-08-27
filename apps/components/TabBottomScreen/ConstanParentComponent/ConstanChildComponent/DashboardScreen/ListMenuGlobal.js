'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Content, Text, Icon, Card, List, ListItem, Left, Thumbnail, Body } from 'native-base'
import { Col } from "react-native-easy-grid";

import { dStyles } from '../../../../CollectionScreen'
import { ApiMenuGlobal } from './ApiMenuGlobal'
import ListMenuHeader from '../../ContansHeaderComponent/ListMenuHeader'
export default class ListMenuGlobal extends Component {
  state= {
    menu: []
  }
  componentDidMount() {
    this._onSetItemDataApiMainMenu()
    this._onRetrieveDataMainMenu()
    this._onRenderComponentMenu()
  }
  // 
  _onSetItemDataApiMainMenu = async () => {
    ApiMenuGlobal,
    AsyncStorage.setItem('@ApiMenu', JSON.stringify(ApiMenuGlobal))
  }
  // 
  _onRetrieveDataMainMenu = async () => {
    let data = await AsyncStorage.getItem('@ApiMenu')
    let parsed = JSON.parse(data)
    this.setState({ menu: parsed })
  }
  // render data
  _onRenderComponentMenu = () => (
    this.state.menu.map((x, y) => {
      let { navigate } = this.props.navigation;
      let { cTextStyle, cImgStyle } = dStyles;
      let { name, text, nav, img } = x;
      return (
        <TouchableOpacity onPress={() => navigate(nav)} key={y}>
        <List>
        <Card pointerEvents="none" transparent>
            <ListItem avatar>
              <Left>
                <Thumbnail source={img} style={{width: 50, height: 50, resizeMode: 'contain'}}/>
              </Left>
              <Body>
                <Text>{name}</Text>
                <Text note>{text}</Text>
              </Body>
            </ListItem>
            </Card>
          </List>
          </TouchableOpacity>
      )
    })
  )
  render() {
    return (
      <ScrollView>
      <ListMenuHeader {...this.props} />
      <View style={{backgroundColor: '#fff'}}>
      {this._onRenderComponentMenu()}
      </View>
      </ScrollView>
    );
  }
}
