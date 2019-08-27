'use strict';

import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Content, Card, ListItem, Text, Icon, Left, Body, Right, Button } from 'native-base'
import {formatDate} from '../../../../../CollectionScreen'

const DpurchaseLisItem = ({ item, onPress }) => {
	let { tujuan, harga, provider, ket_sts, tanggal } = item
	let { textHeader, card, textNote, textNoted, textResponse, dateText, button } = styles;
	return (
		<TouchableOpacity onPress={onPress}>
		<Card style={card} pointerEvents='none'>
		<Text style={textHeader}>Transaksi</Text>
		<ListItem avatar>
		<Body>
		<Text note style={textNote}>Nomor Handphone</Text>
		<Text style={textResponse}>{tujuan}</Text>
		<Text note style={textNoted}>Provider</Text>
		<Text style={textResponse}>{provider}</Text>
		</Body>
		<Right>
		<Text note style={dateText}>{formatDate(tanggal)}</Text>
		</Right>
		</ListItem>
		
		{ ket_sts === 'TRX PENDING' && 
			<Button style={button} rounded block warning > 
				<Text>On Processing</Text>
			</Button>
		}
		{ ket_sts === 'TRX SUCCESS' && 
			<Button style={button} rounded block success> 
				<Text>Success</Text>
			</Button>
		}
		{ ket_sts === 'TRX FAIL' && 
			<Button style={button} rounded block danger> 
				<Text>Failed</Text>
			</Button>
		}
		{ ket_sts === 'TRX TOPUP' && 
			<Button style={button} rounded block info> 
				<Text>Failed</Text>
			</Button>
		}
		</Card>
		</TouchableOpacity>
		)
}
let styles = {
	card: {
		borderRadius: 16,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#f8fff5'
	},
	textHeader: {
		fontFamily: 'roboto',
		color: '#333333',
		textAlign: 'center',
		marginTop: 6,
		marginBottom: 2,
		borderRadius: 16,
	},
	textNote: {
		fontFamily: 'roboto',
		color: '#333333',
	},
	textNoted: {
		fontFamily: 'roboto',
		color: '#333333',
		marginTop: 7,
	},
	textResponse: {
		fontFamily: 'roboto',
		marginTop: 2,
		fontWeight: '700'
	},
	dateText: {
		fontFamily: 'roboto',
		color: 'red',
	},
	button: {
		marginRight: 15,
		marginLeft: 15, 
		marginTop: 4,
		marginBottom: 4,
		alignSelf: 'center',
	}
}
export default DpurchaseLisItem;