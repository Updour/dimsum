'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

const PrintStyles = StyleSheet.create({
	
	contentStyle: {
		borderRadius: 14,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 6,
		marginRight: 6,
		borderWidth: 1,
		borderColor: '#000'
	},
	textStyled:{
		textAlign: 'center',
		fontFamily: 'roboto',
	},
	textRigthStyle: {
		textAlign: 'left',
		fontFamily: 'roboto',
	},
	textPay: {
		textAlign: 'left',
		fontFamily: 'roboto',
		color: 'blue',
	},
	footerStyle: {
		marginLeft: 12,
		marginRight: 12,
		marginBottom: 4,
		borderRadius: 14,
		backgroundColor: '#0000e6'
	},
	buttonStyle: {
		borderRadius: 12,
		backgroundColor: '#0000e6'
	},
	iconStyle: {
		color: '#fff'
	}
});


export {PrintStyles};