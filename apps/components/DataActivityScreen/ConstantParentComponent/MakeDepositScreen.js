'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { FlatList, TouchableOpacity } from 'react-native';
import {  
	Container, Content, Text, Form, Item, Label, Input, Card,
  Icon, Picker, Footer
} from 'native-base'
import { 
	netDeposit, netBank, netInbox, types, dep, netInterval, timer, timers, 
	Empty, ReloadScreen, styles, PickerDroid, UIActivityIndicator, Processed, PleaseWait
} from '../../CollectionScreen'

import HeaderDeposit from './PropsHeader/HeaderDeposit'
import DepositResponse from './PropsResponse/DepositResponse'

export default class MakeDepositScreen extends Component {
	_isMounted = false;

	state = {
		types: types(),
    dep: dep(),
    bank: [],
    selected: '',
    nominal: '',
    refreshing: false,
    isResponses: false,
	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
		this._onRetrieveValueDataBank()
		this._interval = setInterval(() => {
      this._onRetrieveValueDataDeposit()
      return axios.get(netInterval())
    }, 1500);
	}
	componentWillUnmount() {
		this._isMounted = false;
		clearInterval(this._interval)
	}

// storage
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ 
				id : parsed.agenid,
				hp: parsed.hp,
				pin: parsed.pin
			}, () => 
				setTimeout(() => { 
					this._onRetrieveValueDataDeposit() 
				}, timer()));
		}catch(err) {
			throw err;
		}
	}

	// data bank
	_onRetrieveValueDataBank = async () => {
		try {
			let response = await axios.get(netBank())
			let data = response.data
			this.setState({ bank: data })
		}catch(err) {
			throw err;
		}
	} 

	// data deposit
	_onRetrieveValueDataDeposit = async () => {
		try {
			let results = await axios.get(netDeposit() + this.state.id)
			let data = results.data.data
			if (this._isMounted) {
				this.setState({ 
					tickets: data, 
					refreshing: false,
					isResponses: false
				})
			}
		}catch(err) {
			this.setState({ refreshing: false })
		}
	}
	// 
	_onSetItemValueDataDeposit = async () => {
		try {
			let { dep, selected, nominal, type, types, id, hp, pin } = this.state;
			if (selected ==='' || nominal ==='') { return Empty() }
				this.setState({ isResponses: true })
			let posts = {
				in_hpnumber: hp,
				in_message: dep +'.'+ nominal +'.'+ selected +'.'+ pin,
				agenid: id,
				tipe: types
			}
			let item = await axios.post(netInbox(), posts)
			setTimeout(() => {
				this.setState({ isResponses: false })
			}, timers());
		}catch(err) {
			throw err;
		}
		
	}
	//
	_onRefresingScreenAndData = () => {
		this.setState({ refreshing: true, tickets: ''}, ()=> this._onRetrieveValueDataDeposit())
	}
	  render() {
	  	let { refreshing, bank, selected, nominal, isResponses } = this.state;
    	let { 
    		cardStyles, formStyles, textItemA, textItemIn, iconAStyles, iconInStyles, 
    		labelAStyles, labelInStyles, footerStyles, SubmitStyle, textStyle
    	} = styles;
    return (
      <Container>
      <ReloadScreen 
      	refreshing={refreshing}
      	onRefresh={this._onRefresingScreenAndData}
      >
      <HeaderDeposit {...this.props } onPress={this._onRefresingScreenAndData}/>
      	<Content>
      		<Card style={cardStyles}>
            <Form style={formStyles}>
            <Label style={selected ? textItemA:textItemIn} >Select Bank</Label>
              <Item>
                <Icon name="ios-card" style={selected ? iconAStyles : iconInStyles}/>
                <PickerDroid 
                  selectedValue={selected}
                  onValueChange={selected => this.setState({selected})}
                >
                  {bank.map((i, j) => 
                    <Picker.Item label={i} value={i} key={j}/>
                    )}
                </PickerDroid>
              </Item>
              <Item floatingLabel>
                <Icon name="ios-pricetag" style={nominal ? iconAStyles : iconInStyles}/>
                  <Label style={nominal ? labelAStyles : labelInStyles}>Nominal</Label>
                  <Input 
                    onChangeText={nominal => this.setState({nominal})}
                    value={nominal}
                    
                  />
              </Item>
            </Form>
          </Card>
        {/*response*/}
        {isResponses ? <Processed /> :
            <FlatList 
              data={this.state.tickets}
              keyExtractor={(x, y) => y.toString()}
              renderItem={DepositResponse}
              ListEmptyComponent={UIActivityIndicator}
            />
          }
      	</Content>
      </ReloadScreen>
      {isResponses ? <PleaseWait /> : 
        <Footer style={footerStyles}>
          <TouchableOpacity style={SubmitStyle} 
            onPress={this._onSetItemValueDataDeposit}>
            <Text style={textStyle}>Deposit</Text>
          </TouchableOpacity>
        </Footer>
      }
      </Container>
    );
  }
}