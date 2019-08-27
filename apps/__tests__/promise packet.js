'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { FlatList } from 'react-native';
import { Picker, Container, Content, Text, Card, Form, Item } from 'native-base'
import { 
	netUsers, netProvider, netType, netResult, DotIndicator, styles, PickerDroid, Submit,
	timer, ReloadScreen
} from '../../../CollectionScreen'

import PacketPriceHeader from '../PropsHeader/PacketPriceHeader'
import PacketResponse from '../PropsResponse/PacketResponse'

export default class PriceVirtualAccountScreen extends Component {
	_isMounted = false;
	state = {
  	refreshing: false,
  	isLoading: false,
  	provider: [],
    type: [],
  	typeSelected: 'REGULER',
    selected: '',
	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
		// this._onRetrieveDataProviderAndType()
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	// 
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ id : parsed.agenid }, () => 
				setTimeout(() => { 
					this._onRetrieveDataProviderAndType()
				}, timer()));
		}catch(err) {
			throw err;
		}
	}

	// provider
	_onRetrieveDataProviderAndType = async () => {
		try {
      let users = netUsers() + this.state.id
      let fetchURL = (url) => axios.get(url);
      let promiseArray = [netProvider(), netType(), users ].map(fetchURL);
			let data = await Promise.all(promiseArray)

      let item = data[2].data.data;
      let telkomsel = item.pdsub1 + item.pddist1
      let indosat = item.pdsub2 + item.pddist2
      let xl = item.pdsub3 + item.pddist3
      let smartfren = item.pdsub4 + item.pddist4
      let three = item.pdsub7 + item.pddist7
      let axis = item.pdsub10 + item.pddist10
      let pln = item.pdsub12 + item.pddist12

      this.setState({
        provider: data[0].data, 
        type: data[1].data,
        users: data[2].data.data
      })
		}catch(err) {
			throw err;
		}
	}
  
  // merge data
  _onRetrieveAllDataToAddAndReduceValue = () => {
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
  
	// result search data 
	_onRetrieveValueDataSearchConditions = async () => {
		this.setState({ isLoading: true })
		try {
			let { id, selected, typeSelected } = this.state;
			let uri = netResult() + id +'/'+ selected +'/'+ typeSelected
			let results = await axios.get(uri)
			let data = results.data.data.map(i => ({
        vtype: i.vtype,
				nominal: i.nominal,
	      harga: i.harga + this._onRetrieveAllDataToAddAndReduceValue(i.opr, this.state.users),
	      ket: i.ket
			}))
			this.setState({ regular: data, isLoading: false })
		}catch(err) {
			throw err
		}
	}
  //  
  _onRefreshingData = () => {
    this.setState({
      refreshing: true,
      regular: '', 
      isLoading: ''
    }, ()=> this._onRetrieveValueDataUser());
  }
  render() {
  	let { regular, type, refreshing, provider, typeSelected, selected } = this.state;
  	let { textSubmit, cardStyles, textItemA, textItemIn } = styles;
    return (
      <Container>
      <PacketPriceHeader {...this.props} onPress={this._onRefreshingData}/>
        <ReloadScreen 
          refreshing={refreshing}
          onRefresh={this._onReloadScreenAndData}
        >
      	<Content>
      		<Card style={cardStyles}>
              <Form>
                <Text style={selected ? textItemA : textItemIn }>Pilih Provider</Text>
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
                  <Text style={typeSelected ? textItemA : textItemIn }>Pilih Jenis or Type</Text>
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
              	this.state.isLoading ? 
	              <DotIndicator color='blue'/> :
	              <FlatList 
	                data={regular}
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