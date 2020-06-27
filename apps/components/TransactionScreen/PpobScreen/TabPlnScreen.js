import React, { Component } from 'react';
import { Container, Content, ScrollableTab, Tab, Tabs, Text } from 'native-base'

import PlnPpobScreen from './PlnPpobScreen';
import PrintPascaPln from './PrintPascaPln';
import PlnPascaHeader from './PropsHeaderComponent/PlnPascaHeader'

export default class TabPlnScreen extends Component {
  render() {
    return (
      <Container>
      <PlnPascaHeader {...this.props}/>
       <Tabs
      renderTabBar={()=> <ScrollableTab style={styles.tabStyles}/>}
      tabBarPosition='top'
      tabBarUnderlineStyle={{backgroundColor: 'yellow', borderBottomWidth: 1}}
      >
      <Tab heading="Pln Pascabayar"
      tabStyle={styles.tabStyles} 
      textStyle={styles.textStyles} 
      activeTabStyle={styles.activeTabStyles} 
      activeTextStyle={styles.activeTextStyles}>
      <PlnPpobScreen {...this.props}/>
      </Tab>
       
      <Tab heading="Cetak Struk"
      tabStyle={styles.tabStyles} 
      textStyle={styles.textStyles} 
      activeTabStyle={styles.activeTabStyles} 
      activeTextStyle={styles.activeTextStyles}>
      <PrintPascaPln {...this.props}/>
      </Tab>
      </Tabs>
      </Container>
    );
  }
}

let styles= {
  tabStyles: {
    backgroundColor: '#0000e6'
  },
  textStyles: {
    color: '#f4f4f4',
    fontSize: 8,
    fontFamily: 'roboto',
  },
  activeTextStyles: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'roboto',
    fontWeight: 'normal' 
  },
}