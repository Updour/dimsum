'use strict';

import React, { Component } from 'react';

import { View, TouchableOpacity, Linking } from 'react-native';
import { Container, Content, List, ListItem, Left, Thumbnail, Body, Text, Right, Icon } from 'native-base'

import { ApiPhone } from './ConstansContainer/ApiWhatsApp'
import { styles } from '../CollectionScreen'
import PhonecHeader from './ConstansHeader/PhonecHeader'

export default class PhoneComponent extends Component {
	state = {
		phones: ApiPhone(),
	}
	render() {
		console.log(this.state.phones)
		return (
			<Container>
			<PhonecHeader {...this.props} />
				<Content>
				{
					this.state.phones.map((i, j) => {
						let { textStyles, cImageStyle } = styles;
						let { id, provider, link } = i;
						return (
							<TouchableOpacity key={j} onPress={() => Linking.openURL(link)} >
							<List pointerEvents='none'>
							<ListItem avatar>
							<Left>
							<Icon name="ios-call"/>
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