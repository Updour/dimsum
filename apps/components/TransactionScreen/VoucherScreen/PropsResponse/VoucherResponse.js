'use strict';

import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native';
import { List, ListItem, Text } from 'native-base'
import { formatPrice, styles } from '../../../CollectionScreen'

const VoucherResponse = ({item, onPress}) => {
  let { harga, ket } = item;
  
  let { defaultText, defaultPrice } = styles
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

export default VoucherResponse;