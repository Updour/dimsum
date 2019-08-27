'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class PleaseWait extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.textStyles}>Mohon Tunggu ...</Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#0000e6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 23,
    marginRight: 23,
    marginTop: 2,
    marginBottom: 2,
    width: 300
  },
  textStyles: {
   alignSelf: 'center',
   color: '#fff',
   fontSize: 16,
   fontWeight: '500',
   paddingTop: 10,
   paddingBottom: 10,
   fontFamily: 'roboto'
 }
});


export {PleaseWait};