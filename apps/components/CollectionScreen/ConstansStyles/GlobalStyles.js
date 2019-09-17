'use strict';

import React from 'react';

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
// for header all component
  headerStyles: {
    backgroundColor: '#0000e6'
  },
  textStyles: {
    fontFamily: 'roboto'
  },
  //form account styles text
  aTextStyles: {
    fontFamily: 'roboto',
    fontSize: 15,
    color: '#3b3b3b'
  },
  contentStyle: {
    backgroundColor: '#f2f2f2' //f5fdff
  },
  textSubmit: {
    fontFamily: 'roboto',
    color: '#fff'
  },

/*header form*/
  footerStyles: {
    backgroundColor: '#f7f7f7'
  },
  SubmitStyle: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#0000e6',
    borderRadius: 15,
    marginBottom: 8,
    marginTop: 12,
    marginRight: 30,
    marginLeft: 30,
  },
  SubmitBlockStyle: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    marginBottom: 8,
    marginTop: 12,
    marginRight: 30,
    marginLeft: 30,
  },
  // for eletric show in text
  textItemA: {
    marginTop: 8,
    marginLeft: 35,
    fontFamily: 'roboto',
    color: 'blue'
  },
  textItemIn: {
    marginTop: 8,
    marginLeft: 35,
    fontFamily: 'roboto',
    color: '#333333'
  },
  textItemPrefix: {
    textAlign: 'center', 
    fontFamily: 'roboto', 
    color: 'red'
  },
  textItemPrice: {
    textAlign: 'left', 
    fontFamily: 'roboto', 
    color: 'red',
    marginLeft: 13,
  },
  ItemPrice: {
    textAlign: 'right', 
    fontFamily: 'roboto', 
    color: 'blue',
    fontStyle: 'italic' 
  },
  textStyle: {
    fontFamily: 'roboto',
    fontSize: 16,
    padding: 12, 
    color: '#fff',
    alignSelf: 'center',
  },

  // p === picker style
  contentBg: {
    backgroundColor: '#0000e6', 
    height: 80
  },
  contentRender: {
    top: -70
  },
  cardStyles: {
    marginRight: 12,
    marginLeft: 12,
    borderRadius: 18,
    marginTop: 4
  },
  formStyles: {
    marginBottom: 10,
    marginRight: 12,
    marginLeft: 12
  },
  iconAStyles: {
    marginBottom: 10,
    color: 'red'
  },
  iconInStyles: {
    marginBottom: 10,
    color: '#333333'
  },
  labelAStyles: {
    fontFamily: 'roboto',
    color: 'blue'
  },
  labelInStyles: {
    fontFamily: 'roboto',
    color: '#333333'
  },
  pickerAStyles: {
    marginTop: 10,
    marginLeft: 36,
    fontFamily: 'roboto',
    color: 'blue'
  },
  pickerInStyles: {
    marginTop: 10,
    marginLeft: 36,
    fontFamily: 'roboto',
    color: '#333333'
  },

  // for list response 
  defaultText: {
    flex: 1,
   fontFamily: 'roboto',
    alignSelf: 'flex-start',
    padding: 5,
    textAlign: 'left'
  },
  defaultPrice: {
   fontFamily: 'roboto',
   alignSelf: 'flex-start',
   padding: 5,
   textAlign: 'left',
   color: 'blue',
   fontStyle: 'italic' 
 },
 // For checking data
 // a = activity || for text screen activity
  itemDateStart: {
   marginTop: 8,
   marginLeft: 20,
   marginRight: 8,
   fontFamily: 'roboto',
   color: 'blue'
  },
  itemDateEnd: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 20,
    fontFamily: 'roboto',
    color: '#333333'
  },
  aLabelAStyle: {
    fontFamily: 'roboto',
    color: 'red',
    alignSelf: 'center'
  },
  aLabelInStyle: {
    fontFamily: 'roboto',
    color: '#333333',
    alignSelf: 'center'
  },

  // for about app
  // ******8 c === complaint component ******8 \\
  itemRegular: {
    marginLeft: 10,
    marginRight: 10, 
    borderRadius: 18,
    marginBottom: 6,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignSelf: 'center',
  },
  cCardStyle: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 17
  },
  cTextAstyle: {
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
    color: 'blue',
    fontFamily: 'roboto'
  },
  cTextInstyle: {
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
    color: '#333333',
    fontFamily: 'roboto'
  },
  cImageStyle: {
    height: 35,
    width: 35,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  cViaComplain: {
    marginLeft: 12,
    marginTop: 10,
    marginBottom: 8,
    fontFamily: 'roboto'
  }
});


export {styles};