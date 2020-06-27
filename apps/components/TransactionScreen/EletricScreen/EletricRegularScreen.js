'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Contacts from 'react-native-contacts';

import { PermissionsAndroid, View, FlatList, TouchableOpacity, Switch } from 'react-native';
import { 
  Container, Content, Text, Card, Form, Item, Label, Picker, Icon, Input, Footer
} from 'native-base'
import { Col, Grid } from "react-native-easy-grid";
import { 
  netUsers, eNetAllPrefix, eNetDenom,reloaded, netInbox, timer, types, Empty, styles, CantStorage,
  ModalPopUp, PrefixNull, ReloadScreen, PleaseWait, Processed, Denied, switchStyles, textSwitchStyles,
  formatPrice, timers, CheckedData, ReadingContact, Prefix, ModalContact, ContactItem
} from '../../CollectionScreen'

import HeaderEletricScreen from './PropHeaderComponent/HeaderEletricScreen'
import ResponseDenom from './PropsResponse/ResponseDenom'

export default class EletricRegularScreen extends Component {
  _isMounted = false;
  state = {
    handphone: '',
    prefix: '',
    denom: '', 
    denomPrice: '',
    search: '',
    counter: 1,
    ArrDenom: [],
    isContacts: [],
    contacts: [],
    contact: [],
    // prov: [],
    modalVisible: false,
    modalContact: false,
    refreshing: false,
    isShowNominal: false,
    isBuying: false,
    isChecking: false,
    isClicking: false,
    isSwitchValue: false,
    isOprByu: false,
    types: types(),
  }

  componentDidMount() {
    this._isMounted = true;
    this._onRetrieveValueDataStorage()
    this._onRetrieveValueDataPrefix()
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this._interval)
  }

  // retrieve storage
  _onRetrieveValueDataStorage = async () => {
    try {
      let val = await AsyncStorage.getItem('@keyData')
      let parsed = JSON.parse(val)
      this.setState({ id : parsed.agenid, hp: parsed.hp, pin: parsed.pin })
        setTimeout(() => {
          this._onRetreiveValueDataUser()
        }, timer());
    }catch(err) {
      throw err;
    }
  }
  // provider
  _onRetrieveValueDataPrefix = async () => {
    try {
      let { handphone } = this.state;
      let response = await axios.get(eNetAllPrefix())
      let prov = response.data.data
        if(handphone.length > 3){
          for (let i = 0; i < prov.length; i++) {
            prov.filter(item => {
              for(let j = 0; j < item.prefix.length; j++ ) {
                if (item.prefix.toLowerCase().indexOf(handphone.substr(0, 4)) !== -1) {
                  this.setState({
                    prefix: item.opr_pref, 
                    isShowNominal: true 
                  })
                  return false
                }
              }
            })
          }
        }
    }catch(err) {
      throw err;
    }
  }


  // check e number
  _onCheckNumberRenderPrefix = value => {
    this.setState({ handphone : value }, () => {
      if (this.state.handphone) {
        this._onRetrieveValueDataPrefix()
      }
      if (this.state.handphone.length === 10) {
        this._onRetrieveValueDataDenom()
          setTimeout(() => {
            this.setState({ isShowNominal : true })
          }, 1000);
      }
    })
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
      throw err;
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

  // select denome  || filter prefix
  _onRetrieveValueDataDenom = async () => {
    try {
      let { id, handphone, prefix } = this.state;
      if (handphone ==='' || prefix ==='') { return Prefix() }
      this.setState({ modalVisible: true })

      let result = await axios.get(eNetDenom() + id +'/'+ prefix)
      let data = result.data.data

      if (prefix === 'BYU') {
        let valueByu = data.map(i => ({
          typed: i.vtype,
          denomsasi: i.denomsasi,
          harga: i.harga + this._onMergeValueDataPriceOperator(i.opr, this.state.users),
          ket: i.ket
        }))
        this.setState({ ArrDenom: valueByu, refreshing: false, isOprByu: true })
        // console.log(valueByu)
        return
      }

      let valueNotByu = data.map(i => ({
        denomsasi: i.denomsasi,
        harga: i.harga + this._onMergeValueDataPriceOperator(i.opr, this.state.users),
        ket: i.ket
      }))
      // console.log('data', values)
      this.setState({ ArrDenom: valueNotByu, refreshing: false })
    }catch(err) {
      throw err;
    }
  }

// buy eletric
  _onBuyingEletricRegular = async () => {
    try {
      let { handphone, denom, id, hp, pin, isOprByu, typed, types, counter, isSwitchValue } = this.state;
      console.log('opr', isOprByu)
      if (handphone ==='' || denom ==='' ) return Empty() 
        this.setState({ isBuying: true, isClicking: true })

      // if code byu
      if (isOprByu === true) {
        let posts = {
          in_hpnumber: hp,
          in_message: typed +'.'+ handphone +'.'+ pin +'.'+ counter,
          agenid: id,
          tipe: types
        }
        let response = await axios.post(netInbox(), posts)
        setTimeout(() => {
          this.setState({ isBuying: false, isChecking: true, })
        }, timers())
        return
      }

      // if trx 2
      if (isSwitchValue === false) {
         let posts = {
          in_hpnumber: hp,
          in_message: denom +'.'+ handphone +'.'+ pin,
          agenid: id,
          tipe: types
        }
        // console.log('false', posts)
        let response = await axios.post(netInbox(), posts)
        setTimeout(() => {
          this.setState({ isBuying: false, isChecking: true, })
        }, timers())
        return;
      }
        let posts = {
          in_hpnumber: hp,
          in_message: denom +'.'+ handphone +'.'+ pin +'.'+ counter,
          agenid: id,
          tipe: types
        }
        // console.log('posts', posts)
        let response = await axios.post(netInbox(), posts)
        setTimeout(() => {
          this.setState({ isBuying: false, isChecking: true, })
        }, timers())
     
     
    } catch(err){
      throw err;
    }
  }
  // _onRetrieveValueDataPrefix
// _onCheckNumberRenderPrefix
  // 
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
          let results = data.sort((a,b)=>{
            a= a.name||'';
            b= b.name||'';
            return a.localeCompare(b)})
          this.setState({ 
            contacts: results, 
            modalContact: true, 
            isShowNominal: true 
          })
           
        }
      })
    })
  }
 
 // seacrh data contact permission to android
