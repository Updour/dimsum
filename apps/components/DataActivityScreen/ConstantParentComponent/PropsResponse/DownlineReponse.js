import React from 'react'
import { Card, List, ListItem, Body, Text, Right } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { formatPrice, ListStyles } from '../../../CollectionScreen'


const DownlineReponse = ({item, onPress}) => {
  let { lCardStyle, lTextStyle, lPriceStyle} = ListStyles
  let { 
      agenid, pdsub1, pdsub2, pdsub3, pdsub4, pdsub7, 
      pdsub10, pdsub12
    } = item
  return (
    <List>
      <TouchableOpacity onPress={onPress}>
        <Card style={lCardStyle} pointerEvents="none">
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
              <Text style={lTextStyle}>Telkomsel</Text>
            </Body>
            <Right>
              <Text style={lPriceStyle}>Rp.{formatPrice(pdsub1)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Indosat</Text>
            </Body>
            <Right>
              <Text style={lPriceStyle}>Rp.{formatPrice(pdsub2)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Xl</Text>
            </Body>
            <Right>
              <Text style={lPriceStyle}>Rp.{formatPrice(pdsub3)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Smartfren</Text>
            </Body>
            <Right>
              <Text style={lPriceStyle}>Rp.{formatPrice(pdsub4)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Three</Text>
            </Body>
            <Right>
              <Text style={lPriceStyle}>Rp.{formatPrice(pdsub7)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Axis</Text>
            </Body>
            <Right>
              <Text style={lPriceStyle}>Rp.{formatPrice(pdsub10)}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={lTextStyle}>Pln</Text>
            </Body>
            <Right>
            <Text style={lPriceStyle}>Rp.{formatPrice(pdsub12)}</Text>
              </Right>
          </ListItem>
        </Card>
      </TouchableOpacity>
    </List>
    )
  }
export default DownlineReponse;