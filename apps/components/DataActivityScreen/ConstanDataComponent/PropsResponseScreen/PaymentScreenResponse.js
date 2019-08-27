'use strict';

import React, { Component } from 'react';
import { Card, List, ListItem, Body, Text, Right } from 'native-base'
import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'

const PaymentScreenResponse = ({item}) => {
  let { 
    idpelanggan, nmpelanggan, nmproduk, status, tglcek, tglbyr, 
    jmlhtag, 
  } = item
  let { 
    lCardStyle, lTextStyle, lSuccessStyle, lCheckStyle, 
    lFailedStyle, lPendingStyle, lBillStyle
  } = ListStyles
    return (
      <List>
        <Card style={lCardStyle}>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>ID </Text>
            </Body>
            <Right>
              <Text style={lTextStyle}>{idpelanggan}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Nama</Text>
            </Body>
            <Right>
              <Text style={lTextStyle}>{nmpelanggan}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Produk</Text>
            </Body>
            <Right>
              <Text style={lTextStyle}>{nmproduk}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Status</Text>
          </Body>
          <Right>
            <Text>
            { status === 'Pay Sukses' && <Text style={lSuccessStyle}>Success</Text>  }
            { status === 'Cek Sukses' && <Text style={lCheckStyle}>Check</Text>  }
            { status === 'Cek Gagal' && <Text style={lFailedStyle}>Failed</Text>  }
            { status === 'Pay Pending' && <Text style={lPendingStyle}>Pending</Text>  }
            </Text>
          </Right>
        </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Tanggal Cek</Text>
            </Body>
            <Right>
              <Text style={lTextStyle}>{formatDate(tglcek)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Tanggal Bayar</Text>
            </Body>
            <Right>
              <Text style={lTextStyle}>{formatDate(tglbyr)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Jumlah Tagihan</Text>
            </Body>
            <Right>
              <Text style={lBillStyle}>Rp. {formatPrice(jmlhtag)}</Text>
            </Right>
          </ListItem>
        </Card>
      </List>
    );
}
export default PaymentScreenResponse;