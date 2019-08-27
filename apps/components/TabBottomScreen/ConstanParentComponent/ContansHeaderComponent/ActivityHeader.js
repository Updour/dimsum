import React, { Component } from 'react'
import { 
  Header, Left, Button, Icon, Body, Title, Right 
} from 'native-base'
import { View, Text } from 'react-native'
import { styles, Statusbar } from '../../../CollectionScreen'

export default class ActivityHeader extends Component {
  render() {
    let { headerStyles, textStyles } = styles
    let { goBack } = this.props.navigation
    let { onPress } = this.props;
    return (
     <Header style={headerStyles}>
       <Left>
       <Button transparent onPress={onPress}>
         <Icon name='ios-arrow-back' />
         </Button>
       </Left>
       <Body>
        <Title style={styles.textStyles}>Aktivitas</Title>
       </Body>
       <Right />
       <Statusbar />
     </Header>
     )
  }
}
