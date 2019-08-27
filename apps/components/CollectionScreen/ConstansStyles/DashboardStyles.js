'use strict';
// d == dashboard || dStyles
// c === content Dashboard 
import React from 'react';

import { StyleSheet } from 'react-native';


const dStyles = StyleSheet.create({
  contentStyles: {
    backgroundColor: '#f5fdff'
  },
  contentTop: {
    height: 60,
    backgroundColor: '#0000e6',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,

  },
  contentRender: {
    top: -50,
  },
  cardStyles: {
    marginLeft: 21,
    marginRight: 21,
    borderRadius: 14,
    backgroundColor: '#faffff'
  },
  contenAgent: {
    flex: 1,
    flexDirection: 'row',
  },
  cardText: {
    flex: 1,
    fontSize: 20,
    marginTop: 6,
    marginLeft: 14,
    fontFamily: 'roboto',
    color: 'red',
    fontWeight: '500',
    textAlign: 'center',
  },
  cardReload: {
    fontSize: 25,
    marginRight: 25,
    marginLeft: 50,
    fontFamily: 'roboto',
    alignSelf: 'flex-end',
  },
  /*agent*/
  content: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',

  },
  RpStyle: {
    fontSize: 20,
    marginLeft: 12,
    top: -6,
    fontFamily: 'roboto',
    color: '#fa551e',
  },
  textPrice: {
    fontSize: 35,
    marginTop: 1,
    marginRight: 20,
    textAlign: 'center',
    fontFamily: 'roboto',
    color: 'blue',
  },
  btnDeposits: {
    flex: 1,
    marginBottom: 8,
    borderRadius: 10,
    marginRight: 25,
    backgroundColor: 'red',
    alignContent: 'stretch',

  },
  textDeposits: {
    flex: 1,
    paddingTop: 8,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center'
  },


  /*content styles dashboard*/
  cContentStyle: {
   marginRight: 10, 
   marginLeft: 10,
   borderRadius: 17,
   backgroundColor: '#fff', 

   // top: -36
  },
  cIconStyle: {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 15,
    flexDirection: 'row',
  },
  cApiStyle: {
    backgroundColor: '#fff',
    // borderRadius: 14,
  },
  cImgStyle: {
    marginTop: 8,
    height: 50,
    width: 50,
    alignSelf: 'center'
  },
  // for virtual account image
  cImgStyleAcc: {
    marginTop: 8,
    height: 60,
    width: 60,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  cTextStyle: {
    marginBottom: 4,
    marginTop: 2,
    fontSize: 15,
    color: '#4e5251',
    alignSelf: 'center',
    fontFamily: 'roboto',
  }
});


export {dStyles};