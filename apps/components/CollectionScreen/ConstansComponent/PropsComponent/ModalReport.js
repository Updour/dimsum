'use strict';

import React, { Component } from 'react';

import { StatusBar, Modal, Text, View, Alert, StyleSheet } from 'react-native';

const ModalReport = ({ style, visible, children, onRequestClose, onPress, transparent }) => {
  return (
    <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    transparent={transparent}
    style={style}
    onRequestClose={onRequestClose}>
    
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
export {ModalReport};