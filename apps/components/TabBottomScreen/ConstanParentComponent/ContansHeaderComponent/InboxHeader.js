import React, { Component } from 'react'
import { 
  Header, Left, Button, Icon, Body, Title, Right 
} from 'native-base'
import { View, Text } from 'react-native'
import { styles, Statusbar } from '../../../CollectionScreen'

export default class InboxHeader extends Component {
  render() {
    let { headerStyles, textStyles } = styles
    let { goBack } = this.props.navigation
    let { onPress, onClick } = this.props;
    return (
     <Header style={headerStyles}>
      <Left>
       <Button transparent onPress={onPress}>
         <Icon name='ios-arrow-back' />
         </Button>
       </Left>
       <Body>
        <Title style={styles.textStyles}>Kotak Masuk</Title>
       </Body>
       <Right/>
       {/*<Button transparent onPress={onClick}>
         <Icon name="ios-refresh"/>
       </Button>
       </Right>*/}
      <Statusbar />
     </Header>
     )
  }
}
