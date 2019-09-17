'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import axios from 'axios'
import { Text, Container, Header, Content, Form, Item, Input, Button } from 'native-base';
// import base64 from 'base-64'
import { WebView } from 'react-native-webview';


class midtrans extends Component {
	state = {
		order: '',
		amount: '', 
		id: '',
		price: '',
		quantity: '',
		name: '',
		brand: '',
		category: '',
		merchant_name: '',
	}
	// 
	_onAddedNewItem = () => {
		var postData = {
			transaction_details: {
				order_id: "ORDER-900",
				gross_amount: 10000
			},
			item_details: [{
				id: "ITEM1",
				price: 10000,
				quantity: 1,
				name: "deposit",
				brand: "xmetrik",
				category: "Toys",
				merchant_name: "Xmetrik"
			}]
		};
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Basic ' + base64.encode('SB-Mid-server-1UFKntA8iEgNUUOwZzg3rqQ3' + ':')
			}
		};
		let i = 'https://app.sandbox.midtrans.com/snap/v1/transactions'
		console.log(axiosConfig, postData)
		axios.post(i, 
			postData, axiosConfig)
		.then((res) => {
			console.warn("RESPONSE RECEIVED: ", res.data.redirect_url);
		})
		.catch((err) => {
			console.log("AXIOS ERROR: ", err);
		})
	}

	render() {
		return (
			<Container>
			<Header />


			<Button onPress={this._onAddedNewItem}>
			<Text>Click Me!</Text>
			</Button>
			<WebView source={{ uri: 'https://app.sandbox.midtrans.com/snap/v2/vtweb/214b8bd2-e64c-41e7-ab53-5d832c0f0275' }} />

			</Container>
			);
	}
}

const styles = StyleSheet.create({

});


export default midtrans;