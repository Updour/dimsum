'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { Badge, Text } from 'native-base'
import { StyleSheet, View } from 'react-native';
import { netHistory } from '../../../../CollectionScreen'

export default class BadgeInboxScreen extends Component {
	state = {
		dpurchase: []
	}

	componentDidMount() {
		this._onRetrieveValueDataStorage()
	}

	_onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      this.setState({ 
        id : parsed.agenid
      })
      setTimeout(() => { 
      	this._onRetrieveValueDataTransaction() 
      }, 1600);
    }catch(err) {
      throw err;
    }
  }
  // 
  _onRetrieveValueDataTransaction = async () => {
  	try {
  		let result = await axios.get(netHistory() + this.state.id)
  		let data = result.data.data
  		let badge = data.length
  		this.setState({ dpurchase: badge })
  	}catch(err) {
  		throw err;
  	}
  }
  render() {
    return (
    	<Badge primary style={styles.badgeStyles}>
    	 <Text>{this.state.dpurchase}</Text>
    	</Badge>
    );
  }
}

const styles = StyleSheet.create({
badgeStyles: {
    scaleX: 0.7, 
    scaleY: 0.7, 
    position: 'relative', 
    top: -15,
    right: -11 
  },
});