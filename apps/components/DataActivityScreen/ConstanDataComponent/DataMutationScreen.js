'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

import { FlatList } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { 
	Container, Content, Text, Card, Item, Label 
} from 'native-base'
import { 
	netMutation, timer, Empty, styles, SelectDate, SearchSubmit, UIActivityIndicator,
	ReloadScreen
} from '../../CollectionScreen'

import DataMutationHeader from './PropsHeaderScreen/DataMutationHeader'
import MutationScreenResponse from './PropsResponseScreen/MutationScreenResponse'

export default class DataMutationScreen extends Component {
	_isMounted = false;
	state = {
		dataArr: [],
		refreshing: false,
		isDateStart: '',
		isDateEnd: ''

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
  		let results = await axios.get(netMutation() + this.state.id)
  		let data = results.data.data
  		AsyncStorage.setItem('@Mutation', JSON.stringify(data));
  		if (this._isMounted) {
  			this.setState({ dataArr: data, refreshing: false })
  		}
  	}catch (err) {
  		throw err;
  	}
  }
  // 
  _onRetrieveValueData = async () => {
  	let val = await AsyncStorage.getItem('@Mutation')
  	let parsed = JSON.parse(val)
  	this.setState({ dataArr: parsed })
  }
  // filter date
  _onSelectedValueDataDate = () => {
  	let { dataArr, isDateStart, isDateEnd } = this.state;
  	if (isDateStart === '' || isDateEnd === '') { return Empty()}
  	
  	let response = _.filter(dataArr, (data) => {
      // if start and end date
      let date = moment(data.tanggal).startOf('day')
      let isStartDate = moment(isDateStart).startOf('day')
      let isEndDate = moment(isDateEnd).startOf('day')

      // is between and check true or false
      let isBetween = moment(date).isBetween(isStartDate, isEndDate)
      let isDateSameStart = moment(date).isSame(isStartDate, 'day')
      let isDateSameEnd = moment(date).isSame(isEndDate, 'day')

      return isBetween || isDateSameStart || isDateSameEnd
  	})
  	this.setState({ dataArr: response })
  }
// 
_onReloadScreenAndData = () => {
	this.setState({ 
		refreshing: true, 
		dataArr: '',
	}, ()=> this._onRetrieveValueDataResponse())
}


render() {
	let { dataArr, refreshing, isDateStart, isDateEnd } = this.state;
	let { 
		cardStyles, itemDateStart, itemDateEnd, 
		aLabelAStyle, aLabelInStyle, textSubmit 
	} = styles;
	return (
		<Container>
		<ReloadScreen
			refreshing={refreshing}
			onRefresh={this._onReloadScreenAndData}
		>
			<DataMutationHeader {...this.props} onPress={this._onReloadScreenAndData}/>
			<Content>
				<Card style={cardStyles}>
					<Grid>
					<Col>
						<Item stackedLabel style={itemDateStart}>
							<Label style={isDateStart ? aLabelAStyle : aLabelInStyle}>Dari Tanggal</Label>
								<SelectDate 
									onDateChange={isDateStart => this.setState({isDateStart})}
									value={isDateStart}
								/>
						</Item>
					</Col>
					<Col>
						<Item stackedLabel style={itemDateEnd}>
							<Label style={isDateEnd ? aLabelAStyle : aLabelInStyle}>Sampai Tanggal</Label>
								<SelectDate 
									onDateChange={isDateEnd => this.setState({isDateEnd})}
									value={isDateStart}
								/>
						</Item>
					</Col>
					</Grid>
					<SearchSubmit onPress={this._onSelectedValueDataDate}>
						<Text style={textSubmit}>Search</Text>
					</SearchSubmit>
				</Card>
				<FlatList 
					data={dataArr}
					renderItem={MutationScreenResponse}
					keyExtractor={(x, y) => y.toString()}
					ListEmptyComponent={UIActivityIndicator}
				/>
			</Content>
			</ReloadScreen>
		</Container>
		);
}
}