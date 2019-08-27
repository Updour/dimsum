'use strict';

import React, { Component } from 'react';

import { Container, Content, Text } from 'native-base';

import InboxHeader from './ContansHeaderComponent/InboxHeader'
import InboxDataScreen from './ConstanChildComponent/InboxScreen/InboxDataScreen'

export default class InboxScreen extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#ebebeb'}}>
      <InboxHeader {...this.props} 
      onPress={()=> this.props.navigation.goBack(null)}
      onClick={() => this.props.navigation.navigate('Inbox')}
      />
      <InboxDataScreen />
      </Container>
    );
  }
}