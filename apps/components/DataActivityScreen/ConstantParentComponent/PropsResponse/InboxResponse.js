import React from 'react'
import { Card, Text } from 'native-base'

import { ListStyles } from '../../../CollectionScreen'

const InboxResponse = ({item}) => {
  return (
    <Card style={ListStyles.cInboxStyle}>
      <Text selectable style={ListStyles.tInboxStyle}>
        {item.in_message}
      </Text>
    </Card>
    )
}
export default InboxResponse;