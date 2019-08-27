'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import moment from 'moment'

import { FlatList, View } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Body, Right, Card } from 'native-base'
import { 
	netDataTrx, timer, styles, formatDate, formatPrice, WaveIndicator, ModalReport,
	ListStyles, ReloadScreen
} from '../../../../CollectionScreen'
import DpurchaseLisItem from './PropsResponse/DpurchaseLisItem'

export default class ReportAllDay extends Component {
	state = {
		number_reorder: '',
		dpurchase: [],
		isModal: false,
		refreshing: false
	}
	componentDidMount() {
		this._onRetrieveValueDataStorage()
	}
	_onRetrieveValueDataStorage = async () => {
		try {
			let val = await AsyncStorage.getItem('@keyData')
			let parsed = JSON.parse(val)
			this.setState({ id: parsed.agenid })
			setTimeout(() => {
				this._onRetrieveValueDataTransaction()
			}, timer());
		} catch (err) {
			throw err;
		}
	}
	_onRetrieveValueDataTransaction = async () => {
		try {
			let result= await axios.get(netDataTrx() + this.state.id)
			let data = result.data.data
			this.setState({ dpurchase: data.reverse(), refreshing: false })
		}catch(err) {
			throw err
		}
	}
	// 
		_onRetrieveValueDataReport = item => {
		let { 
			agenid, area, harga, ket_sts, number_reorder, provider, tanggal, tipe, tujuan, vsn
		} = item;
		this.setState({
			isModal: true, agenid: agenid, area: area, harga: harga,
			ket_sts: ket_sts,	number_reorder: parseInt(number_reorder),	provider: provider,	tanggal: tanggal,
			tipe: tipe,	tujuan: tujuan,	vsn: vsn,
		})
	}

	// 
	_onRetrieveValueNewData = () => {
		this.setState({ refreshing: true, dpurchase: ''}, ()=> this._onRetrieveValueDataTransaction())
	}
	render() {
		let { 
			dpurchase, agenid, area, harga, ket_sts, number_reorder, provider, tanggal, 
			tipe, tujuan, vsn, refreshing
		} = this.state;
		let { 
			contentStyle, cardStyles, formStyles, labelAStyles, labelInStyles, textStyles 
		} = styles;
		let { 
			lCardStyle, lTextStyle, lPriceStyle, lSuccessStyle, lFailedStyle, lKetStyled, 
			modalStyle, modalContent
		} = ListStyles;
		return (
			<ReloadScreen 
				refreshing={this.state.refreshing}
				onRefresh={this._onRetrieveValueNewData}
			>
			<View>

				<FlatList 
					data={dpurchase}
					keyExtractor={(i, j) => j.toString()}
					renderItem={({item}) => (
						<DpurchaseLisItem item={item} 
							onPress={() => this._onRetrieveValueDataReport(item)}
						/>
					)}
					ListEmptyComponent={WaveIndicator}
				/>
				<ModalReport 
				visible= {this.state.isModal}
				onRequestClose= {()=> this.setState({ isModal: false})}
				onPress= {()=> this.setState({ isModal: false})}
				transparent
				>
			<View style={modalStyle}>
			<View style={modalContent}>
			<List style={{ width: 335}}>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>No Tujuan</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{tujuan}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tanggal</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{formatDate(tanggal)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Harga</Text>
          </Body>
          <Right>
            <Text style={lPriceStyle}>Rp. {formatPrice(harga)}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Status</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>
            { ket_sts === 'TRX SUCCESS' && <Text style={lSuccessStyle}>Success</Text>  }
            { ket_sts === 'TRX FAIL' && <Text style={lFailedStyle}>Failed</Text>  }
            </Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>No Order</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{number_reorder}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Provider</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{provider}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Area</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{area}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text style={lTextStyle}>Tipe</Text>
          </Body>
          <Right>
            <Text style={lTextStyle}>{tipe}</Text>
          </Right>
        </ListItem>
        <ListItem icon>
            <Text style={lTextStyle}>SN</Text>
            <Body/>
          <Right>
            <Text selectable style={lKetStyled}>{vsn}</Text>
          </Right>
        </ListItem>
        </List>
      </View>
			</View>
				</ModalReport>
				
			</View>
			</ReloadScreen>
			);
	}
}