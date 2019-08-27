'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { TouchableOpacity } from 'react-native';
import { netUsers, formatDate, formatPrice, styles, ListStyles, timer, PulseIndicator } from '../../../../CollectionScreen'
import { 
	Container, Content, Text, Card, List, ListItem, Left, Body, Right, Thumbnail,
	Icon, 
} from 'native-base';
import { ApiAccount, ApiPrivacy } from './ApiAccount'


export default class AccountComponentScreen extends Component {
	_isMounted = false;
	state = {
		isLoading: false
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
			this.setState({ id : parsed.agenid })
			setTimeout(() => { 
				this._onRetrieveValueDataUser() 
			}, timer())
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
  		let { agenid, nama, hp, balance, ket, last_active, tgl_daftar} = data;
  		let id = agenid
  		let name = nama
  		let handphone = hp
  		let reBalance = balance
  		let information = ket
  		let activeDate = last_active
  		let listDate = tgl_daftar
  		if (this._isMounted) { this.setState({
  			id: id, 
  			name: name, 
  			hp: handphone, 
  			reBalance: balance, 
  			ket: information, 
  			activeDate: activeDate, 
  			listDate: listDate,
  			isLoading: false
  		})}
  	}catch (err) {
  		throw err;
  	}
  }
  render() {
  	let { id, name, hp, reBalance, ket, activeDate, listDate }= this.state;
  	let { lCardStyle, textId, textbalance, textCity, cardList, textCard } = ListStyles;
  	let { cardStyles, textStyles, iconAStyles, iconInStyles, labelAStyles, labelInStyles } = styles;
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
				  		<Text style={textStyles}>{name}</Text>
			  		</Body>
		  		</ListItem>
		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="ios-phone-portrait" style={hp ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={hp ? labelAStyles:labelInStyles}>Nomor Handphone</Text>
				  		<Text style={textStyles}>{hp}</Text>
			  		</Body>
		  		</ListItem>
		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="md-calendar" style={activeDate ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={activeDate ? labelAStyles:labelInStyles}>Tanggal Aktif</Text>
				  		<Text style={textStyles}>{formatDate(activeDate)}</Text>
			  		</Body>
		  		</ListItem>
		  		<ListItem avatar>
			  		<Left>
			  			<Icon name="md-calendar" style={listDate ? iconAStyles: iconInStyles}/>
			  		</Left>
			  		<Body>
				  		<Text note style={listDate ? labelAStyles:labelInStyles}>Tanggal Daftar</Text>
				  		<Text style={textStyles}>{formatDate(listDate)}</Text>
			  		</Body>
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
				  			<Text style={textStyles}>{name}</Text>
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