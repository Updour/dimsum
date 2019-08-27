'use strict';

import React, { Component } from 'react';

import { View, TouchableOpacity } from 'react-native';
import { Card,Text } from 'native-base'

const InboxReponse = ({ item, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
		<View style={styles.viewStyle}>
				<Text style={styles.textStyle}>
					{item.out_message}
				</Text>
				<Text style={styles.textStyle}>
					{item.out_starttime}
				</Text>
		</View>
		</TouchableOpacity>
	)
}
let styles= {
	viewStyle: {
		flex: 1,
		marginTop: 8,
		marginLeft: 13,
		marginRight: 13,
		borderRadius: 2,
		borderTopLeftRadius: 2,
		borderTopRightRadius: 30,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		borderWidth: 1,
		borderColor: '#ccc6c6',
		backgroundColor: '#fcffff',

	},
	textStyle: {
		flex: 1,
		padding: 6,
		marginLeft: 12,
		// marginRight: 12,
		marginBottom: 6,
		marginTop: 6,
		textAlign: 'left',
		fontFamily: 'roboto',
		color: '#212121'
	}
}

export default InboxReponse;