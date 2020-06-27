'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { styles, Statusbar } from '../../../../CollectionScreen'

class PrivacyAndPolicyScreen extends Component {
	render() {
		let { headerStyles, textStyles } = styles;
		let { goBack } = this.props.navigation
		return (
			<Container>
			<Header style={headerStyles}>
			<Left>
			<Button transparent onPress={() => goBack(null)}>
			<Icon name='ios-arrow-back' />
			</Button>
			</Left>
			<Body>
			<Title style={textStyles}>Privacy & Policy</Title>
			</Body>
			<Right/>
			<Statusbar />
			</Header>
			<WebView
			source={{uri: 'https://x-metrik.flycricket.io/privacy.html'}}
			style={{}}
			/>
			</Container>
			);
	}
}


export default PrivacyAndPolicyScreen;