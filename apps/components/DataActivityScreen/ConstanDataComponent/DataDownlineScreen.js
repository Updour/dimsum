'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

import { FlatList } from 'react-native';
import { Container, Content, Text, Card, Item, Label } from 'native-base'
import { netDownline, timer, UIActivityIndicator, ReloadScreen } from '../../CollectionScreen'

import DataDownlineHeader from './PropsHeaderScreen/DataDownlineHeader'
import DownlineScreenResponse from './PropsResponseScreen/DownlineScreenResponse'

export default class DataDownlineScreen extends Component {
	_isMounted = false;
	state = {
		dataArr: [],
		refreshing: false,

	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
		this._onRetrieveValueData()
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	// 
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ id : parsed.agenid }, () => 
				setTimeout(() => { 
					this._onRetrieveValueDataResponse() 
				}, timer()));
		}catch(err) {
			throw err;
		}
	}
  // fetching data payment
  _onRetrieveValueDataResponse = async () => {
  	try {
  		let results = await axios.get(netDownline() + this.state.id)
  		let data = results.data.data
  		AsyncStorage.setItem('@Downline', JSON.stringify(data));
  		if (this._isMounted) {
  			this.setState({ dataArr: data, refreshing: false })
  		}
  	}catch (err) {
  		throw err;
  	}
  }
  // 
  _onRetrieveValueData = async () => {
  	let val = await AsyncStorage.getItem('@Downline')
  	let parsed = JSON.parse(val)
  	this.setState({ dataArr: parsed })
  }

// 
_onReloadScreenAndData = () => {
	this.setState({ 
		refreshing: true, 
		dataArr: '',
	}, ()=> this._onRetrieveValueDataResponse())
}


render() {
	let { dataArr, refreshing } = this.state;

	return (
		<Container>
		<ReloadScreen
			refreshing={refreshing}
			onRefresh={this._onReloadScreenAndData}
		>
			<DataDownlineHeader {...this.props} onPress={this._onReloadScreenAndData}/>
			<Content>
				<FlatList 
					data={dataArr}
					renderItem={DownlineScreenResponse}
					keyExtractor={(x, y) => y.toString()}
					ListEmptyComponent={UIActivityIndicator}
				/>
			</Content>
			</ReloadScreen>
		</Container>
		);
}
}