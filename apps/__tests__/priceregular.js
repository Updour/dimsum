'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { FlatList } from 'react-native';
import { Picker, Container, Content, Text, Card, Form, Item } from 'native-base'
import { 
	netUsers, netProvider, netResult, DotIndicator, styles, PickerDroid, Submit,
	timer, ReloadScreen
} from '../../../CollectionScreen'

import RegularPriceHeader from '../PropsHeader/RegularPriceHeader'
import RegularResponse from '../PropsResponse/RegularResponse'

export default class PriceRegularScreen extends Component {
	_isMounted = false;
	state = {
  	refreshing: false,
  	isLoading: false,
  	provider: [],
  	typeSelected: 'REGULER',
    selected: '',
	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
		this._onRetrieveValueDataProvider()
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
					this._onRetrieveValueDataUser()
				}, timer()));
		}catch(err) {
			throw err;
		}
	}
	// users
	_onRetrieveValueDataUser = async () => {
		try {
			let results = await axios.get(netUsers() + this.state.id)
			let data = results.data.data
			let telkomsel = data.pdsub1 + data.pddist1
      let indosat = data.pdsub2 + data.pddist2
      let xl = data.pdsub3 + data.pddist3
      let smartfren = data.pdsub4 + data.pddist4
      let three = data.pdsub7 + data.pddist7
      let axis = data.pdsub10 + data.pddist10
      let pln = data.pdsub12 + data.pddist12
      if (this._isMounted) { this.setState({ 
          users: data, 
          telkomsel: telkomsel, 
          indosat: indosat, 
          xl: xl,
          smartfren: smartfren, 
          three: three, 
          axis: axis,
          pln: pln,
          refreshing: false
        })
      }
		}catch (err){
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
	// provider
	_onRetrieveValueDataProvider = async () => {
		try {
			let response = await axios.get(netProvider())
			let data = response.data
      this.setState({ provider: data })
		}catch(err) {
			throw err;
		}
	}
	// result search data 
	_onRetrieveValueDataSearchConditions = async () => {
		this.setState({ isLoading: true })
		try {
			let { id, selected, typeSelected } = this.state;
			let uri = netResult() + id +'/'+ selected +'/'+ typeSelected
			let results = await axios.get(uri)
			let data = results.data.data.map(i => ({
				nominal: i.nominal,
	      harga: i.harga + this._onRetrieveAllDataToAddAndReduceValue(i.opr, this.state.users),
	      ket: i.ket
			}))
			this.setState({ regular: data, isLoading: false })
			console.log(data)
		}catch(err) {
			throw err
		}
	}
  // 
  _onRefreshingData = () => {
    this.setState({
      refreshing: true,
      regular: '', isLoading: ''
    }, ()=> this._onRetrieveValueDataUser());
  }
  render() {
  	let { regular, refreshing, provider, typeSelected, selected } = this.state;
  	let { textSubmit, cardStyles, textItemA, textItemIn } = styles;
    return (
      <Container>
      <RegularPriceHeader {...this.props} onPress={this._onRefreshingData}/>
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
                      <Picker.Item label='REGULER' value='REGULER' />
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
	                renderItem={RegularResponse}
	                showsVerticalScrollIndicator={false}
	              />
            	}
      	</Content>
        </ReloadScreen>
      </Container>
    );
  }
}