'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


import { TouchableOpacity, Linking } from 'react-native';
import { 
	Container, Header, Content, Form, Text, Item, Input, Label, Footer, Card,
	List, ListItem, Left, Body, Right, Icon, Thumbnail, Accordion
} from 'native-base';
import { netInbox, Submit, info, types, Empty, styles, setSend, setView } from '../CollectionScreen'
import CriticHeader from './ConstansHeader/CriticHeader'

import { ApiWhatsApp, ApiPhoneAndSms, ApiPhone, ApiSms } from './ConstansContainer/ApiWhatsApp'

export default class SuggestionAndCritic extends Component {

	state ={
		info: info(),
		types: types(),
		complaint: '',
		isSending: false,
		complaints: ApiWhatsApp(),
		phoneSms: ApiPhoneAndSms(),
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
				let { name, text, img, link } = i;
				return (
					<TouchableOpacity key={j}  onPress={()=> Linking.openURL(link)}>
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

		
		_onRetrieveValueDataSms = () => (
			this.state.sms.map((i, j) => {
				let { textStyles, cImageStyle } = styles;
				let { id, provider } = i;
				return (
					<TouchableOpacity key={j}  >
						<List pointerEvents='none'>
							<ListItem avatar>
								<Left>
									<Icon name="ios-home"/>
								</Left>
								<Body>
									<Text style={textStyles}>{id}</Text>
									<Text note style={textStyles}>{provider}</Text>
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


		_onRetrieveValueDataphoneSms= () => (
			this.state.phoneSms.map((i, j) => {
				let { textStyles, cImageStyle } = styles;
				let { name, text, nav, img } = i;
				let { navigate } = this.props.navigation
				return (
					<TouchableOpacity key={j} onPress={()=> navigate(nav)}>
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

		
		render() {
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
										// autoFocus={true}
										onChangeText={complaint => this.setState({complaint})}
									/>
								</Item>
							</Card>
						<Card style={cCardStyle}>
							<Content>
								<Text style={cViaComplain}>Komplain Via :</Text>
								{this._onRetrieveValueDataComplaint()}
								{this._onRetrieveValueDataphoneSms()}
							</Content>
						</Card>
					</Content>
					<Footer style={footerStyles}>
						{this.state.isSending ? 
							<TouchableOpacity style={SubmitBlockStyle}>
								<Text style={textStyle}>Sedang di Proses </Text>
							</TouchableOpacity> :
							<TouchableOpacity style={SubmitStyle} 
								onPress={this._onSetItemSaveValueDataInbox}
							>
								<Text style={textStyle}>Komplain</Text>
							</TouchableOpacity>
						}
					</Footer>
				</Container>
			);
}
}