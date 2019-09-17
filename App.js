/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import MainMenuBottomScreen from './apps/components/TabBottomScreen'
import StackRouterScreen from './apps/components/StackRouterScreen'
import MapView from 'react-native-maps';

const App = () => {
  return (
         <StackRouterScreen />
  );
};
export default App;
