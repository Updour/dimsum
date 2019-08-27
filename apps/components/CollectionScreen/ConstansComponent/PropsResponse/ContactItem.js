'use strict';

import React, { Component } from 'react';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { 
List, ListItem, Left, Body, Right, Text, Icon, Card
} from 'native-base'


const ContactItem = ({ onPress, item }) => {
  let { label, name, number } = item;
  let { textName } = styles
  return (
    <TouchableOpacity onPress={onPress}>
    <Card transparent pointerEvents='none'>
    <List>
    <ListItem avatar>
    <Left>
    <Icon name="ios-contact"/>
    {/*<Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
    style={{width: 50, height: 50}}
    />*/}
    </Left>
    <Body>
      <Text>{name}</Text>
      <Text style={textName}>{number}</Text>
      </Body>
      <Right>
      <Text note>{label}</Text>
      </Right>
      </ListItem>
      </List>
      </Card>
      </TouchableOpacity>
      )
}

const styles = StyleSheet.create({
  textName: {
    fontFamily: 'roboto'
  }
});


export {ContactItem};