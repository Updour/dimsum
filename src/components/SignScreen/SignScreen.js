'use strict';

import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, StatusBar, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  Container, Content, Form, Item, Input, Label, Icon, Text, Switch, Card, Header,
  Body,Title,Subtitle
} from 'native-base';
import { Submit, URL, SignStyles } from '../Container'

export default class SignScreen extends Component {
    state = {
        onUname: true,
        onPassword: true,
        onOutlets: false,
        isUname: '',
        isPassword: '',
    }

    _onReceiveSignValueData = async () => {
      try {
        if (_.isEmpty(this.state.isUname) || _.isEmpty(this.state.isPassword)) return ToastAndroid.show('Form Can`t be empty', ToastAndroid.SHORT)
        let items = {
         username: this.state.isUname,
         password: this.state.isPassword
        }
        let response = await axios.post(`${URL}login`, items)
        let val = response.data
        if (val.status !== '200') return ToastAndroid.show(val.data, ToastAndroid.SHORT)

        ToastAndroid.show('Successfully', ToastAndroid.SHORT)
        await AsyncStorage.setItem('#sign', JSON.stringify(val))
        setTimeout(() => this.props.navigation.dispatch(resetAction), 1000);

      } catch(e) {
        console.log(e);
      }
    }
  render() {
    let {
        onUname, onPassword, onOutlets, isUname, isPassword
    } = this.state;
    let {
        headerStyles, contentStyle, titleStyles, subStyles, cardStyles, itemStyles,
        labelFocus, labelInaFocus, iconInaFocus, iconFocus
    } = SignStyles;
    return (
      <Container >
      <Header span style={headerStyles}>
        <Body>
          <Title style={titleStyles} >KEBAB APP</Title>
          <Subtitle style={subStyles}>Jl Kota 1 lot</Subtitle>
        </Body>
        <StatusBar backgroundColor="#6700ce" barStyle="light-content" />
      </Header>
      <Content style={contentStyle}>
        <Card style={cardStyles}>
        <Form>
            <Item stackedLabel style={itemStyles}>
             <Icon active name='ios-person' style={isUname ? iconInaFocus : iconFocus }/>
              <Label style={isUname ? labelInaFocus : labelFocus }>Username</Label>
              <Input
                onChangeText={isUname => this.setState({isUname})}
                value={isUname}
              />
            </Item>
            <Item stackedLabel last style={itemStyles}>
            <Icon name={onPassword ? 'ios-lock' : 'ios-unlock'}
                style={isPassword ? iconInaFocus : iconFocus}
                onPress={() => this.setState({ onPassword: !this.state.onPassword})}
                />
              <Label style={isPassword ? labelInaFocus : labelFocus }>Password</Label>
              <Input
                secureTextEntry= {onPassword}
                onChangeText={isPassword => this.setState({isPassword})}
                value={isPassword}
              />
            </Item>
          </Form>
          <Content >
            <Submit onPress={this._onReceiveSignValueData}>
              <Text style={SignStyles.textSubmit}>
                Login
              </Text>
          </Submit>
          </Content>
        </Card>
      </Content>

      </Container>
    );
  }
}
const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'TabBottomNavigation' }),
  ],
});
