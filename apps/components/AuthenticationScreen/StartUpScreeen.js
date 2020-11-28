'use strict';

import React, { Component } from 'react';

import { View, ImageBackground, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { 
  Container, Content, Form, Label, Input, Icon, Item, Button, Text, Switch 
} from 'native-base'
import { Grid, Col } from 'react-native-easy-grid';

import { 
  NotifyResponse, AuthStyles, Empty, SaveStorage, CantStorage 
} from '../CollectionScreen'

export default class StartUpScreeen extends Component {
  _isMounted = false;
  state ={
    verifycation: '',
    authentication: '',
    inputValydation: '',
    // isSwitchValue: false,
    isValueValid: false,
  }

  componentDidMount() {
    this._isMounted = true;
    this._onFetchValueStorageLocally()
  }

  async componentWillUnmount() {
    this._isMounted = false;
    this._onFetchValueStorageLocally()
  }

    _onFetchValueStorageLocally = async () => {
      try {
        let valueVerify = await AsyncStorage.getItem('#keyInput')
        let valueAuth = await AsyncStorage.getItem('@keyData')
        let valueSwitch = await AsyncStorage.getItem('@keySaveInput')
        let { navigation } = this.props;

        let login = JSON.parse(valueAuth)
        let switchs = JSON.parse(valueSwitch)
        console.log('valueVerify', valueVerify)

        if (this._isMounted) {
        if (valueVerify === null || login === null) { 
          navigation.navigate('auth') 
        }

        // if using not typing || save lokal
        if (switchs !== null) {
          this.setState({ 
            inputValydation: switchs,
            // isSwitchValue: true  
          })
        }
        // if have storage verifikasi 
        if (valueVerify !== null) {
         this.setState({ 
          verifycation: valueVerify 
         }, () => this._onRenderInputValidation())
        }
      }
      }catch (error) {
        NotifyResponse('Internal server fetch error'+error)
      }
    }

    // verification is valid
    _onVerifycationValueStorage = async () => {
      try {
        let { inputValydation, verifycation } = this.state
        let { navigation } = this.props
        // console.log('121', inputValydation, verifycation)
        if (inputValydation !== verifycation) {
           return this.setState({
            inputValydation: ''
          }, () => NotifyResponse('Sorry, PIN you entered is incorrect'))
        }
        setTimeout(() => {
          NotifyResponse('Congratulations')
          this.setState({
            inputValydation: ''
          }, () => navigation.navigate('MainMenuBottomScreen'))
        }, 1500);
      }catch(e) {
        NotifyResponse('Internal server verify error'+error)
      }
    }

    // if not typing save local //donoy using
    _onSaveValueStorage =  (value) => {
      const { inputValydation } = this.state;
      this.setState({ isSwitchValue: value }, async () => {
        if(value == true) {
          if (inputValydation === '') {
            Empty()
            this.setState({ isSwitchValue: false })
            return
          }
          // set item
          await AsyncStorage.setItem('@keySaveInput', inputValydation);
          SaveStorage()
          this.setState({ 
            isSwitchValue: true 
          }, () => this._onVerifycationValueStorage())
          return
        }
        return CantStorage()
      })
    }
 
  // render 
  _onRenderInputValidation = () => {
    let { isSwitchValue, inputValydation } = this.state;
    let { 
      switchStyles, textSwitchStyles, textLabel, textLabeled, forgotBtn, textBtn,
      itemStyle, textInput
       } = AuthStyles
    return (
      <Content>
        <Col>
        <Text style={textLabel}>Masukan PIN Aplikasi Anda</Text>
        <Item rounded style={itemStyle}>
        <Input
        style={textInput} 
        maxLength={12}
        placeholder='*** *** ***'
        showSoftInputOnFocus
        autoFocus
        autoCapitalize='words'
        secureTextEntry={true}
        onSubmitEditing={this._onVerifycationValueStorage}
        value={inputValydation.toString()}
        onChangeText={inputValydation => this.setState({ inputValydation })}
        />
        </Item>
        </Col>
        {/*<Col>
        <Switch
        onValueChange={value => this._onSaveValueStorage(value)}
        style={switchStyles}
        value={isSwitchValue} 
        />
        <Text style={textLabeled}>Switch Untuk Simpan Data</Text>
        </Col>*/}
        <Col style={switchStyles}>

        <Button transparent 
        onPress={() => this.props.navigation.navigate('forgot')}>
        <Icon name="ios-help-circle-outline" style={{ color:'#fff' }} />
          <Text uppercase={false} style={textBtn}>Lupa pin ? </Text>
        </Button>
        </Col>
        </Content>
    )
  }

  render() {
    let {image, contentStyle } = AuthStyles
    return (
      <Container >
       <ImageBackground source={require('./ChildComponent/bg.jpg')} 
       style={image}>

        <View style={contentStyle}>

        {/*<*/}
        
        <Grid style={contentStyle}>
        {this._onRenderInputValidation()}
        </Grid> 
        </View>
        </ImageBackground>
      </Container>
    );
  }
}

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'MainMenuBottomScreen' }),
//   ],
// });
