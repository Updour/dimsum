'use strict';

import React from 'react';

import { StyleSheet } from 'react-native';


const everyStyles = StyleSheet.create({
  contStyles: {
    marginTop: 23
  },
  contentStyle: {
    flex:1,
    backgroundColor: '#efefef'
  },
  textSubmit: {
    fontFamily: 'roboto',
    color: '#fff'
  },
  cardStyles: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    borderRadius: 20,
  },
  headerStyles: {
    backgroundColor: '#7400e7'
  },
  itemStyles:{
    borderColor: '#8d1bff',
    marginRight: 12,
    borderWidth: 1,
    marginLeft: 20,
  },
  inputStyles:{
    marginLeft: 20,
    fontFamily: 'roboto'
  },
  iconInaFocus: {
    marginLeft: 12,
    color: '#8d1bff'
  },
  iconFocus: {
    marginLeft: 12,
    color: '#8c8c8c'
  },
  iconLabel: {
   marginLeft: 12,
   color: '#8d1bff'
 },
 iconInaLabel: {
   marginLeft: 12,
   color: '#8c8c8c'
 },
 labelFocus: {
  fontFamily: 'roboto',
  color: '#333333'
},
labelInaFocus: {
  fontFamily: 'roboto',
  color: 'blue',
}
});


export {everyStyles};
