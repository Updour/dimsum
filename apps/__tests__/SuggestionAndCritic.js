'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


import { TouchableOpacity, Linking } from 'react-native';
import { 
	Container, Header, Content, Form, Text, Item, Input, Label, Footer, Card,
	List, ListItem, Left, Body, Right, Icon, Thumbnail 
} from 'native-base';
import { netInbox, Submit, info, types, Empty, styles, setSend, setView } from '../CollectionScreen'
import CriticHeader from './ConstansHeader/CriticHeader'


export default class SuggestionAndCritic extends Component {

	state ={
		info: info(),
		types: types(),
		center: [],
		showComplaint: [],
		complaint: '',
		isSending: false,
		complaints: [
		{
			name: 'WhatsApp',
			text: 'Komplain Dengan WhatsApp',
			link: 'https://wa.me/6285234569863',
			img: require('../../assets/images/complaint/Whatsapp.png')
		},
		{
			name: 'Telegram',
			text: 'Komplain Dengan Telegram',
			link: 'https://t.me/xmetrik_cs',
			img: require('../../assets/images/complaint/telegram.png')
		},
		{
			name: 'Telphone',
			text: 'Komplain Dengan Telphone',
			img: require('../../assets/images/complaint/telephone.png'),
			link: [
				{
						'TELKOMSEL': '085234569863',
						// 'INDOSAT': '',
						// 'AXIS': '',
						// 'THREE': '',
						// 'XL' : ''
				},
				{
						'TELKOMSEL': '085649247301',
						// 'INDOSAT': '',
						// 'AXIS': '',
						// 'THREE': '',
						// 'XL' : ''
				},
				{
						'TELKOMSEL': '081939736312',
						// 'INDOSAT': '',
						// 'AXIS': '',
						// 'THREE': '',
						// 'XL' : ''
				},
				{
						'TELKOMSEL': '089664027386',
						// 'INDOSAT': '',
						// 'AXIS': '',
						// 'THREE': '',
						// 'XL' : ''
				},
			]
		},
		{
			name: 'SMS',
			text: 'Komplain Dengan SMS',
			img: require('../../assets/images/complaint/sms.png'),
			link: [
				{
					'TELKOMSEL': '085234569858',
					'INDOSAT': '085655708088',
					'AXIS': '083833877390',
					'THREE': '089681909969',
					'XL' : '081939736669'
				},
				{
					'TELKOMSEL': '082338069088',
					'INDOSAT': '085608662042',
					// 'AXIS': '',
					// 'THREE': '',
					// 'XL' : ''
				},
				{
					'TELKOMSEL': '085219815284',
					// 'INDOSAT': '',
					// 'AXIS': '',
					// 'THREE': '',
					// 'XL' : ''
				},
				{
					'TELKOMSEL': '082339237725',
					// 'INDOSAT': '',
					// 'AXIS': '',
					// 'THREE': '',
					// 'XL' : ''
				},
			],
		},
		]
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
			this.setState({ id : parsed.agenid, hp: parsed.hp })
		}catch(err) {
			throw err;
		}
	}

	_onSetItemSaveValueDataInbox = async () => {
		try {
			let { id, hp, info, types, complaint } = this.state;
			if (complaint === '') {return Empty()}
				this.setState({ isSending: true })
			let posts = {
				in_hpnumber: hp,
				in_message: info +'.'+ complaint,
				agenid: id,
				tipe: types
			}
			let result = await axios.post(netInbox(), posts)
			setSend()
			setTimeout(() => {
				this.props.navigation.navigate('Inbox')
				setView()
				this.setState({ complaint: '', isSending: false })
			}, 7000);
		}catch(err) {
			throw err;
		}
	}

		// _on
		_onRetrieveValueDataComplaint = () => (
			this.state.complaints.map((i, j) => {
				let { textStyles, cImageStyle } = styles;
				console.log('a', link)
				let { name, text, img, link } = i;
				return (
					<TouchableOpacity key={j}  onPress={() => this.setState({center: link}, ()=> {
						setTimeout(() => { this._onRetrieveDataCenter() }, 300);
					})}>
					<List pointerEvents='none'>
					<ListItem avatar>
					<Left>
					<Thumbnail source={img} style={cImageStyle}/>
					</Left>
					<Body>
					<Text style={textStyles}>{name}</Text>
					<Text note style={textStyles}>{text}</Text>
					</Body>
					<Right>
					<Icon name="ios-arrow-forward"/>
					</Right>
					</ListItem>
					</List>
					</TouchableOpacity>
					)
			})
			)

		// 
		_onRetrieveDataCenter = () => {
			let result = this.state.center.map(i => ({
				tel:i.TELKOMSEL,
				isat: i.INDOSAT,
				tri: i.THREE,
				axis: i.AXIS,
				xl: i.XL
			}))
			this.setState({ showComplaint: result }, () => {
				setTimeout(() => { this._onRetrieveDataCenterRender() }, 500);
			})
		}
		_onRetrieveDataCenterRender = () => (
			this.state.showComplaint.map((x,y) => {
				let { tel, isat, tri, axis, xl } = x;
				let { textStyles, cImageStyle } = styles;
				return (
					<TouchableOpacity key={y}>
					<List pointerEvents='none'>
					<ListItem avatar>
					<Left>
					<Icon name="ios-cart"/>
					</Left>
					<Body>
					<Text style={textStyles}>tel</Text>
					<Text note style={textStyles}>{tel}</Text>
					</Body>
					<Right>
					<Icon name="ios-arrow-forward"/>
					</Right>
					</ListItem>
					</List>
					</TouchableOpacity>
				)
				
			})
		)
		render() {
			console.log('c',this.state.showComplaint)
			let { 
				cCardStyle, itemRegular, cViaComplain, cTextAstyle,cTextInstyle, 
				footerStyles, SubmitStyle, textStyle, SubmitBlockStyle 
			} = styles;
			return (
				<Container>
				<CriticHeader {...this.props } />
				<Content>
				<Card style={cCardStyle}>
				<Label style={this.state.complaint ? cTextAstyle : cTextInstyle}>
				Isi Komplain :
				</Label>
				<Item regular style={itemRegular}>
				<Input 
				placeholder='Pulsa Belum masuk dari id XM123 kenapa ?' 
				multiline={true}
				blurOnSubmit={true}
				autoFocus={true}
				onChangeText={complaint => this.setState({complaint})}
			/>
			</Item>
			</Card>
			<TouchableOpacity onPress={this._onRetrieveDataCenter}>
			<Text>aa</Text>
			{this._onRetrieveDataCenterRender()}
			</TouchableOpacity>
			<Card style={cCardStyle}>
			<Content>
			<Text style={cViaComplain}>Komplain Via :</Text>
			{this._onRetrieveValueDataComplaint()}
			</Content>
			</Card>
			</Content>
			<Footer style={footerStyles}>
			{this.state.isSending ? 
				<TouchableOpacity style={SubmitBlockStyle}>
					<Text style={textStyle}>Sedang di Proses </Text>
				</TouchableOpacity> :
				<TouchableOpacity style={SubmitStyle} 
				onPress={this._onSetItemSaveValueDataInbox}>
					<Text style={textStyle}>Komplain</Text>
				</TouchableOpacity>
			}
			</Footer>
			</Container>
			);
}
}