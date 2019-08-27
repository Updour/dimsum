'use strict';
   
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { TouchableOpacity } from 'react-native';
import { 
  Container, Content, Text, Card, Form, Item, Label, Picker, Icon, Input, Footer,
} from 'native-base'
import { 
  pNettelKom, netInbox, netOutbox, netInterval, reloaded, ReloadScreen, tags, pays, types, 
  Empty, styles, Reply, timers, PleaseWait, Processed, PickerDroid, Coders
} from '../../CollectionScreen'

import TelkomScreenHeader from './PropsHeaderComponent/TelkomScreenHeader'

export default class TelkomPpobScreen extends Component {
  _isMounted = false;
  state = {
    codes: [],
    selectCodes: '',
    input: '',
    tag: tags(),
    pay: pays(), 
    type: types(),
    refreshing: false,
    isChecking: false,
    isPaying: false,
    isShowINput: false
  }

  componentDidMount () {
    this._isMounted = true;
    this._onRetrieveValueDataStorage()
    this._onRetrieveValueProductNames()
    this._interval = setInterval(() => {
      this._onRetireveValueDataOutbox()
      return axios.get(netInterval())
    }, reloaded());
  }

  componentWillUnmount () {
    this._isMounted = false;
    clearInterval(this._interval)
  }

   // retrieve storage
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      this.setState({ id : parsed.agenid, hp: parsed.hp, pin: parsed.pin })
        // setTimeout(() => { this._onRetreiveValueDataUser() }, timer());
    }catch(err) {
      throw err;
    }
  }
    // get product name
  _onRetrieveValueProductNames = async () => {
    try {
      let results = await axios.get(pNettelKom())
      let data = results.data.data
      this.setState({ codes : data })
    }catch(error) {
      console.error(error)
    }
  }
  // 
  _onRetrieveValueDataCode = value => {
    this.setState({ selectCodes: value }, ()=> {
      let { selectCodes, codes } = this.state;
      let data = codes.map(i => ({ name: i.product_name }))
      this.setState({ datas : data })
        if (selectCodes !== this.state.datas) {
          this.setState({ isShowINput: true })
        }
        if (selectCodes == '') { Coders() }
    })
  }
  
  // checked bill
  _onCheckingBillProductName = async () => {
    try {
      let { tag, id, hp, pin, selectCodes, input, type } = this.state;
      if (input === '') {return Empty()}
        this.setState({ isChecking: true })
      let posts = {
        in_hpnumber: hp,
        in_message: tag +'.'+ selectCodes +'.'+ input +'.'+ pin,
        agenid: id,
        tipe: type,
      }
      let results = await axios.post(netInbox(), posts)
      setTimeout(() => {
        this.setState({ isChecking: false, isPaying: true })
      }, timers());
    }catch(error) {
      throw error;
    }
  }
  // paybill
  _onPayingBillProductName = async () => {
    try {
      let { pay, id, hp, pin, selectCodes, input, type } = this.state;
      if (input === '' || selectCodes === '') { return Empty() }
        this.setState({ isPaying: true, isChecking: true })
      let posts = {
        in_hpnumber: hp,
        in_message: pay +'.'+ selectCodes +'.'+ input +'.'+ pin,
        agenid: id,
        tipe: type,
      }
      let results = await axios.post(netInbox(), posts)
      setTimeout(() => {
        this.setState({ isChecking: false, isPaying: false })
      }, timers());
    }catch(err){
      throw err;
    }
  }
  // reply from server
  _onRetireveValueDataOutbox = async () => {
    try {
      let results = await axios.get(netOutbox() + this.state.id)
      let data = results.data.data[0].out_message
      if (this._isMounted) { 
        this.setState({ reply: data, refreshing: false })
      }
    } catch(err){
      this.setState({ refreshing: false })
    }
  }

  _onReloadScreenAndData = () => {
    this.setState({ 
      refreshing: true, 
      isChecking: '',
      isPaying: '',
      isShowINput: ''
    }, ()=> this._onRetireveValueDataOutbox())
  }
  render() {
    let { input, reply, codes, isShowINput, selectCodes, refreshing, isChecking, isPaying } = this.state;
    let { 
      contentStyle, cardStyles, formStyles, iconAStyles, iconInStyles, labelAStyles, labelInStyles,
      footerStyles, SubmitStyle, textStyle, textItemA, textItemIn
    } = styles;
    return (
      <Container style={contentStyle}>
      <ReloadScreen 
        refreshing={refreshing}
        onRefresh={this._onReloadScreenAndData}
       >
      <TelkomScreenHeader {...this.props} onPress={this._onReloadScreenAndData}/>
        <Content>
          <Card style={cardStyles}>
            <Form style={formStyles}>
            <Label style={selectCodes ? textItemA:textItemIn} >Kode Produk</Label>
              <Item>
                  <Icon name="ios-cart" style={selectCodes ? iconAStyles : iconInStyles}/>
                <PickerDroid 
                  selectedValue={selectCodes}
                  onValueChange={this._onRetrieveValueDataCode}
                >
                  {codes.map((i, j) => 
                    <Picker.Item label={i.product_info} value={i.product_name} key={j}/>
                    )}
                </PickerDroid>
              </Item>
              {isShowINput ? 
              <Item floatingLabel>
                <Icon name="ios-person" style={input ? iconAStyles : iconInStyles}/>
                  <Label style={input ? labelAStyles : labelInStyles}>ID Pelanggan</Label>
                  <Input 
                    onChangeText={input => this.setState({input})}
                    value={input}
                    
                  />
              </Item>: null
            }
            </Form>
          </Card>
          {isChecking ?
            <Processed/> : <Reply><Text>{reply}</Text></Reply> 
          }
        </Content>
      </ReloadScreen>
      {isPaying ? 
        <Footer style={footerStyles}>
        {isChecking ? <PleaseWait /> :
          <TouchableOpacity style={SubmitStyle} onPress={this._onPayingBillProductName}>
            <Text style={textStyle}>Bayar Tagihan</Text>
          </TouchableOpacity>
        }
        </Footer> :
        <Footer style={footerStyles}>
        {isChecking ? <PleaseWait /> :
          <TouchableOpacity style={SubmitStyle} onPress={this._onCheckingBillProductName}>
            <Text style={textStyle}>Cek Tagihan</Text>
          </TouchableOpacity>
        } 
        </Footer> 
      }
         
      </Container>
    );
  }
}