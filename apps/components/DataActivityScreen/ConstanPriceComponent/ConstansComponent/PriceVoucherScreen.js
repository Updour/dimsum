'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
 
import { FlatList } from 'react-native';
import { Picker, Container,Content, Text, Card, Form, Item } from 'native-base'
import { 
  netUsers, netVoucher, netTypeVoucher, netAllResult, PickerDroid, Submit, DotIndicator, tabStyles, 
  styles, ReloadScreen,  timer
} from '../../../CollectionScreen'

import VoucherPriceHeader from '../PropsHeader/VoucherPriceHeader'
import PacketResponse from '../PropsResponse/PacketResponse'

export default class PriceVoucherScreen extends Component {
  _isMounted = false
  state = {
    arrData: [],
    provider: [],
    type: [],
    users: [], 
    refreshing: false,
    loading: false,
    typeSelected: '',
    selected: '',
  };

  // 
  componentWillMount() {
    this._isMounted = true;
    this._onRetrieveValueDataStorage()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  // onGet AsyncStorage
  _onRetrieveValueDataStorage = async () => {
    let val = await AsyncStorage.getItem('@keyData')
    if (val) {
      let parsed = JSON.parse(val)
      this.setState({ id : parsed.agenid })
      setTimeout(() => {
        this._onRetrieveValueDataUser()
        this._onRetrieveValueDataProviderAndType()
      }, timer());
    }
  }
  // fetching users
  _onRetrieveValueDataUser = async () => {
    try {
      let uri = netUsers() + this.state.id
      let result = await axios.get(uri)
      let data = result.data.data
      let telkomsel = data.pdsub1 + data.pddist1
      let indosat = data.pdsub2 + data.pddist2
      let xl = data.pdsub3 + data.pddist3
      let smartfren = data.pdsub4 + data.pddist4
      let three = data.pdsub7 + data.pddist7
      let axis = data.pdsub10 + data.pddist10
      let pln = data.pdsub12 + data.pddist12
      if (this._isMounted) {
        this.setState({ 
          users: data, telkomsel: telkomsel, indosat: indosat, xl: xl,
          smartfren: smartfren, three: three, axis: axis, pln: pln,
        })
      }
    } catch(error) {
      console.error(error)
    } 
  }
  
  // merge to plus in price 
  _onRetrieveAllDataToAddAndReduceValue = name => {
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

  // fetching provider | type to render
  _onRetrieveValueDataProviderAndType = async () => {
    try {
      let fetchURL = (url) => axios.get(url);
      let promiseArray = [netVoucher(), netTypeVoucher() ].map(fetchURL);
      let data = await Promise.all(promiseArray)
       this.setState({
        provider: data[0].data, 
        type: data[1].data,
      })
    } catch(err) {
      console.warn(err)
    }
  }

  // clicked to have result
  _onRetrieveValueDataSearchConditions = async () => {
    this.setState({ loading: true })
    try {
      let { id, selected, typeSelected } = this.state;
      let uri = netAllResult() + id + '/' + selected + '/' + typeSelected
      let results = await axios.get(uri)
      let data = results.data.data.map(i => ({
        vtype: i.vtype,
        nominal: i.nominal,
        harga: i.harga + this._onRetrieveAllDataToAddAndReduceValue(i.opr, this.state.users),
        ket: i.ket
      }))
      setTimeout(() => {
        this.setState({ 
          arrData: data, loading: false, refreshing: false
        })
      }, 1500);
    }catch(err) {
      this.setState({ refreshing: false })
    }
  } 

  // refreshing data
  _onRefreshingData = () => {
    this.setState({
      refreshing: true,
      arrData: ''
    }, ()=> this._onRetrieveValueDataSearchConditions());
  }
  render() {
    let { arrData, provider, typeSelected, selected, type } = this.state;
    let { textSubmit, cardStyles, textItemA, textItemIn } = styles;
    return (
      <Container>
      <VoucherPriceHeader {...this.props} onPress={this._onRefreshingData} />
        <ReloadScreen 
          refreshing={this.state.refreshing}
          onRefresh={this._onReloadScreenAndData}
        >
        <Content>
          <Card style={cardStyles}>
              <Form>
                <Text style={selected ? textItemA : textItemIn }>Select Provider</Text>
                  <Item picker>
                    <PickerDroid
                      selectedValue={selected}
                      onValueChange={selected => this.setState({selected})}
                      placeholder='Select your Provider'
                    >
                    {provider.map((i, x) => 
                      <Picker.Item label={i} value={i} key={x} />
                    )}
                    </PickerDroid>
                  </Item>
                  <Text style={typeSelected ? textItemA : textItemIn }>Select Type</Text>
                  <Item picker>
                    <PickerDroid
                      selectedValue={typeSelected}
                      onValueChange={typeSelected => this.setState({typeSelected})}
                      placeholder='Select your type'
                    >
                      {type.map((i, x) => 
                      <Picker.Item label={i} value={i} key={x} />
                    )}
                    </PickerDroid>
                  </Item>
                <Submit onPress={this._onRetrieveValueDataSearchConditions}>
                  <Text style={textSubmit}>Check</Text>
                </Submit>
                </Form>
              </Card>
              {
                this.state.loading ? 
                <DotIndicator color='blue'/> :
                <FlatList 
                  data={arrData}
                  keyExtractor={(x, y) => y.toString()}
                  renderItem={PacketResponse}
                  showsVerticalScrollIndicator={false}
                />
              }
        </Content>
        </ReloadScreen>
      </Container>
      );
  }
}