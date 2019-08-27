'use strict';

import React, { Component } from 'react';
import { Card, List, ListItem, Body, Text, Right } from 'native-base'
import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'

const TransactionScreenResponse = ({item}) => {
  let { 
    tujuan, tanggal, harga, ket_sts, number_reorder, provider, 
    area, tipe, vsn,
  } = item
    let { 
    lCardStyle, lTextStyle, lPriceStyle, lSuccessStyle, 
    lFailedStyle, lKetStyle
  } = ListStyles;
    return (
      <List>
      <Card style={lCardStyle}>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>No Tujuan</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{tujuan}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{formatDate(tanggal)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Harga</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(harga)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Status</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>
            { ket_sts === 'TRX SUCCESS' && <Text style={lSuccessStyle}>Success</Text>  }
            { ket_sts === 'TRX FAIL' && <Text style={lFailedStyle}>Failed</Text>  }
            </Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>No Order</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{number_reorder}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Provider</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{provider}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Area</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{area}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tipe</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{tipe}</Text>
          </Right>
        </ListItem>
        <ListItem avatar>
            <Text style={lTextStyle}>SN</Text>
          <Body>
            <Text style={lKetStyle}>{vsn}</Text>
          </Body>
        </ListItem>
      </Card>
    </List>
    
    );
}
export default TransactionScreenResponse;