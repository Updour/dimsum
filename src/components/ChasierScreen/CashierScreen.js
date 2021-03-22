'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Container, Header, Title, Subtitle, Content, Button, Left, Right, Body, Icon, Text
} from 'native-base';
import { everyStyles } from '../Container'


export default class CashierScreen extends Component {
  render() {
    let { navigation } = this.props;
    return (
       <Container style={everyStyles.contStyles}>
        <Header style={everyStyles.headerStyles}>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Dashboard')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Kasir</Title>
             <Subtitle>Kasir Cart</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});
