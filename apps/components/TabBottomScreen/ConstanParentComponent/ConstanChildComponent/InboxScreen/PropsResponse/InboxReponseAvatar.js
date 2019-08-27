'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { List, ListItem, Left,  Text, Body, Right } from 'native-base';
import moment from 'moment'

const InboxReponseAvatar = ({ item, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.viewStyle} pointerEvents="none">
				<List>
					<ListItem avatar>
						<Body>
							<Text>{item.out_hpnumber}</Text>
							<Text note>{item.out_message.substr(0, 33)}</Text>
						</Body>
					<Right>
						<Text note>{moment(item.out_starttime).format('LT')}</Text>
					</Right>
					</ListItem>
				</List>
			</View>
		</TouchableOpacity>
	)
}
let styles ={
	viewStyle: {
		flex: 1,
		// marginTop: 4,
		marginLeft: 3,
		marginRight: 3,
		borderRadius: 8,
	},
}
export default InboxReponseAvatar;