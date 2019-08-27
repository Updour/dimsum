import React from 'react'

import { Card, Text } from 'native-base'
import { View, TouchableOpacity } from 'react-native'

const CheckedData = ({ props, onPress }) => {
  let { CardStyles, textStyles } = styles;
  return (
    <View>
    <TouchableOpacity onPress={onPress}>
      <Card style={CardStyles}>
        <Text style={textStyles}>
          Klik Disini, Untuk Cek Transaksi Anda
        </Text>
      </Card> 
    </TouchableOpacity>
    </View>
    )
  }
  let styles = {
    CardStyles: {
      marginLeft: 21,
      marginRight: 21,
      borderRadius: 18
    },
    textStyles: {
      flex: 1,
      fontFamily: 'roboto',
      padding: 8,
      margin: 8,
      alignSelf: 'center',
      textAlign: 'center'
    }
  }
  export { CheckedData }