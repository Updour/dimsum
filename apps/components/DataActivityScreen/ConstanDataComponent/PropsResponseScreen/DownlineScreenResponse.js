import React from 'react'
import { Card, List, ListItem, Body, Text, Right } from 'native-base'

import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'


const DownlineScreenResponse = ({item}) => {
  let { 
    agenid, last_active, tgl_daftar, nama, ket, hp, balance
  } = item
  let { lCardStyle, lTextStyle, lPriceStyle } = ListStyles
  
  return (
    <List>
      <Card style={lCardStyle}>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>ID Agen</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{agenid}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Nama</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{nama}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal Aktif</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{formatDate(last_active)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal Daftar</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{formatDate(tgl_daftar)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>No Handphone</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{hp}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Keterangan</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{ket}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Sisa Saldo</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(balance)}</Text>
          </Right>
        </ListItem>
      </Card>
    </List>
    
    )
  }
export default DownlineScreenResponse;