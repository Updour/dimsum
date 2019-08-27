'use strict';

import React, { Component } from 'react';

import { View, TouchableOpacity, Linking } from 'react-native';
import { Container, Content, List, ListItem, Left, Thumbnail, Body, Text, Right, Icon } from 'native-base'

import { ApiSms } from './ConstansContainer/ApiWhatsApp'
import { styles } from '../CollectionScreen'
import SmsHeader from './ConstansHeader/SmsHeader'

export default class SmsComponent extends Component {
	state = {
		sms: ApiSms(),
	}
	render() {
		console.log(this.state.sms)
		return (
			<Container>
			<SmsHeader {...this.props} />
				<Content>
				{
					this.state.sms.map((i, j) => {
						let { textStyles, cImageStyle } = styles;
						let { id, provider, link } = i;
						return (
							<TouchableOpacity key={j} onPress={() => Linking.openURL(link)} >
							<List pointerEvents='none'>
							<ListItem avatar>
							<Left>
							<Icon name="ios-mail"/>
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
				}
				</Content>
			</Container>
			);
	}
}