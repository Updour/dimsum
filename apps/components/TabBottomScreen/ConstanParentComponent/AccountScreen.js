'use strict';

import React, { Component } from 'react';

import {} from 'react-native';
import { Container, Content, Text } from 'native-base'

import AccountHeader from './ContansHeaderComponent/AccountHeader'
import AccountComponentScreen from './ConstanChildComponent/AccountScreen/AccountComponentScreen'
export default class AccountScreen extends Component {
  render() {
  	let { goBack } = this.props.navigation
    return (
      <Container>
    <AccountHeader {...this.props} onPress={()=> goBack(null)}/>
    	<Content>
    		<AccountComponentScreen {...this.props} />
    	</Content>
    </Container>
    );
  }
}