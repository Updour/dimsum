'use strict';

import React, { Component } from 'react';

import { createStackNavigator, createAppContainer} from 'react-navigation'

import Login from './component/Login'
import Signup from './component/Signup'
import Chat from './component/Chat'

let Chats = createStackNavigator({
	Login: { screen: Login },
  Signup: { screen: Signup },
  Chat: { screen: Chat }
})
export default createAppContainer(Chats)


