'use strict';

import React, { Component } from 'react';

import { Alert, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
	Container, Content, Form, Label, Input, Icon, Item, Button, Text, Switch, Card 
} from 'native-base'
import { Grid, Col } from 'react-native-easy-grid';
import ForgotPinHeader from './ChildComponent/ForgotPinHeader'
import { 
	NotifyResponse, Empty, styles, AuthStyles
} from '../CollectionScreen'

export default class ForgotPinScreen extends Component {
	_isMounted = false;
	state= {
		id: '',
		hp: '',
		pin: '',
		password: '',
		isId: '',
		isHp: '',
		isPin: '',
		isPassword: '', 
		isValidate: '',
		counter: 0,
		isChangeHp: false,
		isChangeSwitch: false,
		isChangeButton: false,
		isPinSwitch: true,
		isPasswordSwitch: true,
	}

	componentDidMount() {
		this._onFetchValueStorageLocal()
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}
	

	_onFetchValueStorageLocal = async () => {
		try {
				let valueVerify = await AsyncStorage.getItem('#keyInput')
				let valueAuth = await AsyncStorage.getItem('@keyData')

    		let verify = JSON.parse(valueVerify) 
    		let auth = JSON.parse(valueAuth) 
    		if (this._isMounted) {
    		this.setState({ 
    			isValidate: verify,
    			isId: auth.agenid,
    			isHp: auth.hp,
    			isPin: auth.pin,
    			isPassword: auth.sp,
    			isChangeHp: true,
    			countered: 0
    		})
    		}
		}catch(e) {
			NotifyResponse('Internal server fetch error '+e)
		}
	}

	_onValidateHandphoneValueData = () => {
		let { isHp, hp, counter	} = this.state;
		let isNumb = (isHp).replace('+62', '0')
		if (isNumb === '') return Empty()
		this.setState({ countered: ++this.state.counter })
		// console.log(this.state.countered)
		if (this.state.countered === 3) {
			setTimeout(() => this.setState({ isChangeSwitch: true }), 1500);
		  
		}
		// console.log('sa', hp, isNumb)
		if (hp !== isNumb) return NotifyResponse('Maaf, nomor handphone yang anda masukan tidak di temukan')
		this._onDangerRemoveStorageLocally()
	}

	// reset all data
	_onValidateAllValueData =  (val) => {
		let { 
			isValidate, isId, isPin, isPassword, id, hp, pin, password 
		} = this.state;
		if (isId !== id) return NotifyResponse('Maaf, agenid anda tidak ditemukan')
		if (isPin !== pin) return NotifyResponse('Maaf, PIN transaksi anda tidak ditemukan')
		if (isPassword !== password) return NotifyResponse('Maaf, Password transaksi anda tidak ditemukan')

			this._onDangerRemoveStorageLocally()

	}

	// swith vhange state form
	_onSwitchStatusValidate = (val) => {
		this.setState({ 
			isChangeButton: val,
			isChangeHp: false
		}, () => {
			// DO SOMETHING
		})
	}
	// if success to reset pin
   _onDangerRemoveStorageLocally = () => {
   	Alert.alert(
      "PRINGATAN !!",
      "Apakah anda yakin mau ganti pin?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setTimeout(() => this.props.navigation.navigate('security'), 1500)}
      ],
      { cancelable: false }
    );
   }

  render() {
  	let { 
  		hp, id, name, pin, password, isChangeHp, isChangeButton, isChangeSwitch, isPinSwitch, isPasswordSwitch
  	} = this.state;
  	let { 
  		formStyles, iconAStyles, iconInStyles, labelAStyles, labelInStyles, cardStyles, textInfoHeader,textInfoBody,
  		textStyles 
  	} = styles
  	let { 
  		switchStyles, textSwitchStyles, btnStyle, iconFocus, iconInaFocus
  	} = AuthStyles
    return (
    	<Container>
    	<ForgotPinHeader />
	    	<Content style={formStyles}>
		    	<Card style={cardStyles}>
			    	<Text style={textInfoHeader}>Perhatian !! </Text>
			    	<Text style={textInfoBody}>
			    	Pastikan nomor handphone utama anda yang terdaftar.
			    	dan data yang anda masukan harus benar.
			    	</Text>
	    	</Card>

	    	<Form>
	    	{isChangeButton ? 
	    		<Form>
		    		<Item stackedLabel >
			    		<Icon name="ios-person" style={id ? iconInaFocus:iconFocus}/>
				    		<Label style={id ? labelAStyles: labelInStyles }>ID Pelanggan</Label>
					    		<Input
						    		placeholder='XM01234'
						    		value={id}
						    		onChangeText={id => this.setState({ id })}
					    		/>
		    		</Item>
		    		<Item stackedLabel >
			    		<Icon 
				    		name={isPinSwitch ? 'ios-lock' : 'ios-unlock'} 
				    		style={pin ? iconInaFocus : iconFocus} 
				    		onPress={() => this.setState({ isPinSwitch: !this.state.isPinSwitch })}
			    		/>
			    		<Label style={pin ? labelAStyles: labelInStyles }>PIN Transaksi</Label>
				    		<Input
					    		placeholder='123456'
					    		secureTextEntry= {isPinSwitch}
					    		value={pin}
					    		onChangeText={pin => this.setState({ pin })}
				    		/>
		    		</Item>
		    		<Item stackedLabel >
			    		<Icon 
				    		name={isPasswordSwitch ? 'ios-eye-off' : 'ios-eye'} 
				    		style={pin ? iconInaFocus : iconFocus} 
				    		onPress={() => this.setState({ isPasswordSwitch: !this.state.isPasswordSwitch })}
			    		/>
			    		<Label style={password ? labelAStyles: labelInStyles }>password Transaksi</Label>
				    		<Input
					    		keyboardType='number-pad'
					    		placeholder='123456'
					    		secureTextEntry= {isPasswordSwitch}
					    		value={password}
					    		onChangeText={password => this.setState({ password })}
				    		/>
		    		</Item> 
	    		</Form>: 
	    		<Item stackedLabel >
		    		<Icon 
		    			name="ios-phone-portrait" 
		    			style={hp ? iconAStyles:iconInStyles}
		    			/>
		    		<Label style={hp ? labelAStyles : labelInStyles}>Nomor Handphone</Label>
			    		<Input
				    		keyboardType='number-pad'
				    		placeholder='0823456789'
				    		value={hp.toString()}
				    		onChangeText={e => this.setState({ hp: e.replace(/[^0-9]/g, '') })}
			    		/>
		    		</Item>
	    	}
	    	</Form>
	    	{
	    		isChangeSwitch ? 
	    		<View>
		    		<Switch
			    		onValueChange={val => this._onSwitchStatusValidate(val)}
			    		style={switchStyles}
			    		value={isChangeButton} 
		    		/>
	    				<Text style={textSwitchStyles}>Coba cara lain ?</Text>
	    		</View> : null
	    	}
	    	</Content>
    	{
    		isChangeButton ? 
    		<Button rounded block style={btnStyle} 
    			onPress={this._onValidateAllValueData}>
    			<Text style={textStyles}>Reset Pin</Text>
    		</Button> : 
    		<Button rounded block style={btnStyle} 
    			onPress={this._onValidateHandphoneValueData}>
    			<Text style={textStyles}>Reset</Text>
    		</Button>
    	}
    	
    	</Container>
    );
  }
}
