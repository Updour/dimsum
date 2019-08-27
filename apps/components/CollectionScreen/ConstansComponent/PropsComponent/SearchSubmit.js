import React, { Component } from 'react'
import {  Text, TouchableOpacity } from 'react-native'

const SearchSubmit = ({ onPress, children }) => {

  const { SearchSubmitStyle, textStyle } = styles

  return (
    <TouchableOpacity onPress={onPress} style={SearchSubmitStyle}>
      <Text style={textStyle}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = { 
  SearchSubmitStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#0000e6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6ffe6',
    marginLeft: 46,
    marginRight: 46,
    marginTop: 17,
    marginBottom: 8
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'roboto'
  },
}
export {SearchSubmit};