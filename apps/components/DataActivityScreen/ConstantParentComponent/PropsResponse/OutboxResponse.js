import React from 'react'
import { Card, Text } from 'native-base'

import { ListStyles } from '../../../CollectionScreen'

const OutboxResponse = ({item}) => {
  return (
    <Card style={ListStyles.cOutboxStyle}>
      <Text selectable style={ListStyles.tOutboxStyle}>
        {item.out_message}
      </Text>
    </Card>
    )
}
export default OutboxResponse;