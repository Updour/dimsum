'use strict';

import React, { Component } from 'react';

import {} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Icon, Text } from 'native-base';
import { styles, textStyles, Statusbar } from '../../CollectionScreen'

export default class PhonecHeader extends Component {
  render() {
    let { headerStyles, textStyles } = styles;
    let { goBack } = this.props.navigation;
    return (
      <Header style={headerStyles}>
        <Left>
          <Button transparent onPress={() => goBack(null)}>
            <Icon name='ios-arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={textStyles}>Komplain Telephone</Title>
        </Body>
        <Right />
        <Statusbar />
      </Header>
      );
    }
  }