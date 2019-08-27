import React from 'react'

import { Card, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

const Reply = ({ children, onPress }) => {
  let { CardStyles, textStyles } = styles;
  return (
    <TouchableOpacity onPress={onPress} >
    <Card style={CardStyles}>
      <Text selectable style={textStyles}>{children}</Text>
    </Card> 
    </TouchableOpacity>
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
export { Reply }