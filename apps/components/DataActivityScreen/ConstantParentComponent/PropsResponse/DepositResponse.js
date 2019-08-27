import React from 'react'
import { Card, List, ListItem, Body, Text, Right } from 'native-base'

import { formatDate, ListStyles } from '../../../CollectionScreen'

const DepositResponse = ({item}) => {
  let { agenid, out_starttime, out_hpnumber, tipe, out_message } = item
  let { lCardStyle, lTextStyle, lKetStyle, lPriceStyle } = ListStyles

  return (
    <List>
      <Card style={lCardStyle}>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{formatDate(out_starttime)}</Text>
          </Right>
        </ListItem>
        <ListItem avatar>
            <Text style={lTextStyle}>Keteragan</Text>
          <Body>
            <Text style={lKetStyle} selectable>{out_message}</Text>
          </Body>
        </ListItem>
      </Card>
    </List>
    
    )
  }
export default DepositResponse;