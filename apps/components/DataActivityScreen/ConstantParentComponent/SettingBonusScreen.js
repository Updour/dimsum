'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { Container, Content, Text, Form, Item, Label, Input } from 'native-base'
import { FlatList, ToastAndroid } from 'react-native';
import { 
	netDownline, netSetBonus, Submit, styles, ModalPopUp, WaveIndicator, ReloadScreen,
	setSuccess
} from '../../CollectionScreen'

import HeaderSettingBonus from './PropsHeader/HeaderSettingBonus'
import DownlineReponse from './PropsResponse/DownlineReponse'

export default class SettingBonusScreen extends Component {
	_isMounted = false;
	state = {
		downline: [],
		refreshing: false,
		modalVisible: false
	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
	}
	componentWillUnmount() {
		this._isMounted = false;

	}

	// storage
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ id : parsed.agenid })
			setTimeout(() => {
				this._onRetrieveValueDataDownline()
			}, 3000);
		}catch(err) {
			throw err;
		}
	}
	// downline
	_onRetrieveValueDataDownline = async () => {
		try {
			let response = await axios.get(netDownline() + this.state.id)
			let data = response.data.data
			if (this._isMounted) { this.setState({ 
				downline: data,
				refreshing: false
			})}
		}catch(err) {
			throw err;
		}
	}
	// 
	_onSetItemUpdateDataDownline = async (id) => {
		try {
			this.setState({ modalVisible: true })
			let uri = netDownline() + this.state.id +'/'+ id
			let results = await axios.get(uri)
			let data = results.data.data
			this.setState({ 
				userID: data[0].agenid,
				telkomsel: data[0].pdsub1.toString(),
				indosat: data[0].pdsub2.toString(),
				xl: data[0].pdsub3.toString(),
				smartfren: data[0].pdsub4.toString(),
				three: data[0].pdsub7.toString(),
				axis: data[0].pdsub10.toString(),
				pln: data[0].pdsub12.toString()
			})
		}catch(err) {
			throw err;
		}
	}
	// update 
	_onSetItemUpdateDataDownlineById = async () => {
		try{ 
			let puts = {
				pdsub1: this.state.telkomsel, 
        pdsub2: this.state.indosat,
        pdsub3: this.state.xl,
        pdsub4: this.state.smartfren,
        pdsub7: this.state.three,
        pdsub10: this.state.axis,
        pdsub12: this.state.pln
			}
			let response = await axios.put(netSetBonus() + this.state.userID, puts)
			setSuccess()
			setTimeout(() => {
        this._onReloadScreenAndData()
        this.setState({ modalVisible: false})
      }, 3000);
		}catch(err) {
			throw err;
		}
	}
	// 
	_onReloadScreenAndData = () => {
    this.setState({
      refreshing: true,
      downline: ''
    }, () => this._onRetrieveValueDataDownline()
    );
  }
  render() {
  	let { 
  		downline, userID, telkomsel, indosat, xl, smartfren, three, axis, pln,
  		modalVisible 
  	} = this.state;
  	let { 
  		textStyles, contentStyle, formStyles, labelAStyles, labelInStyles, textSubmit
  	} = styles;
    return (
      <Container>
      <ReloadScreen
        refreshing={this.state.refreshing}
        onRefresh={this._onReloadScreenAndData}
        style={contentStyle}
      >
      <HeaderSettingBonus {...this.props} onPress={this._onReloadScreenAndData}/>
      	<Content style={contentStyle}>
      		<FlatList
      		 data={downline}
      		 keyExtractor={(i, j) => j.toString()}
      		 renderItem={({item}) => (
              <DownlineReponse item={item} 
                onPress={() => this._onSetItemUpdateDataDownline(item.agenid)}
              />
            )}
      		 ListEmptyComponent={()=> <WaveIndicator />}
      		/>

      	{/*modal pop up setting bonus*/}
      	<ModalPopUp visible={modalVisible} 
	      	onRequestClose={() => this.setState({modalVisible:false})}
	      	onPress={() => this.setState({modalVisible:false})}
      	>
	      	<Content>
	      		<Form style={formStyles}>
	      		  <Item floatingLabel >
                <Label style={userID ? labelAStyles: labelInStyles}>Agenid</Label>
                <Input
                  value={userID}
                  editable={false}
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={telkomsel ? labelAStyles: labelInStyles}>Telkomsel</Label>
                <Input
                	onChangeText={text => this.setState({telkomsel: text.replace(/[^0-9]/g, '')})}
                  value={telkomsel}
                  keyboardType='phone-pad'
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={indosat ? labelAStyles: labelInStyles}>Indosat</Label>
                <Input
                	onChangeText={text => this.setState({indosat: text.replace(/[^0-9]/g, '')})}
                  value={indosat}
                  keyboardType='phone-pad'
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={xl ? labelAStyles: labelInStyles}>Xl</Label>
                <Input
                	onChangeText={text => this.setState({xl: text.replace(/[^0-9]/g, '')})}
                  value={xl}
                  keyboardType='phone-pad'
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={smartfren ? labelAStyles: labelInStyles}>Smartfren</Label>
                <Input
                	onChangeText={text => this.setState({smartfren: text.replace(/[^0-9]/g, '')})}
                  value={smartfren}
                  keyboardType='phone-pad'
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={three ? labelAStyles: labelInStyles}>Three</Label>
                <Input
                	onChangeText={text => this.setState({three: text.replace(/[^0-9]/g, '')})}
                  value={three}
                  keyboardType='phone-pad'
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={axis ? labelAStyles: labelInStyles}>AXIS</Label>
                <Input
                	onChangeText={text => this.setState({axis: text.replace(/[^0-9]/g, '')})}
                  value={axis}
                  keyboardType='phone-pad'
                />
              </Item>
	      		  <Item floatingLabel >
                <Label style={pln ? labelAStyles: labelInStyles}>Pln</Label>
                <Input
                	onChangeText={text => this.setState({pln: text.replace(/[^0-9]/g, '')})}
                  value={pln}
                  keyboardType='phone-pad'
                />
              </Item>
	      		</Form>
	      		<Submit onPress={this._onSetItemUpdateDataDownlineById}>
            	<Text style={textSubmit}>Update</Text>
            </Submit>
	      	</Content>
      	</ModalPopUp>
      	</Content>
      	</ReloadScreen>
      </Container>
    );
  }
}