'use strict';
 
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { TouchableOpacity } from 'react-native'
import { 
  Container, Content, Text, Form, Item, Label, Input, Card, Icon, Footer
} from 'native-base'

import { 
	netInbox, netOutbox, netInterval, transfer, agen, types, styles, 
	ReloadScreen, Reply, ModalContact, ContactItem, Denied, Processed, PleaseWait,
	timers, Empty
} from '../../CollectionScreen'
import HeaderTransferSaldo from './PropsHeader/HeaderTransferSaldo'
 
export default class TransferSaldoScreen extends Component {
	_isMounted = false;
	state = {
		transfer: transfer(),
		types: types(),
		nominal: '',
		userID: '',
		refreshing: false,
		isClicked: false,
	}

	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
		this._interval = setInterval(() => {
      this._onRetrieveValueDataAddDownline()
        return axios.get(netInterval())
    }, 2000);
	}
	componentWillUnMount() {
		this._isMounted =false;
		clearInterval(this._interval)
	}
	// 
	// storage
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ 
				id : parsed.agenid,
				hp: parsed.hp,
				pin: parsed.pin,
			})
		}catch(err) {
			throw err;
		}
	}
	
	// INSERTED ADD DONWLINE
	_onSetItemSaveDataBalanceTransfer = async () => {
		try { 
			let { transfer, nominal, userID, id, hp, pin, types, } = this.state;
			if (nominal === '' || userID === '' ) {	return Empty() }
				this.setState({ isClicked: true })
			let posts = {
				in_hpnumber: hp,
				in_message: transfer +'.'+ nominal +'.'+ userID +'.'+ pin,
				agenid: id,
				tipe: types
			}
			let items = await axios.post(netInbox(), posts)
			setTimeout(() => {
				this.setState({ isClicked: false })
			}, timers());
		}catch(err) {
			throw err;
		}
	}
	// retrive
	_onRetrieveValueDataAddDownline = async () => {
		try {
			let results = await axios.get(netOutbox() + this.state.id)
			let data = results.data.data[0].out_message
			if (this._isMounted) { 
				setTimeout(() => {
				this.setState({ reply: data, isClicked: false, refreshing: false })
			}, timers());}
		}catch(err) {
			this.setState({ refreshing: false })
		}
	}
	

	_onRefreshingData = () => {
		this.setState({
			refreshing: true,
			reply: '',
			isClicked: ''
		}, ()=> this._onRetrieveValueDataAddDownline());
	}
  render() {
  	let { 
  		refreshing, nominal, userID, isClicked, reply
  	} = this.state;
  	let { 
  		cardStyles, formStyles, textItemA, textItemIn, iconAStyles, iconInStyles, 
  		labelAStyles, labelInStyles, footerStyles, SubmitStyle, textStyle
  	} = styles;
    return (
      <Container>
    		<HeaderTransferSaldo {...this.props} onPress={this._onRefreshingData}/>
	      <ReloadScreen 
		      refreshing={refreshing}
		      onRefresh={this._onReloadScreenAndData}
	      >
	      <Content>
	      	<Card style={cardStyles}>
            <Form style={formStyles}>
              <Item floatingLabel>
                <Icon name="ios-pricetags" style={nominal ? iconAStyles : iconInStyles}/>
                  <Label style={nominal ? labelAStyles : labelInStyles}>Nominal</Label>
                  <Input 
                    onChangeText={text => this.setState({ nominal: text.replace(/[^0-9]/g, '')})}
                    value={nominal}
                    keyboardType='phone-pad'
                  />
              </Item>
              <Item floatingLabel>
                <Icon name="ios-person" style={userID ? iconAStyles : iconInStyles}/>
                  <Label style={userID ? labelAStyles : labelInStyles}>Agenid</Label>
                  <Input 
                    onChangeText={userID => this.setState({userID})}
                    value={userID}
                  />
              </Item>
            </Form>
          </Card>
          {isClicked ? <Processed /> :
              <Reply onPress={()=> this.props.navigation.navigate('history')}>
              <Text>{reply}</Text>
              </Reply>
            }
	      </Content>
		  </ReloadScreen>
	      {isClicked ? <PleaseWait /> : 
        <Footer style={footerStyles}>
          <TouchableOpacity style={SubmitStyle} 
            onPress={this._onSetItemSaveDataBalanceTransfer}>
            <Text style={textStyle}>Transfer</Text>
          </TouchableOpacity>
        </Footer>
      }
      </Container>
    );
  }
}