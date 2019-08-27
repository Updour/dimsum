'use strict';

import React, { Component } from 'react';

import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Card, Text } from 'native-base'
import { ListStyles } from '../../CollectionScreen'
import PriceHeader from './PropsHeader/PriceHeader'
export default class PriceScreen extends Component {
	state = {
		prices : [
		{
			img : require('../../../assets/images/price/regular.jpg'),
			name: 'Check Harga Reguler',
			nav : 'regularPrice'
		},
		{
			img : require('../../../assets/images/price/packet.jpg'),
			name: 'Check data package prices',
			nav : 'packetPrice' 
		},
		{
			img : require('../../../assets/images/price/voucher.jpg'),
			name: 'Check voucher prices',
			nav : 'voucherPrice'
		},
		{
			img : require('../../../assets/images/price/account.jpg'),
			name: 'Virtual Account',
			nav : 'virtualPrice' 
		},
		]
	}
	// 
	componentDidMount() {

	}
	render() {
		let { navigate } = this.props.navigation
		let { prices } = this.state;
		let { lCardStyle, tCardStyle, ImageStyle } = ListStyles
		return (
			<Container>
			<PriceHeader {...this.props} />
				<ScrollView>
					{prices.map((i, j) => {
						return (
							<TouchableOpacity key={j} onPress={() => navigate(i.nav)}>
								<Card style={lCardStyle}>
									<Image style={ImageStyle} source={i.img} />
									<Text style={tCardStyle}>{i.name}</Text>
								</Card>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
			</Container>
			);
	}
}