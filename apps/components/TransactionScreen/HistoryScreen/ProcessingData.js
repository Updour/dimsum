'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { View, FlatList } from 'react-native';
import { Container, Content, Text } from 'native-base'
import { netCheking, timer, ReloadScreen, MaterialIndicator } from '../../CollectionScreen'
import ResponseProcessing from './PropsResponse/ResponseProcessing'

export default class ProcessingData extends Component {
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
  		let result =  await axios.get(netCheking() + this.state.id)
  		console.log(result)
  		let data = result.data.data
  		console.log(data)
  		if (this._isMounted) {
  			this.setState({ process : data, refreshing: false })
  		}
  	}catch(err) {
  		console.log(err)
  	}
  }
  // 
  _onReloadScreenAndData = () => {
  	this.setState({ refreshing: true, process: '' }, () => this._onRetrieveDataProcessed())
  }

  _onWhenRenderIsEmpty = () => (
    <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1}}>
    <MaterialIndicator />
      <Text style={{ flex: 1, textAlign:'center', marginLeft: 14, marginRight: 14, fontFamily: 'roboto' }}>
        Mohon Tunggu, Sedang Memuat Data,
        Silahkan Cek Kembali Nomor Handphone Anda, Dan pastikan Saldo Anda Mencukupi
      </Text>
    </View>
  )
  render() {
    return (
    	<Container>
    	<ReloadScreen 
    		refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
    	>
    		<Content>
    			<FlatList
            data = {this.state.process}
            keyExtractor={(i, j) => j.toString()}
            renderItem={({item}) => <ResponseProcessing onPress={() => this.props.navigation.navigate('purchase')}
            item={item}/>}
            ListEmptyComponent={()=> this._onWhenRenderIsEmpty()}
          />
    		</Content>
    		</ReloadScreen>
    	</Container>
    );
  }
}
