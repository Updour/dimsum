'use strict';

import React, { Component } from 'react';
import axios from 'axios'

import { FlatList } from 'react-native';
import { Container, Content } from 'native-base'
import { netProduct, ReloadScreen, styles } from '../../CollectionScreen'

import HeaderProduct from './PropsHeader/HeaderProduct'
import PaymentProduct from './PropsResponse/PaymentProduct'

export default class ProductPayment extends Component {
	_isMounted = false;
	state = {
		products: [],
		refreshing: false
	}

	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataProductPayment()
	}
	componentWillUnMount() {
		this._isMounted =false;
	}
	// fetching product name
	_onRetrieveValueDataProductPayment = async () => {
		try {
			let result =  await axios.get(netProduct())
			let data = result.data.data
			console.log(data)
			if ( this._isMounted) {
        this.setState({ products: data, refreshing: false })
      }
		}catch(err) {
			this.setState({ refreshing: false })
		}
	}
	_onRefreshingData = () => {
		this.setState({
			refreshing: true,
			products: ''
		}, ()=> this._onRetrieveValueFromServers());
	}
  render() {
    return (
      <Container style={styles.contentStyle}>
    		<HeaderProduct {...this.props} />
	      <ReloadScreen 
		      refreshing={this.state.refreshing}
		      onRefresh={this._onReloadScreenAndData}
	      />
      	<FlatList 
	      	data={this.state.products}
	      	keyExtractor={(i, j) => j.toString()}
	      	renderItem={PaymentProduct}
      	/>
      </Container>
    );
  }
}