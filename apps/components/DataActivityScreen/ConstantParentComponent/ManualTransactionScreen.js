'use strict'; 
 
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Contacts from 'react-native-contacts';

import { FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Form, Item, Input, Footer,Card } from 'native-base'

import { 
	netInbox, netOutbox, netInterval, types, styles, Empty, 
	ReloadScreen, timers, ListStyles
} from '../../CollectionScreen'

import HeaderManualTransaction from './PropsHeader/HeaderManualTransaction'
import InboxResponse from './PropsResponse/InboxResponse'
import OutboxResponse from './PropsResponse/OutboxResponse'

export default class ManualTransactionScreen extends Component {
	_isMounted = false;
	state = {
		message: '',
		types: types(),
		outbox: [],
		inbox: [],
		refreshing: false,
		isShow: false
	}

	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
		// this._intervalInbox = setInterval(() => {
		// 	this._onRetrieveValueDataInbox()
  //   }, 300);
		this._intervalOutbox = setInterval(() => {
			this._onRetrieveValueDataOutbox()
			return axios.get(netInterval())
		}, 1000)
	}
	componentWillUnMount() {
		this._isMounted =false;
		// clearInterval(this._intervalInbox)
		clearInterval(this._intervalOutbox)
	}

	// storage
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ id : parsed.agenid, hp: parsed.hp, pin: parsed.pin })
			// setTimeout(() => {
			// 	this._onRetrieveValueDataInbox()
			// }, 1000);
			// setTimeout(() => {
			// 	this._onRetrieveValueDataOutbox()
			// }, 2500);
		}catch(err) {
			throw err;
		}
	}
	// setItem inbox
	_onSetItemSaveValueDataInbox = async () => {
		try {
			if (this.state.message ==='') { return Empty() }
				this.setState({ isShow: false })
			let posts = {
				in_hpnumber: this.state.hp,
				in_message: this.state.message,
				agenid: this.state.id,
				tipe: this.state.types,
			}
			let items = await axios.post(netInbox(), posts)
			this.setState({ isShow: true })
		}catch(err) {
			throw err;
		}
	}

	// outbox response
	_onRetrieveValueDataOutbox = async () => {
		try {
			let results = await axios.get(netOutbox() + this.state.id)
			let data =  results.data.data
			if (this._isMounted) { this.setState({
					outbox: data 
				})
			}
			setTimeout(() => {
				this.state.outbox
			}, 10000);
		}catch(err) {
			throw err;
		}
	}
	_onRefreshingData = () => {
		this.setState({
			refreshing: true,
			inbox: '',
			outbox: '',
			message: ''
		}, ()=> this._onRetrieveValueDataInbox());
	}
  render() {
  	let { inbox, outbox, message, refreshing,isShow } = this.state;
  	let { formStyle, itemStyle, buttonStyle, tButtonStyle} = ListStyles;
    return (
      <Container>
    		<HeaderManualTransaction {...this.props} onPress={this._onRefreshingData}/>
	      <ReloadScreen 
		      refreshing={refreshing}
		      onRefresh={this._onReloadScreenAndData}
	      > 
	      <Content>
	      {isShow ?  
	      	<Card style={ListStyles.cInboxStyle}>
      <Text selectable style={ListStyles.tInboxStyle}>
        {message}
      </Text>
    </Card>: null }
	      </Content>
	      <Content>
	      	<FlatList
            data={outbox}
            keyExtractor={(x, i) => i.toString()}
            renderItem={OutboxResponse}
          />
	      </Content>
	      </ReloadScreen>
	      <Footer style={styles.contentStyle}>
      <Content style={styles.contentStyle}>
        <Form style={formStyle}>
          <Item rounded style={itemStyle}>
            <Input  
              placeholder="Message a transactions" 
              onChangeText={text => this.setState({message: text.replace(/\s/g, "")})}
              value={message}
              onSubmitEditing={() => this._onSetItemSaveValueDataInbox()}
              editable= {true}
              multiline= {true}
            />
          </Item>
        </Form>
      </Content>
      <TouchableOpacity style={buttonStyle}
        onPress={this._onSetItemSaveValueDataInbox}>
        <Text style={tButtonStyle}>Send</Text>
      </TouchableOpacity>
    </Footer>
      </Container>
    );
  }
}