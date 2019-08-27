import React, { Component } from 'react'
import { 
  Header, Left, Button, Icon, Body, Title, Right 
} from 'native-base'
import { StatusBar, Text } from 'react-native'
import { styles, Statusbar } from '../../../CollectionScreen'

export default class DashboardHeader extends Component {
  render() {
    let { headerStyles, textStyles } = styles
    let { goBack } = this.props.navigation
    let { onPress } = this.props;
    return (
     <Header style={headerStyles}>
        <Text style={{textAlign: 'center', fontFamily:'roboto', color: '#FFF', marginTop: 13, fontSize: 25, fontWeight: '500'}}>X-METRIK</Text>
       <Statusbar />
     </Header>
     )
  }
}
