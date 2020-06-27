'use strict';

import React, { Component } from 'react';

import { createStackNavigator, createAppContainer} from 'react-navigation'

import Main from './component/Main'
import Chat from './component/Chat'

let Inbox = createStackNavigator({
	Main: { screen: Main },
  Chat: { screen: Chat },
})
export default createAppContainer(Inbox)


