'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

const AuthStyles = StyleSheet.create({
  formStyles: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 12,
  },
  cardStyles: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16, 
    borderRadius: 20,
  },
  itemStyles:{
    borderColor: 'red',
    marginRight: 12,
    borderWidth: 1,
    marginLeft: 20,
  },
  inputStyles:{
    marginLeft: 20,
    fontFamily: 'roboto'
  },
  iconInaFocus: {
    // marginBottom: 13,
    marginLeft: 12,
    color: 'red'
  },
  iconFocus: {
    // marginBottom: 13,
    marginLeft: 12,
    color: '#8c8c8c'
  },
  iconLabel: {
   // marginBottom: 13,
   marginLeft: 12,
   color: 'red'
 },
 iconInaLabel: {
   // marginBottom: 13,
   marginLeft: 12,
   color: '#8c8c8c'
 },
 labelFocus: {
  // marginLeft: 17,
  // marginTop: 2,
  fontFamily: 'roboto',
  color: '#333333'
},
labelInaFocus: {
  // marginLeft: 17,
  // marginTop: 2,
  fontFamily: 'roboto',
  color: 'blue'
},
switchStyles: {
  alignSelf:'flex-start', 
  marginTop: 13,
  marginLeft: 13
},
textSwitchStyles: { 
  marginLeft: 62, 
  fontFamily: 'roboto', 
  top: -20
},
});


export {AuthStyles};