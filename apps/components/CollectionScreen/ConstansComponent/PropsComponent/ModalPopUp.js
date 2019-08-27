'use strict';

import React, { Component } from 'react';

import { StatusBar, Modal, Text, View, Alert, StyleSheet } from 'react-native';
import { Header, Left, Button, Icon, Body } from 'native-base';

const ModalPopUp = ({ style, visible, children, onRequestClose, onPress, transparent }) => {
  return (
    <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    transparent={transparent}
    style={style}
    onRequestClose={onRequestClose}>
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
    {children}
    </Modal>
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
export {ModalPopUp};