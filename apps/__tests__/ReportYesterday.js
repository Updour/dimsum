'use strict';

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import moment from 'moment'

import { FlatList, View } from 'react-native';
import { Container, Content, Text,  Form, Item,  Input, Label, Card } from 'native-base'

import { 
	netDataTrx, timer, styles, formatDate, formatPrice, WaveIndicator, ModalPopUp 
} from '../../../../CollectionScreen'
import DpurchaseLisItem from './PropsResponse/DpurchaseLisItem'

export default class ReportYesterday extends Component {
	_isMounted = false;
	state = {
		number_reorder: '',
		yesterDay: [],
		isModal: false,
	}
	componentDidMount() {
		this._isMounted = true;
		this._onRetrieveValueDataStorage()
	}
	componentWillUnmount() {
		this._isMounted = false;
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
			if (this._isMounted) {
				this.setState({ dpurchase: data })
			}
			setTimeout(() => {
				this._onRetrieveDataFilteringYesterday()
			}, 1500);
		}catch(err) {
			throw err
		}
	}
	_onRetrieveDataFilteringYesterday = () => {
		let data = this.state.dpurchase.filter(i => {
			// const yesterday = moment().subtract(1).format('DD/MM/YYYY')
			// console.log('aa',yesterday)
			var defaultDate = new Date() - 1000 * 60 * 60 * 24 * 1;
			let yesterday = moment(new Date(defaultDate)).format("DD/MM/YYYY")
			let filterDate = moment(i.tanggal).format('DD/MM/YYYY')
				if (yesterday === filterDate) { return true } //else {return false}
			})
		if (this._isMounted) {
			this.setState({ yesterDay: data })
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
	render() {
		let { 
			yesterDay, agenid, area, harga, ket_sts, number_reorder, provider, tanggal, tipe, tujuan, vsn
		} = this.state;
		let { 
			contentStyle, cardStyles, formStyles, labelAStyles, labelInStyles, textStyles 
		} = styles;
		return (
			<View>
			<FlatList 
				data={this.state.yesterDay}
				keyExtractor={(i, j) => j.toString()}
				renderItem={({item}) => (
					<DpurchaseLisItem item={item} 
						onPress={() => this._onRetrieveValueDataReport(item)}
					/>
				)}
				ListEmptyComponent={WaveIndicator}
			/>
			<ModalPopUp 
				visible= {this.state.isModal}
				onRequestClose= {()=> this.setState({ isModal: false})}
				onPress= {()=> this.setState({ isModal: false})}
				transparent
				>
					<Content style={contentStyle}>
						<Card style={cardStyles}>
							<Form style={formStyles}>
								<Item stackedLabel>
									<Label style={agenid ? labelAStyles: labelInStyles}>Username</Label>
										<Input value= {agenid} />
								</Item>
								<Item stackedLabel last>
									<Label style={ tujuan ? labelAStyles: labelInStyles}>Nomor Handphone</Label>
										<Input style={textStyles} value={tujuan}/>
								</Item>
								<Item stackedLabel last>
									<Label style={ tanggal ? labelAStyles: labelInStyles}>Tanggal</Label>
										<Input style={textStyles} value={formatDate(tanggal)}/>
								</Item>
								<Item stackedLabel last>
									<Label style={ harga ? labelAStyles: labelInStyles}>Harga</Label>
										<Input style={textStyles} value={formatPrice(harga)}/>
								</Item>
								<Item stackedLabel last>
									<Label style={ ket_sts ? labelAStyles: labelInStyles}>Status</Label>
										<Input style={textStyles} value={ket_sts}/>
								</Item>
								<Item stackedLabel last>
									<Label style={ area ? labelAStyles: labelInStyles}>Area</Label>
										<Input value={area}/>
								</Item>
								<Item stackedLabel last>
									<Label style={ number_reorder ? labelAStyles: labelInStyles}>Nomor Transaksi</Label>
										<Input style={textStyles} value={number_reorder.toString()}/>
								</Item>
								<Item stackedLabel>
									<Label style={ provider ? labelAStyles: labelInStyles}>Provider</Label>
										<Input 	style={textStyles} value={provider} />
								</Item>
								<Item stackedLabel last>
									<Label style={ tipe ? labelAStyles: labelInStyles}>Type</Label>
										<Input style={textStyles} value={tipe}/>
								</Item>
								<Item stackedLabel last>
									<Label style={ vsn ? labelAStyles: labelInStyles}>SN</Label>
										<Input style={textStyles} value={vsn} 
										multiline={true}
										/>
								</Item>
							</Form>
						</Card>
					</Content>
				</ModalPopUp>
			</View>
			);
	}
}