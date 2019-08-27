import React from 'react'
import { List, ListItem, Body, Left, Text, Right, Thumbnail } from 'native-base'

import { styles } from '../../../CollectionScreen'


const PaymentProduct = ({item}) => {
  let { product_name, product_info } = item
 return (
  <List>
    <ListItem avatar>
      <Left>
        <Thumbnail source={require('../../../../assets/images/activity/product.png')} 
          style={{ width: 50, height: 50}}
        />
      </Left>
      <Body>
        <Text style={styles.textStyles}>{product_name}</Text>
        <Text note style={styles.textStyles}>{product_info}</Text>
      </Body>
      <Right/>
    </ListItem>
  </List>

  )
}
export default PaymentProduct;