'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash'

import { View, TouchableOpacity, ScrollView } from 'react-native';
import { List, Card, ListItem, Left, Thumbnail, Body, Text } from 'native-base'
import { ApiMenuActivity } from './ApiMenuActivity'


export default class ActivityMenu extends Component {
  state = {
    activity: []
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
        if (parsed.upline && parsed.dealer === '1')
          console.log('md')
        // sd
        if (parsed.upline === '1' && parsed.dealer !== '1') (
          this.state.activity.map(x => {
            if (x.code === 'sd' || x.code === 'xm') {
              console.log('')
              this._onRenderDataStorageScreenActivity()
            }
          })
        )
        // xm
        if (parsed.upline !== '1' && parsed.dealer !== '1') {
          let { activity} = this.state;
          return  activity.filter((i, j) => {
            if (i.code === "xm") {
              console.log(i)
            }
          })
        }

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
      }, 2000);
  }

  // 
  _onRetrieveDataStorageDevice = async () => {
    let data = await AsyncStorage.getItem('@activitys')
    let parsed = JSON.parse(data)
    this.setState({ activity: parsed.data })
  }

  //render
  _onRenderDataStorageScreenActivity = () => (
    this.state.activity.map((i,j) => {
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
      {this._onRenderDataStorageScreenActivity()}
      </View>
      </ScrollView>
    );
  }
}
