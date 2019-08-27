'use strict';

import React, { Component } from 'react';

import {} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Icon, Text } from 'native-base';
import { styles, textStyles, Statusbar } from '../../../CollectionScreen'

export default class PriceHeader extends Component {
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
          <Title style={textStyles}>Price List</Title>
        </Body>
        <Right>
          <Button transparent>
          <Icon name="ios-refresh" />
          </Button>
        </Right>
        <Statusbar />
      </Header>
      );
    }
  }