'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


import { View, FlatList, TouchableOpacity } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { 
	Container, Content, Text, Card, Form, Item, Label, Picker, 
	Icon, Input, Footer
} from 'native-base'
import { 
	vNetBolt, styles, netInbox, timer, types, ModalPopUp,
	Empty, formatPrice, ReloadScreen, PleaseWait, CheckedData, Processed, timers
} from '../../CollectionScreen'

import VoucherResponse from './PropsResponse/VoucherResponse'
import BoltHeader from './PropsHeaderComponent/BoltHeader'


export default class BoltVoucherScreen extends Component {
	_isMounted = false;
	state= {
		ArrCode: [],
		input: '',
		code: '',
		price: '',
		counter: 1,
		modalVisible: false,
		isShowButton: false,
		isBuying: false,
		isClicking: false,
		isChecking: false,
		types: types()
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
      this.setState({ 
      	id : parsed.agenid, 
      	hp: parsed.hp, 
      	pin: parsed.pin,
        refreshing: false
      })
    }catch(err) {
      throw err;
    }
  }

  // show chilf form render
  _onShowingChildMenuForm = value => {
  	this.setState({ input: value }, () => {
      if (this.state.input) {
        this.setState({ isShowButton: true })
      }
  		if (this.state.input.length === 3) {
  			this._onRetreiveValueDataCodeVoucher()
  			this.setState({ isShowButton: true })
  		}
  	})
  }
  // code voucher
  _onRetreiveValueDataCodeVoucher = async () => {
  	try { 
  		if (this.state.input ==='') { return Empty() }
  			this.setState({ modalVisible: true })
  		let results = await axios.get(vNetBolt())
  		let data = results.data.data
  		this.setState({ ArrCode: data })
  	}catch(err) {
  		throw err;
  	}
  }
  // buying voucher 
  _onBuyingDataCodeVoucher = async () => {
  	try {
  		let { code, input, isBuying, id, hp, pin, types, counter } = this.state;
  		if (code === '' || input === '') { return Empty() }
  			this.setState({ isBuying: true, isClicking: true })
  		let posts = {
  			in_hpnumber: hp,
  			in_message: code +'.'+ input +'.'+ pin +'.'+ counter,
  			agenid: id,
  			tipe: types
  		}
  		let results = await axios.post(netInbox(), posts)
  		setTimeout(() => {
  			// this._onNavigateToProcessTransaction()
  			this.setState({ isBuying: false, isChecking: true })
  		}, timers());
  	}catch(err) {
  		throw err;
  	}
  }
  // _onNavigateToProcessTransaction = value => {
  // 	this.setState({ isChecking: true }, 
  // 		() => this.props.navigation.navigate('process'))
  // } 
  //
  _onReloadScreenAndData = () => {
    this.setState({ 
      refreshing: true, 
      input: '', 
      isClicking: ''
    }, ()=> this._onRetrieveValueDataStorage())
  }
  render() {
  	let { 
  		input, counter, code, ArrCode, modalVisible, isShowButton, isBuying,
  		isClicking, isChecking
  	} = this.state;

  	let { 
  		contentStyle, cardStyles, formStyles, iconAStyles, iconInStyles, labelAStyles, 
  		labelInStyles, footerStyles, SubmitStyle, textStyle, textItemPrice, ItemPrice, 
  		SubmitBlockStyle
  	} = styles;
    return (
      <Container>
      <BoltHeader {...this.props} onPress={this._onReloadScreenAndData}/>
      <ReloadScreen 
      	refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
        style={contentStyle}
      >
      	<Content>
      		<Card style={cardStyles}>
            <Form style={formStyles}>
              <Item floatingLabel>
                <Icon name="ios-person" style={input ? iconAStyles : iconInStyles}/>
                  <Label style={input ? labelAStyles : labelInStyles}>ID Pelanggan</Label>
                  <Input 
                    onChangeText={input => this._onShowingChildMenuForm(input)}
                    value={input}
                    keyboardType='phone-pad'
                  />
              </Item>
              {isShowButton ? 
              <View>
              <Item floatingLabel>
	              <Icon name="ios-cart" style={code ? iconAStyles : iconInStyles}/>
	              <Label style={code ? labelAStyles : labelInStyles}>Kode Produk</Label>
		              <Input 
			              onChangeText={code => this.setState({code})}
										value={code}
										editable={false}
										keyboardType='phone-pad'
									/>
								<Icon name="ios-arrow-dropdown" style={code ? iconAStyles : iconInStyles}
								onPress={this._onRetreiveValueDataCodeVoucher}
								/>
							</Item>
							<Grid>
                <Col>
                  <Text style={textItemPrice}>Harga</Text>
                </Col>
                <Col> 
                  <Text style={ItemPrice}>Rp. {formatPrice(this.state.price)}</Text>
                </Col>
              </Grid>
              <Item floatingLabel>
              <Icon name="ios-cash" style={counter ? iconAStyles : iconInStyles}/>
              <Label style={counter ? labelAStyles : labelInStyles}>No Transaksi</Label>
	              <Input 
		              onChangeText={counter => this.setState({counter})}
									value={counter.toString()}
									keyboardType='phone-pad'
								/>
						</Item>
						</View>: null}
						</Form>
          </Card>
          {isClicking ? 
              <Content style={contentStyle}>
              {isChecking? <CheckedData onPress={() => this.props.navigation.navigate('process')} /> : <Processed />}
              </Content> : 
              <Content>
              {isBuying? <Text style={{textAlign: 'center'}}>canceled</Text>: null}
              </Content>
            }
        {/*for modal pop up*/}
        <ModalPopUp visible={modalVisible} 
          onRequestClose={() => this.setState({modalVisible:false})}
          onPress={() => this.setState({ modalVisible:false })}
        >
        	<Content>
        	<FlatList 
	        	data={ArrCode}
	        	keyExtractor={(i, j) => j.toString()}
	        	renderItem={({item}) => 
	        	<VoucherResponse item={item}
	        	onPress={()=> this.setState({ code: item.vtype, price: item.harga, modalVisible: false })}
	        	/>
	        	}
        	/>
        	</Content>
        </ModalPopUp>
      	</Content>
        </ReloadScreen>
        {isShowButton ?
        	<Footer style={footerStyles}>
        	{isBuying ? <PleaseWait />:
        		<TouchableOpacity onPress={this._onBuyingDataCodeVoucher} style={SubmitStyle}>
        		<Text style={textStyle}>BAYAR</Text>
        		</TouchableOpacity>
        	}
        	</Footer> : 
        	<Footer style={footerStyles}>
        	<TouchableOpacity style={SubmitBlockStyle}>
        	<Text style={textStyle}>BAYAR</Text>
        	</TouchableOpacity>
        	</Footer>
    		}
      </Container>
    );
  }
}