_onRetrieveContactSearch = text => {
    const newData = this.state.contacts.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ isContacts: newData, search: text });
  }

     // switch to save data
  _onLoopingTwoTransaction = value => {
    this.setState({ isSwitchValue: value })
    if(value == true) {
      const { handphone, denom } = this.state;
      if (handphone === '' || denom === '') {
        Empty()  
        this.setState({ isSwitchValue: false })
      } else {
        this.state.counter++
        this.setState({ isSwitchValue: true })
      }
    } else {
      this.setState({ isSwitchValue: false, counter: 1 })
    }
  }
  // 
  _onReloadScreenAndData = () => {
    this.setState({ 
      refreshing: true, 
      isSwitchValue: false,
      isShowNominal: false,
      isChecking: '', 
      isClicking: '', 
      handphone: '',
      prefix: '',
      denom: '',
      counter: 1
    }, ()=> this._onRetreiveValueDataUser())
  }
  render() {
    let { 
      handphone, denom, denomPrice, counter, ArrDenom, modalVisible, refreshing, isShowNominal,
      isBuying, isChecking, isClicking, modalContact, contacts, contact, isSwitchValue
    } = this.state;
    let { 
      contentStyle, contentBg, contentRender, cardStyles, footerStyles, SubmitStyle, 
      SubmitBlockStyle, textStyle, formStyles, labelAStyles, labelInStyles, iconAStyles, 
      iconInStyles ,textItemPrefix, textItemPrice, ItemPrice, textSwitchStyles
    } = styles;
    return (
      <Container>
      <ReloadScreen
        refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
        style={contentStyle}
      >
      <HeaderEletricScreen {...this.props} />
      	<Content >
          <Card style={cardStyles}>
          <Form style={formStyles}>
            <Item floatingLabel>
            <Icon name="ios-phone-portrait" style={handphone ? iconAStyles:iconInStyles}/>
              <Label style={handphone ? labelAStyles : labelInStyles}>Nomor Handphone</Label>
              <Input 
                onChangeText={handphone => this._onCheckNumberRenderPrefix(handphone.replace(/[^0-9]/g, ''))}
                value={handphone}
                keyboardType='phone-pad'
              />
              <Icon name="ios-contact" style={handphone ? iconAStyles:iconInStyles}
                onPress={this._onRetireveNumberPhoneContact}
              />
            </Item>
            <Text style={textItemPrefix}>{this.state.prefix}</Text>
          {isShowNominal ? 
            <View>
              <Item floatingLabel>
              <Icon name="ios-pricetag" style={denom ? iconAStyles:iconInStyles}/>
                <Label style={denom ? labelAStyles : labelInStyles}>Nominal</Label>
                <Input 
                  onChangeText={denom => this.setState({denom})}
                  value={denom}
                  editable={false}
                />
                <Icon name="ios-arrow-dropdown" onPress={this._onRetrieveValueDataDenom} />
              </Item>
              <Grid>
                <Col>
                  <Text style={textItemPrice}>Harga</Text>
                </Col>
                <Col>
                  <Text style={ItemPrice}>Rp. {formatPrice(this.state.denomPrice)}</Text>
                </Col>
              </Grid> 
 
            {/*chnage status transation to 2 when clicked*/}
              { isSwitchValue ? <Item floatingLabel>
                <Icon name="ios-cash" style={counter ? iconAStyles:iconInStyles}/>
                  <Label style={counter ? labelAStyles : labelInStyles}>Nomor Transaksi</Label>
                  <Input 
                    onChangeText={counter => this.setState({counter})}
                    value={counter.toString()}
                    keyboardType='phone-pad'
                  />
                  <Icon name="ios-close-circle-outline" onPress={() => this.setState({ counter: 1 })} />
              </Item>: null
              }
            <Item style={{marginTop: 8}}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              onValueChange={value => this._onLoopingTwoTransaction(value)}
              style={switchStyles}
              value={isSwitchValue} 
            />
              <Label style={textSwitchStyles}>Switch untuk transaksi ke 2 | 3 | 4</Label>
            </Item>
            </View> : null
          }
          </Form>
        </Card>

            {isClicking ? 
              <Content style={contentStyle}>
              {isChecking? <CheckedData onPress={() => this.props.navigation.navigate('process')} /> : <Processed />}
              </Content> : 
              <Content>
              {isBuying?  <Text style={{textAlign: 'center'}}>canceled</Text>: null}
              </Content>
            }
        </Content>
        
      {/* modal denom*/}
      <ModalPopUp visible={modalVisible} 
        onRequestClose={() => this.setState({modalVisible:false})}
        onPress={() => this.setState({ modalVisible:false })}
      >
        <FlatList 
          data={ArrDenom}
          keyExtractor={(i, j) => j.toString()}
          renderItem={({item}) =>  
            <ResponseDenom item={item} onPress={() => 
              this.setState({ 
                denom : item.denomsasi, 
                denomPrice: item.harga, 
                typed: item.typed,
                modalVisible:false 
              })
            }
              />
            }
      />
      </ModalPopUp>

    {/*modal contact Select */}
    <ModalContact 
      visible={modalContact} 
      onRequestClose={() => this.setState({modalContact:false})}
      onPress={() => this.setState({modalContact:false})}
      refreshing={this.state.refreshing}
      onRefresh={this._onReloadScreenAndData}
        data={this.state.isContacts && this.state.isContacts.length > 0 ? this.state.isContacts : this.state.contacts}
        renderItem={({item}) => 
        <ContactItem item={item} onPress={() => 
          this.setState({ 
            handphone: item.number.replace('+62', '0').replace(' ', '').replace('-', '').replace('-', ''), 
            modalContact:false
          }, () => this._onRetrieveValueDataPrefix())}
          />
        }
      >
      <View style={footerStyles}>
        <Item rounded>
          <Icon name="ios-search"/>
            <Input placeholder="Pencarian Nomor Handphone" 
              onChangeText={search => this._onRetrieveContactSearch(search)}
              value={this.state.search}
              autoFocus={true}
            />
          <Icon name="ios-close" style={{ fontSize: 30, marginRight: 13 }}
          onPress={() => this.setState({search: ''})}/>
        </Item>
      </View>
    </ModalContact>

        </ReloadScreen>
      {/*footer*/}
      {isShowNominal ? 
      <Footer style={footerStyles}>
        {isBuying ? <PleaseWait />:
        <TouchableOpacity onPress={this._onBuyingEletricRegular} style={SubmitStyle}>
            <Text style={textStyle}>Beli Pulsa</Text>
          </TouchableOpacity>
        }
      </Footer> : 
      <Footer style={footerStyles}>
      <TouchableOpacity style={SubmitBlockStyle}>
        <Text style={textStyle}>Beli Pulsa</Text>
      </TouchableOpacity>
      </Footer>
    }
      </Container>
    );
  }
}
