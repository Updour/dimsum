import React, { Component } from 'react'
import { 
  Header, Left, Button, Icon, Body, Title, Right 
} from 'native-base'
import { StatusBar, StyleSheet } from 'react-native'
import { styles, Statusbar } from '../../../CollectionScreen'

export default class ListMenuHeader extends Component {
  render() {
    let { headerStyles, textStyles } = styles
    let { goBack } = this.props.navigation
    let { onPress } = this.props;
    return (
     <Header style={headerStyles}>
     <Left>
       <Button transparent>
        <Icon name='ios-arrow-back' onPress={()=> goBack(null)} />
       </Button>
     </Left>
       <Body>
        <Title style={textStyles}>Daftar Menu</Title>
       </Body>
       <Right />
       <Statusbar />
     </Header>
     )
  }
}
