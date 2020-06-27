'use strict';

import React, { Component } from 'react';

import { View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { 
	Container, Content, Form, Label, Input, Icon, Item, Button, Text, Switch 
} from 'native-base'
import { Grid, Col } from 'react-native-easy-grid';

import { 
	NotifyResponse, AuthStyles, Empty, SaveStorage, CantStorage 
} from '../CollectionScreen'
import VirtualKeyboard from './ChildComponent/VirtualKeyboard'

export default class StartUpScreeen extends Component {
	state ={
		verifycation: '',
		authentication: '',
		inputValydation: '',
		text: '',
		isSwitchValue: false,
		isValueValid: false,
	}

	componentDidMount() {
		this._onFetchValueStorageLocally()
	}

	componentWillUnmount() {

	}

	 	_onFetchValueStorageLocally = async () => {
    	try {
    		const valueAuth = await AsyncStorage.getItem('@keyData');
    		const valueVerify = await AsyncStorage.getItem('#keyInput');

    		let { navigation } = this.props;
    		let verify = JSON.parse(valueVerify)
    		let login = JSON.parse(valueAuth)

    		// if have storage login
    		if (login === null || verify === null) {
    		  return navigation.navigate('auth')
    		}

    		// if have storage verifikasi 
    		if (verify !== null) {
    		 this.setState({ 
    		 	verifycation: verify 
    		 }, () => this._onRenderInputValidation())
    		}

    	}catch (error) {
    		NotifyResponse('Internal server fetch error'+error)
    	}
    }

    // verification is valid
    _onVerifycationValueStorage = async () => {
    	try {
    		let { inputValydation, verifycation } = this.state
    		let { navigation } = this.props
    		// console.log('121', verifycation)
    		if (Number(inputValydation) !== verifycation ) {
    		  NotifyResponse('Sorry, PIN you entered is invalid')
    		  this.setState({ inputValydation: '' })
    		  return
    		}
    		setTimeout(() => {
    			NotifyResponse('Congratulations')
    			navigation.dispatch(resetAction)
    			//this._onSaveValueStorage()
    		}, 1500);
    	}catch(e) {
    		NotifyResponse('Internal server verify error'+error)
    	}
    }

    // if not typing
    _onSaveValueStorage = (value) => {
    	const { inputValydation } = this.state;
    	this.setState({ isSwitchValue: value }, () => {
    		if(value == true) {
    			if (inputValydation === '') {
    				Empty()
    				this.setState({ isSwitchValue: false })
    				return
    			}
    			this._onFetchValueStorageLocally()
    			SaveStorage()
    			this.setState({ 
    				isSwitchValue: true 
    			}, () => this._onVerifycationValueStorage())
    			return
    		}
    		return CantStorage()
    	})
    }
 	
 	changeText = (val) => {
		this.setState({ inputValydation: val })
		console.log(val.length, this.state.inputValydation)
		if (val.length) {
			console.log('11')
		  this.setState({ inputValydation: this.state.inputValydation })
		}
 		if (val.length === 7) {
			this._onVerifycationValueStorage()
 		}
 		
	}
  // render 
  _onRenderInputValidation = () => {
  	let { isSwitchValue, inputValydation } = this.state;
  	let { itemStyle, textInput, } = style
  	let { switchStyles, textSwitchStyles } = AuthStyles
  	return (
  		<Content>
      	<Col>
      	<Text style={style.textLabel}>
      	{isSwitchValue ? 'PIN aplikasi Anda Adalah:' : 'Masukan PIN Aplikasi Anda' }
      	</Text>
      	<Item rounded style={itemStyle}>
      	<Input
      	style={textInput}
      	maxLength={6}
      	keyboardType='default'
      	placeholder='*** ***'
      	editable={isSwitchValue ? false : true }
      	showSoftInputOnFocus
      	secureTextEntry={true}
      	onSubmitEditing={this._onVerifycationValueStorage}
      	value={inputValydation.toString()}
      	onChangeText={e => this.setState({ inputValydation: e.replace(/[^0-9]/g, '') })}
      	/>
      	</Item>
      	</Col>
      	<Col>
      	<Switch
      	onValueChange={(value) => this._onSaveValueStorage(value)}
      	style={switchStyles}
      	value={isSwitchValue} 
      	/>
      	<Text style={textSwitchStyles}>Switch Untuk Simpan Data</Text>
      	<VirtualKeyboard 
      	color='black' 
      	pressMode='string' 
      	onPress={val => this.changeText(val)} />
      	</Col>
      	</Content>
  	)
  }

  render() {
  	
    return (
      <Container>
      	<View style={style.contentStyle}>
      	<Grid style={style.contentStyle}>
      	{this._onRenderInputValidation()}
      	</Grid> 
				</View>
      </Container>
    );
  }
}

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MainMenuBottomScreen' }),
  ],
});



const style = {
    gridPad: { 
    	padding: 14 
    },
    txtMargin: { 
    	margin: 3
    },
    inputRadius: { 
    	textAlign: 'center' 
    },
    contentStyle: {
    	backgroundColor:'#f2f2f2',
    	alignItems:'center',
    	justifyContent:'center',
    	flex:1,
    	margin: 3,
    	paddingTop:20
    },
    textLabel: {
    	marginBottom: 20,
    	textAlign: 'center',
    	fontSize: 18,
    	color: '#8f9194',
    	fontStyle: 'italic',
    	fontFamily: 'roboto'
    },
    textInput: {
    	padding: 5,
    	margin: 3,
    	fontSize: 25,
    	textAlign: 'center',
    	color: '#b0afab',
    	fontStyle: 'italic',
    	fontFamily: 'roboto'
    },
    itemStyle: {
    	marginLeft: 14,
    	marginRight: 14
    },
    btnStyle: {
    	backgroundColor: 'blue',
    	marginLeft: 14,
    	marginRight: 14
    },

};