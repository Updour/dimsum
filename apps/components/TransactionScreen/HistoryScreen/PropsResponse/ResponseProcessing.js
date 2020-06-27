import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Card, List, ListItem, Body, Text, Right } from 'native-base'
import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'

const ResponseProcessing = ({ item, onPress }) => {
  let { tujuan, tanggal, harga, ket_sts, vsn } = item;
  let { 
    lCardStyle, lTextStyle, lPriceStyle, lSuccessStyle, 
    lFailedStyle, lKetStyle, lPendingStyle
  } = ListStyles;
  return (
    <TouchableOpacity onPress={onPress}>
    <List>
      <Card style={lCardStyle} pointerEvents="none">
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>No Tujuan</Text>
          </Body>
          <Right>
            <Text selectable style={lTextStyle}>{tujuan}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal</Text>
          </Body>
          <Right>
            <Text selectable style={lTextStyle}>{formatDate(tanggal)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Harga</Text>
          </Body>
          <Right>
            <Text selectable style={lPriceStyle}>Rp. {formatPrice(harga)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Status</Text>
          </Body>
          <Right>
            <Text selectable style={lTextStyle}>
            { ket_sts === 'TRX PENDING' && <Text selectable style={lPendingStyle}>Antri</Text>}
            { ket_sts === 'TRX SUCCESS' && <Text selectable style={lSuccessStyle}>Sukses</Text>  }
            { ket_sts === 'TRX FAIL' && <Text selectable style={lFailedStyle}>Gagal</Text>  }
            { ket_sts === 'TRX TOPUP' && <Text selectable style={lPendingStyle}>Proses</Text>}
            </Text>
          </Right>
        </ListItem>
        <ListItem avatar>
            <Text style={lTextStyle}>SN</Text>
          <Body>
            <Text selectable style={lKetStyle}>{vsn}</Text>
          </Body>
        </ListItem>
      </Card>
    </List>
    </TouchableOpacity>
    )
  }
export default ResponseProcessing;