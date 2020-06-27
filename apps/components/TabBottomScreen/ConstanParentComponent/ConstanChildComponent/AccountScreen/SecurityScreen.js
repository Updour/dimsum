'use strict';

import React, { Component } from 'react';

import { View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { 
	Container, Content, Form, Label, Input, Icon, Item, Button, Text 
} from 'native-base'
import { Grid, Col } from 'react-native-easy-grid';
import SecurityHeader from './propsHeaderComponent/securityHeader'
import { 
	ReloadScreen, styles, Submit, Empty, SaveLocal, NotifyResponse, setNotifRemove 
} from '../../../../CollectionScreen'

export default class SecurityScreen extends Component {
	  state={
	  	input: '',
	  	isChangeButton: false
	  };
   

    componentDidMount() {
       this._onFetchValueStorageLocally()
    }
    componentWillUnmount() {
      this._onFetchValueStorageLocally()
    }
//fetch local
    _onFetchValueStorageLocally = async () => {
    	try {
    		const value = await AsyncStorage.getItem('#keyInput');
    		if (value !== null) {
    			let data = JSON.parse(value)
    			// console.log(data)
    			this.setState({
    				isChangeButton: true,
    				input: data
    			})
    		}
    	}catch (error) {
    		NotifyResponse('Internal server fetch error'+error)
    	}
    }

   // save to local
   _onSaveValueStorageLocally = async () => {
   	let { input } = this.state;
   	if (!input) return Empty()
   	try {
   		await AsyncStorage.setItem('#keyInput', input)
      let { navigation } = this.props;
   		SaveLocal()
   		this.setState({ 
   			isChangeButton: true 
   		}, () => navigation.navigate('cheked'))
   	} catch (error) {
    	NotifyResponse('Internal server save error'+error)
  	}
   }

   // 
   _onDangerRemoveStorageLocally = () => {
   	Alert.alert(
      "PRINGATAN !!",
      "PIN yang sudah di hapus tidak bisa di kembalikan lagi ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => setTimeout(() => this._onRemoveValueStorageLocally(), 1500)}
      ],
      { cancelable: false }
    );
   }

    // remove local
    _onRemoveValueStorageLocally = async () => {
			try {
    		await AsyncStorage.removeItem('#keyInput');
    		setNotifRemove()
    		this.setState({
    			isChangeButton: false,
    			input: ''
    		})
    	} catch (error) {
    		NotifyResponse('Internal server remove error'+error)
    	}
    }

    renderInputSecurity = () => {
    	let { itemStyle, textInput} = style
    	let { input, isChangeButton } = this.state 

    	return (
    		<Col>
	    		<Text style={style.textLabel}>
	    		{isChangeButton ? 'PIN aplikasi Anda Adalah:' : 'Masukan PIN Aplikasi Anda' }
	    		</Text>
		    		<Item rounded style={itemStyle}>
			    		<Input
				    		style={textInput}
				    		maxLength={6}
				    		keyboardType='number-pad'
                secureTextEntry={true}
                placeholder='*** ***'
				    		showSoftInputOnFocus
				    		autoFocus
				    		editable={isChangeButton ? false : true }
				    		value={input.toString()}
				    		onChangeText={e => this.setState({ input: e.replace(/[^0-9]/g, '') })}
			    		/>
		    		</Item>
    		</Col>
    		)
    }

	render() {
		let { isChangeButton } = this.state;
		return (
			<Container>
				<SecurityHeader {...this.props} />
					<View style={style.contentStyle}>
						<Grid style={style.contentStyle}>
							{this.renderInputSecurity()}
						</Grid>
						{isChangeButton ? 
							<Button block rounded
								style={style.btnStyle}
								onPress={this._onDangerRemoveStorageLocally}>
								<Text>reset pin</Text>
							</Button> : 
							<Button block rounded
								style={style.btnStyles}
								onPress={this._onSaveValueStorageLocally}>
								<Text>simpan</Text>
							</Button>
						}
					</View>
			</Container>
			);
	}
}

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
      backgroundColor: 'red',
      marginLeft: 14,
      marginRight: 14
    },
    btnStyles: {
      backgroundColor: 'blue',
      marginLeft: 14,
      marginRight: 14
    },

};