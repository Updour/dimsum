import React from 'react'

import { Card, List, ListItem, Body, Text, Right } from 'native-base'

import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'


const RegularResponse = ({item}) => {
  let { nominal, harga, ket } = item
  let { 
    lCardStyle, lTextStyle, lKetStyle, lPriceStyle, 
  } = ListStyles
  let nominals = String(nominal).replace(/000$/, "")
  return (
    <List>
      <Card style={lCardStyle}>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Nominal</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>{nominals}</Text>
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
        <ListItem avatar>
            <Text style={lTextStyle}>Keteragan</Text>
          <Body>
            <Text style={lKetStyle}>{ket}</Text>
          </Body>
        </ListItem>
      </Card>
    </List>
    
    )
  }
export default RegularResponse;