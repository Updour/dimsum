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
  fontFamily: 'roboto',
  color: 'blue'
},
switchStyles: {
  alignSelf:'flex-start', 
  marginTop: 13,
  marginLeft: 13
},
textSwitchStyles: { 
  fontFamily: 'roboto', 
  color: '#2c2d2e',
  marginLeft: 62, 
  top: -20,
},

// for validate screen
 gridPad: { 
      padding: 14 
    },
    txtMargin: { 
      margin: 3
    },
    inputRadius: { 
      textAlign: 'center' 
    },
    contentStyle: {
      // backgroundColor:'#f2f2f2',
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      margin: 3,
      paddingTop:20
    },
    textLabel: {
      marginBottom: 20,
      textAlign: 'center',
      fontSize: 18,
      color: '#efefef',
      fontStyle: 'italic',
      fontFamily: 'roboto'
    },
    textLabeled: {
      textAlign: 'center',
      color: '#efefef',
      fontStyle: 'italic',
      fontFamily: 'roboto',
      marginLeft: 10, 
      fontFamily: 'roboto', 
      top: -20
    },
    textInput: {
      padding: 5,
      margin: 3,
      fontSize: 25,
      textAlign: 'center',
      color: '#b0afab',
      fontStyle: 'italic',
      fontFamily: 'roboto'
    },
    itemStyle: {
      marginLeft: 14,
      marginRight: 14
    },
    btnStyle: {
      backgroundColor: 'blue',
      marginLeft: 14,
      marginRight: 14
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    forgotBtn: {
      marginTop: -40
    },
    textBtn: {
      color: '#fff',
      fontFamily: 'roboto',
      fontSize: 16,
      color: '#f2f2f2',
      fontWeight:  '600'
    }
});


export {AuthStyles};