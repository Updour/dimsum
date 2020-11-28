'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { TouchableOpacity, ToastAndroid } from 'react-native';
import { netUsers, formatDate, formatPrice, styles, ListStyles, timer, PulseIndicator, NotifyResponse } from '../../../../CollectionScreen'
import { 
	Container, Content, Text, Card, List, ListItem, Left, Body, Right, Thumbnail,
	Icon, Input, Switch
} from 'native-base';
import { ApiAccount, ApiPrivacy } from './ApiAccount'


export default class AccountComponentScreen extends Component {
	_isMounted = false;
	state = {
		pin: '',
		isLoading: false,
		isPinSwitch: true,
		isSwitchValue: false
	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	// 
	// retrieve storage
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			if (this._isMounted) { 
			this.setState({ id : parsed.agenid })
			setTimeout(() => { 
				this._onRetrieveValueDataUser() 
				// this._onFetchValueStorageLocally()
			}, timer())
		}
		}catch(err) {
			throw err;
		}
	}
  //  
  _onRetrieveValueDataUser = async () => {
  	try {
  		this.setState({ isLoading: true })
  		let result = await axios.get(netUsers() + this.state.id)
  		let data = result.data.data
  		if (this._isMounted) { 
  			this.setState({
  			id: data.agenid, 
  			name: data.nama, 
  			hp: data.hp,
  			pin: data.pin, 
  			reBalance: data.balance, 
  			ket: data.ket, 
  			activeDate: data.last_active, 
  			listDate: data.tgl_daftar,
  			isLoading: false
  		}, () => this._onFetchValueStorageLocally())
  	}
  	}catch (err) {
  		throw err;
  	}
  }

  // fetch verificarion
  _onFetchValueStorageLocally = async () => {
  	try {
  		let valueVerify = await AsyncStorage.getItem('#keyInput')
  		let verify = valueVerify

  		if (verify === null) {
  			this.setState({ isSwitchValue: false })
  		   ToastAndroid.show('Please, Set your first application', ToastAndroid.SHORT)
  		   return
  		}

    		if (verify !== null) {
    			this.setState({ 
    				isSwitchValue: true 
    			}) 
    		}

    	}catch (error) {
    		NotifyResponse('Internal server fetch error'+error)
    	}
    }
  render() {
  	let { id, name, hp, pin, reBalance, ket, activeDate, listDate, isPinSwitch, isSwitchValue }= this.state;
  	let { lCardStyle, textId, textbalance, textCity, cardList, textCard } = ListStyles;
  	let { cardStyles, textStyles, aTextStyles, iconAStyles, iconInStyles, labelAStyles, labelInStyles } = styles;
  	let { navigate } = this.props.navigation;
  	return (
  		<Content>
			{this.state.isLoading ? <PulseIndicator /> :
  		<Card style={cardList}>
	  		<List>
		  		<ListItem avatar>
			  		<Left>
			  			<Thumbnail source={require('../../../../../assets/images/dashboard/avatar.png')}/> 
			  		</Left>
		  		<Body>
			  		<Text style={textId}>{id}</Text>
			  		<Text style={textbalance}>Rp. {formatPrice(reBalance)}</Text>
		  		</Body>
		  		<Right>
			  		<Text></Text>
			  		<Text note style={textCity}>{ket}</Text>
			  		<Text></Text>
		  		</Right>
		  		</ListItem>
	  		</List>

	  		<Content style={textCard}>
		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="ios-person" style={name ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={name ? labelAStyles:labelInStyles}>ID Pengguna</Text>
				  		<Text style={aTextStyles}>{name}</Text>
			  		</Body>
		  		</ListItem>
		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="ios-phone-portrait" style={hp ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={hp ? labelAStyles:labelInStyles}>Nomor Handphone</Text>
				  		<Text style={aTextStyles}>{hp}</Text>
			  		</Body>
		  		</ListItem>

		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="md-calendar" style={activeDate ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={activeDate ? labelAStyles:labelInStyles}>Tanggal Aktif</Text>
				  		<Text style={aTextStyles}>{formatDate(activeDate)}</Text>
			  		</Body>
		  		</ListItem>
		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="md-calendar" style={listDate ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={listDate ? labelAStyles:labelInStyles}>Tanggal Daftar</Text>
				  		<Text style={aTextStyles}>{formatDate(listDate)}</Text>
			  		</Body>
		  		</ListItem>
		  		<ListItem avatar >
			  		<Left>
			  			<Icon name="ios-phone-portrait" style={pin ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={pin ? labelAStyles:labelInStyles}>Pin transaksi</Text>
				  		<Input style={{height: 46}} value={pin} 
				  			secureTextEntry= {isPinSwitch}
				  			editable={false}
				  		/>
			  		</Body>
			  		<Right>
			  		<Icon 
				    		name={isPinSwitch ? 'ios-eye-off' : 'ios-eye'} 
				    		onPress={() => this.setState({ isPinSwitch: !this.state.isPinSwitch })}
			    		/>
			  		</Right>
		  		</ListItem>
	  		</Content>

  		</Card>
  		}
  			
	  		<Card style={cardStyles} >
	  		{ApiAccount.map((i, j) => {
	  			let { navigate } = this.props.navigation
	  			let { name, nav, iconL, iconR } = i
	  			return (
	  				<ListItem avatar key={j}>
			  		<Left>
			  			<Icon name={iconL} style={iconL ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<TouchableOpacity onPress={()=> navigate(nav)}>
				  			<Text style={textStyles}>{name}</Text>
				  		</TouchableOpacity>
			  		</Body>
			  		<Right>
			  			<Icon name={iconR}/>
			  		</Right>
		  		</ListItem>
	  			)
	  		})}
	  		<ListItem avatar >
			  		<Left>
			  			<Icon name='ios-settings' style={iconAStyles}/>
			  		</Left>
			  		<Body>
				  		<TouchableOpacity onPress={()=> navigate('security')}>
				  			<Text style={textStyles}>{'Kunci Aplikasi'}</Text>
				  		</TouchableOpacity>
			  		</Body>
			  		<Right>
			  		<Switch 
				  		onValueChange={val => this._onFetchValueStorageLocally(val)}
				  		value={isSwitchValue} 
			  		/>
			  		</Right>
		  		</ListItem>
	  		</Card>
	  	{/*privasi*/}
	  	  			
	  		<Card style={cardStyles} >
	  		{ApiPrivacy.map((i, j) => {
	  			let { navigate } = this.props.navigation
	  			let { name, nav, iconL, iconR } = i
	  			return (
	  				<ListItem avatar key={j}>
			  		<Left>
			  			<Icon name={iconL} style={iconL ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<TouchableOpacity onPress={()=> navigate(nav)}>
				  			<Text style={aTextStyles}>{name}</Text>
				  		</TouchableOpacity>
			  		</Body>
			  		<Right>
			  			<Icon name={iconR}/>
			  		</Right>
		  		</ListItem>
	  			)
	  		})}
	  		</Card>
  		</Content>
  		);
  }
}