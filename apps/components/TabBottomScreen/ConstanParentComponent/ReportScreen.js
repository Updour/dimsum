'use strict';

import React, { Component } from 'react';

import { ScrollView } from 'react-native';
import { Container, Content, ScrollableTab, Tab, Tabs, Text } from 'native-base'

import ReportHeader from './ContansHeaderComponent/ReportHeader'
import ReportComponentScreen from './ConstanChildComponent/ReportScreen/ReportComponentScreen'

import ReportDayOnly from './ConstanChildComponent/ReportScreen/ReportDayOnly'
import ReportYesterday from './ConstanChildComponent/ReportScreen/ReportYesterday'
import ReportAllDay from './ConstanChildComponent/ReportScreen/ReportAllDay'


export default class ReportScreen extends Component {
  state = {
  }  
  render() {
  	let { goBack } = this.props.navigation
    return (
      <Container>
      <ReportHeader {...this.props} onPress={()=> goBack(null)}/>
      <Tabs
      renderTabBar={()=> <ScrollableTab style={styles.tabStyles}/>}
      tabBarPosition='top'
      tabBarUnderlineStyle={{backgroundColor: 'yellow', borderBottomWidth: 1}}
      >
      <Tab heading="Hari ini"
      tabStyle={styles.tabStyles} 
      textStyle={styles.textStyles} 
      activeTabStyle={styles.activeTabStyles} 
      activeTextStyle={styles.activeTextStyles}>
      <ReportDayOnly />
      </Tab>
      <Tab heading="Kemarin"
      tabStyle={styles.tabStyles} 
      textStyle={styles.textStyles} 
      activeTabStyle={styles.activeTabStyles} 
      activeTextStyle={styles.activeTextStyles}>
      <ReportYesterday />
      </Tab>
      <Tab heading="Lihat Semua"
      tabStyle={styles.tabStyles} 
      textStyle={styles.textStyles} 
      activeTabStyle={styles.activeTabStyles} 
      activeTextStyle={styles.activeTextStyles}>
      <ReportAllDay />
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