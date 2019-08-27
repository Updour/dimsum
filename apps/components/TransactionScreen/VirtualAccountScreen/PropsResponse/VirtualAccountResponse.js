'use strict';

import React, { Component } from 'react';

import {TouchableOpacity} from 'react-native';
import { List, ListItem, Text } from 'native-base'
import { formatPrice, styles } from '../../../CollectionScreen'


const VirtualAccountResponse = ({item, onPress}) => {
  let { defaultText, defaultPrice } = styles
  let { harga, ket } = item
  return (
    <List>
        <ListItem avatar>
        <TouchableOpacity onPress={onPress}>
            <Text style={defaultPrice}>Rp. {formatPrice(harga)}</Text>
            <Text note style={defaultText}>{ket}</Text>
            </TouchableOpacity>
          </ListItem>
      </List>
  )
}

export default VirtualAccountResponse;