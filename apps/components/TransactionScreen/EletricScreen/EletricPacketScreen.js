'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Contacts from 'react-native-contacts';
import { Col, Grid } from "react-native-easy-grid";
import axios from 'axios'

import { View, FlatList, TouchableOpacity } from 'react-native';
import { 
  Container, Content, Text, Card, Form, Item, Label, Picker, Icon, Input, Footer
} from 'native-base'
import { 
  netUsers, eNetPrefix, eNetDenom, eNetTypePacket, netInbox, timer, types, Empty, 
  ModalPopUp, PickerDroid, ReloadScreen, PleaseWait, Processed, styles,
  formatPrice, timers, CheckedData, ReadingContact, Denied, ModalContact, ContactItem
} from '../../CollectionScreen'

import HeaderEletricPacketScreen from './PropHeaderComponent/HeaderEletricPacketScreen'
import ResponseDenomPacket from './PropsResponse/ResponseDenomPacket'

export default class EletricPacketScreen extends Component {
  _isMounted = false;
  state = {
    handphone: '',
    prefix: '',
    denom: '',
    denomPrice: '',
    selectTypes: '',
    counter: 1,
    contacts: [],
    isContacts: [],
    ArrDenom: [],
    ArrTypes: [],
    modalVisible: false,
    refreshing: false,
    isShowNominal: false,
    isShowPhone: false,
    isBuying: false,
    isChecking: false,
    isClicking: false,
    modalContact: false,
    types: types()
  }

  componentDidMount() {
    this._isMounted = true;
    this._onRetrieveValueDataStorage()
    this._onRetreiveValueDataTypes()
  }

