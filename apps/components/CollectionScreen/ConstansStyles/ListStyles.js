'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
// ***** l == list item **** \\

const ListStyles = StyleSheet.create({
	lCardStyle: {
		marginRight: 10,
    marginLeft: 10,
    borderRadius: 17
	},
	lTextStyle: {
    fontFamily: 'roboto' //default text
  },
  lSuccessStyle: {
    fontFamily: 'roboto',
    color:'#0027c4',
    fontWeight: '500',
  },
  lCheckStyle: {
    fontFamily: 'roboto',
    color:'#03c100',
    fontWeight: '500',
  },
  lFailedStyle: {
    fontFamily: 'roboto',
    color:'#f70202',
    fontWeight: '500',
  },
  lPendingStyle: {
    fontFamily: 'roboto',
    color:'#ff7e2d',
    fontWeight: '500',
  },
  lBillStyle:{
    marginRight: 6,
    color: '#dbb004',
    fontFamily: 'roboto',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  lPriceStyle:{
    marginRight: 8,
    right: 4,
    fontFamily: 'roboto',
    fontStyle: 'italic',
  },
  lKetStyle: {
    flex: 1,
    marginLeft: 48,
    marginRight: 18,
    color: '#898989',
    fontFamily: 'roboto',
    textAlign:  'left',
    alignSelf: 'flex-start',
  },  
  lKetStyled: {
    marginTop: 8,
    marginLeft: 48,
    marginRight: 18,
    color: '#898989',
    fontFamily: 'roboto',
    textAlign:  'left',
    alignSelf: 'flex-start',
  },
  /******** amnual transaction ********/
  // c == card component t === text component
  // for manual transcation
  cOutboxStyle: {
    alignSelf: 'flex-start', 
    marginRight: 78, 
    marginLeft: 16, 
    borderRadius: 23,
    borderBottomLeftRadius: 23,
    borderTopLeftRadius: 6
  },
  tOutboxStyle: {
    fontFamily: 'roboto', 
    padding: 6, 
    margin: 8
  },
  cInboxStyle: {
    alignSelf: 'flex-end', 
    marginRight: 16, 
    marginLeft: 78, 
    borderRadius: 23,
    borderBottomLeftRadius: 23, 
    borderTopRightRadius: 8,
    marginTop: 12
  },
  tInboxStyle: {
    fontFamily: 'roboto',
    padding: 6,
    margin: 8
  },
  formStyle: {  
    backgroundColor: '#f0f0f5', 
    marginLeft: 12,
    marginRight: 12,
    marginTop: 4,

  },
  itemStyle: {
    backgroundColor: '#fff'
  },
  buttonStyle: {
    alignSelf: 'center',
    // flex: 1,
    backgroundColor: '#0000e6',
    borderRadius: 13,
    marginBottom: 15,
    marginTop: 13,
    marginRight: 12

  }, 
  tButtonStyle: {
    fontFamily: 'roboto',
    fontSize: 16,
    padding: 10, 
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center'
  },



  
  // **** fro price *** \\
 
  tCardStyle: {
    alignSelf: 'center',
    marginTop: 2, 
    marginBottom: 8,
    fontFamily: 'roboto'
  },
  ImageStyle: {
    height: 60,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 6,
    marginBottom: 2,
    alignSelf: 'center',
    width: '80%',
    resizeMode: 'contain',
  },

  // for acccount
  cardList: {
    backgroundColor: '#f7fff5', 
    marginLeft: 10, 
    marginRight: 10, 
    borderRadius: 15
  },
  textCard: {
    borderColor: '#efefef',
    backgroundColor: '#fff',
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 12
  },
  textId: {
   fontFamily: 'roboto',
   color: '#000594',
  },
  textbalance: {
   fontFamily: 'roboto',
   color: 'red',
  },
  textCity: {
    fontFamily: 'roboto',
    color: '#cc3406',
    fontWeight: '600'
  },

  // *** for history
  hTextStyle: {
      flex: 1,
      marginLeft: 4, 
      marginLeft: 4,
      marginTop: 4,
      marginBottom: 4,
      padding: 12,
      fontFamily: 'roboto',
      textAlign: 'left'
    },

    //modal transaparent
  modalStyle: { 
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    height: 420,
    width: 330,
    justifyContent: 'center,',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }, 
});


export {ListStyles};