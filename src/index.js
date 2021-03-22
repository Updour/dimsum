'use strict';

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';

/*componenrts*/
import SignScreen from './components/SignScreen/SignScreen'
import DetailCashier from './components/ChasierScreen/DetailCashier'
import ChangeCashier from './components/ChasierScreen/ChangeCashier'
import CartScreen from './components/ProductScreen/CartScreen'
import DetailDepositScreen from './components/DepositScreen/DetailDepositScreen'
import TabBottomNavigation from './components'

const StackNavigation = createStackNavigator({
    sign: SignScreen,
    TabBottomNavigation: TabBottomNavigation,
    Cart: CartScreen,
    DetailDeposit: DetailDepositScreen,
    DetailCashier: DetailCashier,
    ChangeCashier: ChangeCashier,

}, {

  transitionConfig,
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
  }

)

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        // outputRange: [-width, 0], if left
        outputRange: [width, 0], //if right
        extrapolate: 'clamp'
      });

      return {
        transform: [{ translateX }]
      }
    }
  }
}

export default createAppContainer(StackNavigation)
