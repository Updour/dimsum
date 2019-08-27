'use strict';

import React, { Component } from 'react';

import {} from 'react-native';
import { Container } from 'native-base'
import ActivityHeader from './ContansHeaderComponent/ActivityHeader'
import ActivityMenu from './ConstanChildComponent/ActivityScreen/ActivityMenu'

export default class ActivityScreen extends Component {
  render() {
    return (
      <Container>
        <ActivityHeader {...this.props} onPress={()=> this.props.navigation.goBack(null)}/>
        <ActivityMenu {...this.props}/>
      </Container>
    );
  }
}