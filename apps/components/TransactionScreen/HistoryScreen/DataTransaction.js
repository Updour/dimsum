'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { View, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Text, Footer} from 'native-base'
import { 
  netDataTrx, timer, ReloadScreen, MaterialIndicator, styles, Statusbar
} from '../../CollectionScreen'
import ResponseProcessing from './PropsResponse/ResponseProcessing'

export default class DataTransaction extends Component {
	_isMounted = false;
	state = {
		refreshing: false
	}

	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	// retrieve storage
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      this.setState({ id : parsed.agenid })
      	setTimeout(() => { this._onRetrieveDataProcessed() }, timer())
    }catch(err) {
      throw err;
    }
  }
  _onRetrieveDataProcessed = async () => {
  	try{
  		let result =  await axios.get(netDataTrx() + this.state.id)
  		let data = result.data.data
  		if (this._isMounted) {
  			this.setState({ purchase : data, refreshing: false })
  		}
  	}catch(err) {
  		console.log(err)
  	}
  }
  // 
  _onReloadScreenAndData = () => {
  	this.setState({ refreshing: true, purchase: '' }, () => this._onRetrieveDataProcessed())
  }

  _onWhenRenderIsEmpty = () => (
    <View style={{ marginTop: 30 }}>
    <MaterialIndicator />
      <Text style={{ flex: 1, textAlign:'center', marginLeft: 14, marginRight: 14, fontFamily: 'roboto' }}>
          Mohon Tunggu, Sedang Memuat Data
      </Text>
    </View>
  )
  render() {
    return (
    	<Container>
      <Header style={styles.headerStyles}/>
      <Statusbar />
    	<ReloadScreen 
    		refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
    	>
    		<Content>
    			<FlatList
            data = {this.state.purchase}
            keyExtractor={(i, j) => j.toString()}
            renderItem={ResponseProcessing}
            ListEmptyComponent={()=> this._onWhenRenderIsEmpty()}
          />
    		</Content>
    		</ReloadScreen>
        <Footer style={styles.footerStyles}>
          <TouchableOpacity style={styles.SubmitStyle}
          onPress={() => this.props.navigation.navigate('Inbox')}>
          <Text style={styles.textStyle}>Cek Semua Transaksi</Text>
          </TouchableOpacity>
          </Footer>
    	</Container>
    );
  }
}
