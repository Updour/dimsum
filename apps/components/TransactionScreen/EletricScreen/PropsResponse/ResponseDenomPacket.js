'use strict';

import React, { Component } from 'react';

import { TouchableOpacity, Text } from 'react-native';
import { List, ListItem } from 'native-base'
import { formatPrice, styles } from '../../../CollectionScreen'

const ResponseDenomPacket = ({item, onPress}) => {
    let { ket, harga } = item;
    let { defaultText, defaultPrice } = styles
    return (
      <List>
        <ListItem avatar>
          <TouchableOpacity onPress={onPress}>
            <Text note style={defaultPrice}>Rp. {formatPrice(harga)}</Text>
            <Text style={defaultText}>{ket.toString()}</Text>
          </TouchableOpacity>
        </ListItem>
      </List>
      )
  }

export default ResponseDenomPacket;