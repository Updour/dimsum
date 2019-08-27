import React from 'react'
import { Card, List, ListItem, Body, Text, Right } from 'native-base'

import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'


const DepositScreenResponse = ({item}) => {
  let { 
    tanggal_aktif, jmldep, bank, tipe, ket_sts,
  } = item
  let { 
    lCardStyle, lTextStyle,  lPriceStyle, lSuccessStyle, lFailedStyle, lPendingStyle
  } = ListStyles
  
  return (
    <List>
      <Card style={lCardStyle}>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{formatDate(tanggal_aktif)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Jumlah</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(jmldep)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Bank</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{bank}</Text>
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
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Status</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>
              {ket_sts === 'DEP OK' && <Text style={lSuccessStyle}>Success</Text>}
              {ket_sts === 'DEP BATAL' && <Text style={lFailedStyle}>Failed</Text>}
              {ket_sts === 'Dep Cancel' && <Text style={lPendingStyle}>Cancel</Text>}
            </Text>
          </Right>
        </ListItem>
      </Card>
    </List>
    
    )
  }
export default DepositScreenResponse;