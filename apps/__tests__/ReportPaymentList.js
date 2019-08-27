'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import moment from 'moment'

import { FlatList, ScrollView } from 'react-native';
import { Container, Content, Text } from 'native-base'
import { netDataTrx, timer, styles, formatDate } from '../../../../CollectionScreen'
import DpurchaseLisItem from './PropsResponse/DpurchaseLisItem'

export default class ReportPaymentList extends Component {
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
			this.setState({ id: parsed.agenid })
			setTimeout(() => {
				this._onRetrieveValueDataTransaction()
			}, timer());
		} catch (err) {
			throw err;
		}
	}
	_onRetrieveValueDataTransaction = async () => {
		try {
			let result= await axios.get('http://xmetrik.biz:9700/dpurchase/sdponsel')
			let data = result.data.data
			this.setState({ dpurchase: data })
			setTimeout(() => {
				this._onRetrieveDataFilteringDateNow()
			}, 1500);
		}catch(err) {
			throw err
		}
	}
	_onRetrieveDataFilteringDateNow = () => {
		let data = this.state.dpurchase.filter(i => {
			let nowDate = moment(new Date()).format("DD/MM/YYYY")
			let filterDate = moment(i.tanggal).format('DD/MM/YYYY')
				if (nowDate === filterDate) { return true } //else {return false}
			})
		AsyncStorage.setItem('@isYesterDay', JSON.stringify(data))
		this.setState({ isYesterDay: data })

	}
	render() {
		return (
			<FlatList 
				data={this.state.isYesterDay}
				keyExtractor={(i, j) => j.toString()}
				renderItem={DpurchaseLisItem}
			/>
			);
	}
}