'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { 
	netHistory, timer, styles, WaveIndicator, ModalReport, ReloadScreen 
} from '../../../../CollectionScreen'
import InboxReponse from './PropsResponse/InboxReponse'
import InboxReponseAvatar from './PropsResponse/InboxReponseAvatar'

export default class InboxDataScreen extends Component {
	_isMounted = false;
	state = {
		inbox: [],
		isVisible: false,
		refresing: false,
	}
	componentDidMount() {
		this._onRetrieveValueDataStorage()
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ id: parsed.agenid })
			setTimeout(() => {
				this._onRetrieveValueDataOutbox()
			}, timer());
		} catch (err) {
			throw err;
		}
	}
	// 
	_onRetrieveValueDataOutbox = async () => {
		try {
			let results = await axios.get(netHistory() + this.state.id)
			let data = results.data.data
			AsyncStorage.setItem('@inbox', JSON.stringify(data)) //history screen
			if (this._isMounted) { 
				this.setState({ 
					inbox: data.reverse(), refresing: false
				})
			}
		}catch(err) {
			throw err;
		}
	}
	// 
	_onRetrieveValueDataOutboxDetail = item => {
		let message = item.out_message
		this.setState({ message: message, isVisible: true })
	}
	_onRetrieveNewValueData = () => {
		this.setState({ refresing : true, inbox: '' }, () => this._onRetrieveValueDataOutbox())
	}
	render() {
		let { inbox } = this.state;
		return (
			<ReloadScreen
				refreshing={this.state.refresing}
        onRefresh={this._onRetrieveNewValueData}
       >
			<View style={{marginLeft: 6, marginRight: 6, backgroundColor: '#fff', marginTop: 4, borderRadius: 18}}>
				<FlatList 
					data={inbox}
					keyExtractor={(i, j) => j.toString()}
					renderItem={({item}) => (
						<InboxReponseAvatar item={item} onPress={() => this._onRetrieveValueDataOutboxDetail(item)}/>
					)}
					ListEmptyComponent={WaveIndicator}
				/>
				<ModalReport 
					visible= {this.state.isVisible}
					onRequestClose= {()=> this.setState({ isVisible: false})}
					onPress= {()=> this.setState({ isVisible: false})}
					transparent
				>
					<View style={styled.modalBackground} >
					<View style={styled.activityIndicatorWrapper}>
					<Text selectable style={styled.textStyle}>
					{this.state.message}
					</Text>
					</View>
					</View>
				</ModalReport>
			</View>
			</ReloadScreen>
			);
	}
}
let styled= {
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#00000040'
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
		height: 150,
		width: 320,
		justifyContent: 'center,',
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	textStyle: {
		flex: 1,
		padding: 6,
		marginLeft: 12,
		fontSize: 15,
		marginBottom: 6,
		marginTop: 6,
		textAlignVertical: "center",
		textAlign: 'left',
		fontFamily: 'roboto',
		color: '#212121'
	}
}