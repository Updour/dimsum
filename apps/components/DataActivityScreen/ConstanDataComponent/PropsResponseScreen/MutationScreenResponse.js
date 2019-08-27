import React from 'react'
import { Card, List, ListItem, Body, Text, Right } from 'native-base'

import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'


const MutationScreenResponse = ({item}) => {
  let { 
    agenid, tanggal, ket, debet, kredit, lastbalance, currbalance 
  } = item
  let { 
    lCardStyle, lTextStyle, lKetStyle, lPriceStyle 
  } = ListStyles
  return (
    <List>
      <Card style={lCardStyle}>
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
            <Text style={lTextStyle}>Debet</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(debet)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Kredit</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(kredit)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Saldo Awal</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(lastbalance)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Saldo Akhir</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(currbalance)}</Text>
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
export default MutationScreenResponse;