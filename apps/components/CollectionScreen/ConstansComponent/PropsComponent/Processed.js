'use strict';

import React, { Component } from 'react';

import { Card,Text } from 'native-base'
import { StyleSheet } from 'react-native'

class Processed extends Component {
  render() {
    let {cardStyles,replayStyles} = styles
    return (
      <Card style={cardStyles}>
        <Text selectable style={replayStyles}>
          Permintaan Anda Sedang di Proses
        </Text>
      </Card>
      );
  }
}

const styles = StyleSheet.create({
  replayStyles: {
    flex: 1,
    fontFamily: 'roboto',
    padding: 10,
    margin: 10,
    textAlign: 'center'
  },
  cardStyles: {
    // marginTop: 70,
    marginLeft: 19,
    marginRight: 19,
    borderRadius: 14,
    // borderTopLeftRadius: 2,
    // borderTopLeftRadius: 26
    // marginTop: 60
  },
});


export {Processed};