'use strict';

import React, { Component } from 'react';

import { TouchableOpacity, Text } from 'react-native';
import { List, ListItem } from 'native-base'
import { formatPrice, styles } from '../../../CollectionScreen'

const ResponseDenom = ({item, onPress}) => {
    let { denomsasi, harga } = item;
    let { defaultText, defaultPrice } = styles
    return (
      <List>
        <ListItem avatar>
        <TouchableOpacity onPress={onPress}>
            <Text style={defaultText}>{denomsasi.toString()}</Text>
            <Text note style={defaultPrice}>Rp. {formatPrice(harga)}</Text>
            </TouchableOpacity>
          </ListItem>
      </List>
      )
  }
export default ResponseDenom;