  componentWillUnmount() {
    this._isMounted = false;
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
      let results = await axios.get(eNetPrefix() + this.state.handphone.substring(0, 4) )
      let data = results.data.data[0].opr_pref
      console.log(data)
      if (this._isMounted) { this.setState({ prefix: data })}
    }catch(err) {
      throw err;
    }
  }
  // types
  _onRetreiveValueDataTypes = async () => {
    try {
      let results = await axios.get(eNetTypePacket())
      let data = results.data
      if (this._isMounted) { this.setState({ ArrTypes: data })}
    } catch(err){
      throw err;
    }
  }
  // check e number
  _onCheckNumberRenderPrefix = value => {
    this.setState({ handphone : value }, () => {
      if (this.state.handphone.length === 4) {
        this._onRetrieveValueDataPrefix()
      }
      // if (this.state.handphone.length === 11) {
      //   this._onRetrieveValueDataDenom()
      //     setTimeout(() => {
      //       this.setState({ isShowNominal : true })
      //     }, 2000);
      // }
      if (this.state.handphone.length === 10) {
            this.setState({ isShowPhone : true })
          }
    })
  }
  _onRetrieveValueDataPacket = value => {
    this.setState({ selectTypes: value }, ()=> {
      let { selectTypes } = this.state;
      if (selectTypes === "PAKET DATA" || selectTypes === "PAKET TELPON" || selectTypes === "PAKET SMS" ||
        selectTypes === "PAKET TRANSFER" || selectTypes === "TCASH") {
        this.setState({ isShowNominal: true }, () => setTimeout(() => {
          this._onRetrieveValueDataDenom()
        }, 1000))
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

  // select denome 
  _onRetrieveValueDataDenom = async () => {
    try {
      let { id, handphone, prefix, selectTypes } = this.state;
      if (handphone ==='' || prefix ==='') { return Empty() }
      this.setState({ modalVisible: true })

      let result = await axios.get(eNetDenom() + id +'/'+ prefix +'/'+ this.state.selectTypes)
      let data = result.data.data
      let values = data.map(i => ({
        vtype: i.vtype,
        harga: i.harga + this._onMergeValueDataPriceOperator(i.opr, this.state.users),
        ket: i.ket
      }))
      this.setState({ ArrDenom: values, refreshing: false })
    }catch(err) {
      console.log(err)
    }
  }

// buy eletric
  _onBuyingEletricPacketData = async () => {
    try {
      let { handphone, denom, id, hp, pin, types, counter } = this.state;
      if (handphone ==='' || denom ==='' ) { return Empty() }
        this.setState({ isBuying: true, isClicking: true })
      let posts = {
        in_hpnumber: hp,
        in_message: denom +'.'+ handphone +'.'+ pin +'.'+ counter,
        agenid: id,
        tipe: types
      }
      let response = await axios.post(netInbox(), posts)
      setTimeout(() => {
        console.log(response)
        this.setState({ isBuying: false, isChecking: true, })
      }, timers()); 
    } catch(err){
      throw err;
    }
  }
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
         // let results =  data.sort((a,b) => a.name || '', b.name || '' => a.localeCompare(b))
          this.setState({ 
            contacts: results, 
            modalContact: true, 
            isShowNominal: true 
          })
            setTimeout(() => {
              this._onRetrieveValueDataPrefix()
            }, 1500);
         
        }
      })
    })
  }
 
  _onRetrieveContactSearch = text => {
    const newData = this.state.contacts.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ isContacts: newData, search: text });
  }
  // 
  _onReloadScreenAndData = () => {
    this.setState({ 
      refreshing: true, 
      isChecking: '', 
      isClicking: '',
      isShowNominal: '',
      isShowPhone: '',
      handphone: ''
    }, ()=> this._onRetreiveValueDataUser())
  }
  render() {
    let { 
      handphone, denom, denomPrice, counter, ArrDenom, ArrTypes, modalVisible, refreshing, isShowNominal,
      isBuying, isChecking, isClicking, selectTypes, isShowPhone, modalContact, contacts
    } = this.state;
    let { 
      contentStyle, contentBg, contentRender, cardStyles, footerStyles, SubmitStyle, 
      SubmitBlockStyle, textStyle, formStyles, labelAStyles, labelInStyles, iconAStyles, 
      iconInStyles ,textItemPrefix, textItemPrice, ItemPrice, textItemA,textItemIn
    } = styles;
    return (
      <Container>
      <ReloadScreen
        refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
        style={contentStyle}
      >
      <HeaderEletricPacketScreen {...this.props} />
      	<Content>
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
            {isShowPhone ? 
            <View>
              <Label style={selectTypes ? textItemA:textItemIn} >Select Type</Label>
              <Item>
                  <Icon name="ios-repeat" style={selectTypes ? iconAStyles : iconInStyles}/>
                  <PickerDroid 
                    selectedValue={selectTypes}
                    onValueChange={this._onRetrieveValueDataPacket}
                  >
                  {ArrTypes.map((i,j) => 
                    <Picker.Item label={i} value={i} key={j}/>
                    )}
                </PickerDroid>
              </Item>
            </View>:null
            }
            
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
              <Item floatingLabel>
                <Icon name="ios-cash" style={counter ? iconAStyles:iconInStyles}/>
                  <Label style={counter ? labelAStyles : labelInStyles}>No Transaction</Label>
                  <Input 
                    onChangeText={counter => this.setState({counter})}
                    value={counter.toString()}
                    keyboardType='phone-pad'
                  />
              </Item>
            </View>: null
          }
          </Form>
        </Card>

            {isClicking ? 
              <Content style={contentStyle}>
              {isChecking? <CheckedData onPress={() => this.props.navigation.navigate('process')} /> : <Processed />}
              </Content> : 
              <Content>
              {isBuying? <Text>Beli Pulsa</Text>: null}
              </Content>
            }
        </Content>
        
      {/* modal denom*/}

          <ModalPopUp visible={modalVisible} onRequestClose={() => this.setState({modalVisible:false})}
            onPress={() => this.setState({ modalVisible:false })}
          >
              <FlatList 
                data={ArrDenom}
                keyExtractor={(i, j) => j.toString()}
                renderItem={({item}) =>  
              <ResponseDenomPacket item={item} onPress={() => 
                this.setState({ denom : item.vtype, denomPrice: item.harga, modalVisible:false })}
                />
              }
              />
          </ModalPopUp>

        {/*for read contact */}
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
            handphone: item.number.replace('+62', '0').replace('-', '').replace('-', ''), modalContact:false,
          })}
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
        <TouchableOpacity onPress={this._onBuyingEletricPacketData} style={SubmitStyle}>
            <Text style={textStyle}>Beli Paket</Text>
          </TouchableOpacity>
        }
      </Footer> : 
      <Footer style={footerStyles}>
      <TouchableOpacity style={SubmitBlockStyle}>
        <Text style={textStyle}>Beli Paket</Text>
      </TouchableOpacity>
      </Footer>
    }
      </Container>
    );
  }
}
