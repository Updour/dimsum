'use strict';

import React from 'react';

import { StatusBar } from 'react-native'
import { Header, Left, Button, Icon, Body } from 'native-base';

const HeaderModal = ({ onPress }) => {
  return (
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={onPress}>
          <Icon name='ios-close' style={styles.icon} />
        </Button>
      </Left>
      <Body/>
      <StatusBar 
        backgroundColor="#0000cc" 
      barStyle="light-content"
      />
    </Header>
    )
}

let styles = {
  header: {
    backgroundColor: '#f5f5f5'
  },
  icon: {
    color: '#000', 
    fontSize: 30 
  }
}


export {HeaderModal};