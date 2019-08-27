'use strict';

import React, { Component } from 'react';

import { Container, Header, Left, Body, Right, Button, Title, Icon, Text } from 'native-base';
import { styles, textStyles, Statusbar } from '../../../CollectionScreen'

export default class EtolHeader extends Component {
  render() {
    let { headerStyles, textStyles } = styles;
    let { goBack } = this.props.navigation;
    let { onPress } = this.props;
    return (
      <Header style={headerStyles}>
        <Left>
          <Button transparent onPress={() => goBack(null)}>
            <Icon name='ios-arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={textStyles}>E -TOLL</Title>
        </Body>
        <Right>
          <Button transparent onPress={onPress}>
          <Icon name="ios-refresh" />
          </Button>
        </Right>
        <Statusbar />
      </Header>
      );
    }
  }