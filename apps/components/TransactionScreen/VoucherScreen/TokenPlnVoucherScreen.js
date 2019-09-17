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
	vNetTokenPln, styles, netUsers, netInbox, timer, types, ModalPopUp, setHp, setNotifHp,
	Empty, formatPrice, ReloadScreen, PleaseWait, CheckedData, Processed, timers
} from '../../CollectionScreen'

import PlnTokenHeader from './PropsHeaderComponent/PlnTokenHeader'
import VoucherResponse from './PropsResponse/VoucherResponse'

export default class TockenPlnVoucherScreen extends Component {
	_isMounted = false;
	state= {
		users: [],
		ArrCode: [],
		input: '',
		phone: '',
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
      	hp: parsed.hp, pin: 
      	parsed.pin 
      }, () => setTimeout(() => { 
      		this._onRetreiveValueDataUser() }, timer())
      )
    }catch(err) {
      throw err;
    }
  }
 // users
  _onRetreiveValueDataUser = async () => {
    try {
      let result = await axios.get(netUsers() + this.state.id)
      let data = result.data.data
      if (this._isMounted) { this.setState ({
        refreshing: false,
        users : data,
        telkomsel: data.pdsub1 + data.pddist1,
        indosat: data.pdsub2 + data.pddist2,
        xl: data.pdsub3 + data.pddist3,
        smartfren: data.pdsub4 + data.pddist4,
        three: data.pdsub7 + data.pddist7,
        axis: data.pdsub10 + data.pddist10,
        pln: data.pdsub12 + data.pddist12
      })}
    } catch(err) {
      this.setState({ refreshing: false })
    }
  }

  // merge data opr price
  _onMergeValueDataPriceOperator = name => {
    let { telkomsel, indosat, xl, smartfren, three, axis, pln } = this.state;
     if (name === 'TELKOMSEL') return telkomsel
      if (name === 'INDOSAT') return indosat
        if (name === 'XL') return xl
          if (name === 'SMARTFREN') return smartfren
            if (name === 'THREE') return three
              if (name === 'AXIS') return axis
                if (name === 'PLN') return pln
                  return 0
  }
  // show chilf form render
  _onShowingChildMenuForm = value => {
  	this.setState({ input: value }, () => {
      // console.log('a', this.state.input)
      if (this.state.input) {
        this.setState({ isShowButton: true })
      }
  		if (this.state.input.length === 9) {
  			this._onRetreiveValueDataCodeVoucher()
  		}
  		if (this.state.input.length === 10) {
  			this.setState({ isShowButton: true })
  		}
  	})
  }
  // code voucher
  _onRetreiveValueDataCodeVoucher = async () => {
  	try {
  		if (this.state.input ==='') { return Empty() }
  		this.setState({ modalVisible: true })
  		let results = await axios.get(vNetTokenPln())
  		 let data = results.data.data.map(i => ({
        vtype: i.vtype,
        harga : i.harga + this._onMergeValueDataPriceOperator(i.opr, this.state.users),
        ket: i.ket
      }))
  		 this.setState({ ArrCode: data })
  	}catch(err) {
  		throw err;
  	}
  }
  // buying voucher
  _onBuyingDataCodeVoucher = async () => {
  	try {
  		let { phone, code, input, isBuying, id, hp, pin, types, counter } = this.state;
  		if (code === '' || input === '') { return Empty() }
  			this.setState({ isBuying: true, isClicking: true })
  		let posts = {
  			in_hpnumber: hp,
  			in_message: code +'.'+ input +'.'+ pin +''+ phone +'.'+ counter,
  			agenid: id,
  			tipe: types
  		}
  		let results = await axios.post(netInbox(), posts)
  		setTimeout(() => {
  			this.setState({ isBuying: false, isChecking: true })
  		}, timers());
  	}catch(err) {
  		throw err;
  	}
  }
  // 
  _onValidationPhoneNumber = value => {
    let { phone } = this.state;
    this.setState({ phone: value }, () => {
      if (phone.length == '1') {
        setHp()
        setNotifHp()
      }
      if (phone.length == '3') {
        setNotifHp()
      }
      if (phone.length == '10') {
        setNotifHp()
      }
    })
  }
  //
  _onReloadScreenAndData = () => {
    this.setState({ 
      refreshing: true, 
      input: '', 
      isClicking: ''
    }, ()=> this._onRetreiveValueDataUser())
  }
  render() {
  	let { 
  		input, phone, counter, code, ArrCode, modalVisible, isShowButton, isBuying,
  		isClicking, isChecking
  	} = this.state;

  	let { 
  		contentStyle, cardStyles, formStyles, iconAStyles, iconInStyles, labelAStyles, 
  		labelInStyles, footerStyles, SubmitStyle, textStyle, textItemPrice, ItemPrice, 
  		SubmitBlockStyle, itemStyles
  	} = styles;
    return (
      <Container>
      <PlnTokenHeader {...this.props} onPress={this._onReloadScreenAndData}/>
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
              <Item stackedLabel style={{marginLeft: 35}}>
                <Icon name="ios-phone-portrait" style={textItemPrice}/>
                  <Label style={phone ? labelAStyles : labelInStyles}>* Nomor Handphone</Label>
                  <Input 
                    onChangeText={phone => this._onValidationPhoneNumber(phone)}
                    value={phone}
                    placeholder='* 081234567890'
                    keyboardType='phone-pad'
                  />
              </Item>
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
		        		onPress={() => this.setState({ code: item.vtype, price: item.harga, modalVisible:false })}/>
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