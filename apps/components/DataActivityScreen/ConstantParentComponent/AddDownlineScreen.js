'use strict';
 
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Contacts from 'react-native-contacts';

import { TouchableOpacity } from 'react-native'
import { 
  Container, Content, Text, Form, Item, Label, Input, Card, Icon, Footer
} from 'native-base'

import { 
	netInbox, netOutbox, netInterval, ReadingContact, agen, types, styles,Empty, 
	ReloadScreen, Reply, ModalContact, ContactItem, Denied, Processed, PleaseWait,
	timers
} from '../../CollectionScreen'
import HeaderAddDownline from './PropsHeader/HeaderAddDownline'

export default class AddDownlineScreen extends Component {
	_isMounted = false;
	state = {
		user: agen(),
		types: types(),
		contacts: [],
		handphone: '',
		name: '',
		city: '',
		refreshing: false,
		isClicked: false,
		modalContact: false
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
				password: parsed.sp
			})
		}catch(err) {
			throw err;
		}
	}
	
	// INSERTED ADD DONWLINE
	_onSetItemValueDataAddDownline = async () => {
		try { 
			let { user,  handphone, name, city, password, id, hp, pin, types, } = this.state;
			if (handphone === '' || name ==='' || city ==='') {	return Empty() }
				this.setState({ isClicked: true })
			let posts = {
				in_hpnumber: hp,
				in_message: user +'.'+ handphone +'.'+ name +'.'+ city +'.'+ password +'.'+ pin,
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
			if (this._isMounted) { setTimeout(() => {
				this.setState({ reply: data, isClicked: false, refreshing: false })
			}, timers());}
		}catch(err) {
			this.setState({ refreshing: false })
		}
	}
	
	_onRetireveNumberPhoneContact = async () => {
    await ReadingContact().then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          Denied()
        } else {
          let data = contacts.map(i => ({
            label: i.phoneNumbers[0] && i.phoneNumbers[0].label,
            name: i.displayName,
            number: i.phoneNumbers[0] && i.phoneNumbers[0].number
          }))
          this.setState({ contacts: data, modalContact: true})
        }
      })
    })
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
  		handphone, name, city, isClicked, reply, refreshing, modalContact, contacts
  	} = this.state;
  	let { 
  		cardStyles, formStyles, textItemA, textItemIn, iconAStyles, iconInStyles, 
  		labelAStyles, labelInStyles, footerStyles, SubmitStyle, textStyle
  	} = styles;
    return (
      <Container>
    		<HeaderAddDownline {...this.props} onPress={this._onRefreshingData}/>
	      <ReloadScreen 
		      refreshing={refreshing}
		      onRefresh={this._onReloadScreenAndData}
	      >
	      <Content>
	      	<Card style={cardStyles}>
            <Form style={formStyles}>
              <Item floatingLabel>
                <Icon name="ios-phone-portrait" style={handphone ? iconAStyles : iconInStyles}/>
                  <Label style={handphone ? labelAStyles : labelInStyles}>Number Phone</Label>
                  <Input 
                    onChangeText={text => this.setState({ handphone: text.replace(/[^0-9]/g, '')})}
                    value={handphone}
                    keyboardType='phone-pad'
                  />
                <Icon name="ios-contact" style={handphone ? iconAStyles:iconInStyles}
                  onPress={this._onRetireveNumberPhoneContact}
                />
              </Item>
              <Item floatingLabel>
                <Icon name="ios-person" style={name ? iconAStyles : iconInStyles}/>
                  <Label style={name ? labelAStyles : labelInStyles}>Username</Label>
                  <Input 
                    onChangeText={name => this.setState({name})}
                    value={name}
                  />
              </Item>
              <Item floatingLabel>
                <Icon name="ios-navigate" style={city ? iconAStyles : iconInStyles}/>
                  <Label style={city ? labelAStyles : labelInStyles}>Area | City</Label>
                  <Input 
                    onChangeText={city => this.setState({city})}
                    value={city}
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
	    {/*contact*/}
	    <ModalContact  visible={modalContact} onRequestClose={() => this.setState({modalContact:false})}
    	onPress={() => this.setState({modalContact:false})}
      data={contacts}
      renderItem={({item}) => 
        <ContactItem item={item} onPress={() => 
          this.setState({ 
            handphone: item.number.replace('+62', '0').replace('-', '').replace('-', ''), modalContact:false,
          })}
        />
      }
    />
	      </ReloadScreen>
	      {isClicked ? <PleaseWait /> : 
        <Footer style={footerStyles}>
          <TouchableOpacity style={SubmitStyle} 
            onPress={this._onSetItemValueDataAddDownline}>
            <Text style={textStyle}>Add Downline</Text>
          </TouchableOpacity>
        </Footer>
      }
      </Container>
    );
  }
}