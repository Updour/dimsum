import React, { Component } from 'react';
import { Container, Content, ScrollableTab, Tab, Tabs, Text } from 'native-base'

import PrintPulsaPln from './PrintPulsaPln';
import PrintPascaPln from './PrintPascaPln';
import PlnPrintHeader from './PropsHeaderComponent/PlnPrintHeader'

export default class TabPrintStruckScreen extends Component {
  render() {
    return (
      <Container>
      <PlnPrintHeader {...this.props}/>
       <Tabs
      renderTabBar={()=> <ScrollableTab style={styles.tabStyles}/>}
      tabBarPosition='top'
      tabBarUnderlineStyle={{backgroundColor: 'yellow', borderBottomWidth: 1}}
      >
      <Tab heading="PLN Prabayar"
      tabStyle={styles.tabStyles} 
      textStyle={styles.textStyles} 
      activeTabStyle={styles.activeTabStyles} 
      activeTextStyle={styles.activeTextStyles}>
      <PrintPulsaPln {...this.props}/>
      </Tab>
       
      <Tab heading="PLN Pascabayar "
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