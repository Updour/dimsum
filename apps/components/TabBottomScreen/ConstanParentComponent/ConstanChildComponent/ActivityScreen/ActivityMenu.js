'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash'

import { View, TouchableOpacity, ScrollView } from 'react-native';
import { List, Card, ListItem, Left, Thumbnail, Body, Text } from 'native-base'
import { ApiMenuActivity } from './ApiMenuActivity'


export default class ActivityMenu extends Component {
  state = {
    activity: [],
    userXm: [],
    userSd: [],
    isChangeMenu: false
  }

  componentDidMount() {
    this._onStoreDataStorageDevice()
    this._onRetrieveDataStorageDevice()
    // this._onRenderDataStorageScreenActivity()
  }
  // onstorage
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      if (val) {
        let parsed = JSON.parse(val)
        // md
        if (parsed.upline && parsed.dealer === '1') {
         let results = this.state.activity.filter(x => x.code === "xm" || x.code === "sd" || x.code === "xsd")
          this.setState({ userSd: results, isChangeMenu: false })
        }
        // sd
        if (parsed.upline === '1' && parsed.dealer !== '1') {
          let result = this.state.activity.filter(x => x.code === "xm" || x.code === "sd" || x.code === "xsd")
          this.setState({ userSd: result, isChangeMenu: false })
        }

        // xm
        if (parsed.upline !== '1' && parsed.dealer !== '1') {
          let data = this.state.activity.filter(i => i.code === "xm" || i.code === "xsd")
          this.setState({ userXm: data, isChangeMenu: true })
        }
      } else {
        this.setState({ isLoading: false })
      }
    } catch (err) {
      throw err;
    }
  }

// set data
  _onStoreDataStorageDevice = () => {
    ApiMenuActivity, 
    AsyncStorage.setItem('@activitys', JSON.stringify(ApiMenuActivity))
      setTimeout(() => {
        this._onRetrieveValueDataStorage()
      }, 200);
  }

  // 
  _onRetrieveDataStorageDevice = async () => {
    let data = await AsyncStorage.getItem('@activitys')
    let parsed = JSON.parse(data)
    this.setState({ activity: parsed.data })
  }

  // render sd 
  _onRenderDataSDScreen = () => (
    this.state.userSd.map((i,j) => {
      let { navigate } = this.props.navigation;
      let { name, text, img, nav } = i;
      return (
        <TouchableOpacity onPress={() => navigate(nav)} key={j}>
          <List>
            <Card pointerEvents="none" transparent>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={img} style={{width: 45, height: 45, resizeMode: 'contain'}}/>
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
  // render xm 
  _onRenderDataXmScreen = () => (
    this.state.userXm.map((i,j) => {
      let { navigate } = this.props.navigation;
      let { name, text, img, nav } = i;
      return (
        <TouchableOpacity onPress={() => navigate(nav)} key={j}>
          <List>
            <Card pointerEvents="none" transparent>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={img} style={{width: 45, height: 45, resizeMode: 'contain'}}/>
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
        <View>
          {this.state.isChangeMenu ? this._onRenderDataXmScreen() : this._onRenderDataSDScreen()}
        </View>
      </ScrollView>
    );
  }
}
