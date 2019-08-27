import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Card, Text } from 'native-base'
import { formatPrice, formatDate, ListStyles } from '../../../CollectionScreen'

const ResponseHistory = ({ item, onPress }) => {
  let { out_message } = item;
  let { lCardStyle, hTextStyle } = ListStyles;
  return (
      <Card style={lCardStyle} pointerEvents="none">
         <Text selectable style={hTextStyle}>{out_message}</Text>
      </Card>
    )
  }
export default ResponseHistory;