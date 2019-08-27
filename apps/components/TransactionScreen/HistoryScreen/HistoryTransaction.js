'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { View, FlatList } from 'react-native';
import { Container, Content, Text } from 'native-base'
import { netInbox, timer, ReloadScreen, PacmanIndicator } from '../../CollectionScreen'
import ResponseInbox from './PropsResponse/ResponseInbox'
import HistoryHeader from './PropsHeader/HistoryHeader'

export default class HistoryTransaction extends Component {
	_isMounted = false;
	state = {
		refreshing: false,
		isLoading: false
	}

	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	// retrieve storage
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@inbox')
      let data = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      let parse = JSON.parse(data)
      this.setState({ outbox : parsed, id: parse.agenid })
      	setTimeout(() => { 
      		this._onRetrieveDataHistoryOrOutbox() 
      	}, timer())
    }catch(err) {
      throw err;
    }
  }
  _onRetrieveDataHistoryOrOutbox = async () => {
  	this.setState({ isLoading: true })
  	try{
  		let result =  await axios.get(netInbox() + this.state.id)
  		let data = result.data.data
  		if (this._isMounted) {
  			setTimeout(() => {
  				this.setState({ outbox : data, refreshing: false, isLoading: false })
  			}, 3000);
  			
  		}
  	}catch(err) {
  		console.log(err)
  	}
  }
  // 
  _onReloadScreenAndData = () => {
  	this.setState({ refreshing: true, outbox: '' }, () => this._onRetrieveDataHistoryOrOutbox())
  }

  render() {
    return (
    	<Container>
    	<HistoryHeader {...this.props} onPress={this._onReloadScreenAndData}/>
    	<ReloadScreen 
    		refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
    	>
    		<Content>
    		{this.state.isLoading ? <PacmanIndicator /> :
    			<FlatList
            data = {this.state.outbox}
            keyExtractor={(i, j) => j.toString()}
            renderItem={ResponseInbox}
          />
        }
    		</Content>
    		</ReloadScreen>
    	</Container>
    );
  }
}
