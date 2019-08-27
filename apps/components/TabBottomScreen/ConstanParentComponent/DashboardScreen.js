'use strict';

import React, { Component } from 'react';

import { } from 'react-native'
import { Container, Content, Text } from 'native-base';
import { styles } from '../../CollectionScreen'

import DashboardHeader from './ContansHeaderComponent/DashboardHeader'
import DashboardContentUp from './ConstanChildComponent/DashboardScreen/DashboardContentUp'
import DashboardContent from './ConstanChildComponent/DashboardScreen/DashboardContent'
import ListMenuGlobal from './ConstanChildComponent/DashboardScreen/ListMenuGlobal'
export default class DashboardScreen extends Component {
  render() {
    let { contentStyle } = styles
    return (
      <Container>
      <DashboardHeader {...this.props} />
      <Content style={contentStyle}>
      <DashboardContentUp {...this.props}/>
      <DashboardContent {...this.props}/>

      </Content>
      </Container>
    );
  }
}
