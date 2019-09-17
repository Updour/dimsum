/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
 	AppRegistry,
 	StyleSheet,
 	ScrollView,
 	Text,
 	View,
 	Dimensions,
 	processColor
 } from 'react-native';
 // import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper'
 import _ from 'lodash'
 import axios from 'axios'
 import { formatDateChart, formatPrice } from '../../../../CollectionScreen'
 export default class ReportComponentScreen extends Component {

 	constructor() {
 		super();

 		this.state = {
 			data: {},
 			legend: {
 				enabled: true,
 				textColor: processColor('blue'),
 				textSize: 12,
 				form: 'SQUARE',
 				formSize: 14,
 				xEntrySpace: 10,
 				yEntrySpace: 5,
 				formToTextSpace: 5,
 				wordWrapEnabled: true,
 				maxSizePercent: 0.5,
 				custom: {
 					colors: [processColor('blue'), processColor('red')],
 					labels: ['Provider', 'Harga',]
 				}
 			},
 			marker: {
 				enabled: true,
 				markerColor: processColor('#F0C0FF8C'),
 				textColor: processColor('white'),
 				markerFontSize: 14,
 			},

 			selectedEntry: "",
 			yAxis: {left:{axisMaximum:300000}, right: {enabled: false}}
 		}

 	}

 	componentDidMount() {
 		this.test()
 	}
 	test = async () => {
 		try {
 			let dat = await axios.get('http://xmetrik.biz:9700/dpurchase/sdponsel/')
 			let x = dat.data.data.map(i => ({harga: i.harga, provider: i.provider}))
  		// price
  		let c = parseInt(x[x.length - 1].harga)
  		let d = parseInt(x[x.length - 2].harga)
  		let e = parseInt(x[x.length - 3].harga)
  		let f = parseInt(x[x.length - 4].harga)
  		let g = parseInt(x[x.length - 5].harga)
  		let h = parseInt(x[x.length - 6].harga)
      let i = parseInt(x[x.length - 7].harga)
      let j = parseInt(x[x.length - 8].harga)
      let k = parseInt(x[x.length - 9].harga)
      let l = parseInt(x[x.length - 10].harga)
      let m = parseInt(x[x.length - 11].harga)
      let n = parseInt(x[x.length - 12].harga)
      let o = parseInt(x[x.length - 13].harga)
      let p = parseInt(x[x.length - 14].harga)

  		// date
  		let da = x[x.length - 1].provider
  		let db = x[x.length - 2].provider
  		let dc = x[x.length - 3].provider
  		let dd = x[x.length - 4].provider
  		let de = x[x.length - 5].provider
  		let df = x[x.length - 6].provider
  		let dg = x[x.length - 7].provider

  		console.log(c)
  		this.setState({ 
  			ab: c,
  			ad:d,
  			ae:e,
  			af:f,
  			ag:g,
  			ah:h,
  			ai:i,
        j:j,
        k:k,
        l:l,
        m:m,
        n:n,
        o:o,
        p:p,
  			// 
  			da:da,
  			db:db,
  			dc:dc,
  			dd:dd,
  			de:de,
  			df:df,
  			dg:dg,
  		})
  		setTimeout(() =>{
  			this._data()
  		}, 3000);
  	}catch(err){throw err}
  }
  _data = () => {
  	const size = 80;

  	this.setState({
  		data: {
  			dataSets: [{
  				values: this._randomParabolaValues(size),
  				label: 'provider',
  				config: {
  					lineWidth: 2,
  					drawValues: false,
  					drawCircles: false,
  					highlightColor: processColor('red'),
  					color: processColor('red'),
  					drawFilled: true,
  					fillColor: processColor('blue'),
  					fillAlpha: 60,
  					highlightEnabled: false,
  					dashedLine: {
  						lineLength: 20,
  						spaceLength: 20
  					}
  				}
  			}, {
  				values: [
  				{x: 14, y: this.state.ab, marker: this.state.da},
  				{x: 20, y:this.state.ad, marker: this.state.db},
  				{x: 40, y: this.state.ae, marker:this.state.dc},
  				{x: 65, y:this.state.af, marker: this.state.dd},
  				{x: 70, y: this.state.ag, marker: this.state.de},
          {x: 90, y:this.state.ah, marker: this.state.df},
          {x: 100, y:this.state.ai, marker: this.state.dg},
          {x: 120, y:this.state.j, marker: this.state.dg},
          {x: 135, y:this.state.k, marker: this.state.dg},
          {x: 145, y:this.state.l, marker: this.state.dg},
          {x: 150, y:this.state.m, marker: this.state.dg},
          {x: 160, y:this.state.n, marker: this.state.dg},
          {x: 180, y:this.state.o, marker: this.state.dg},
          {x: 200, y:this.state.p, marker: this.state.dg},

          ],

  				label: 'user',
  				config: {
  					lineWidth: 1,
  					drawValues: true,
  					circleRadius: 5,
  					highlightEnabled: true,
  					drawHighlightIndicators: true,
  					color: processColor('red'),
  					drawFilled: true,
  					valueTextSize:10,
  					fillColor: processColor('blue'),
  					valueFormatter: ['harga', 'provider'],
  					fillAlpha: 45,
  					drawGridLines: false,
  					circleColor: processColor('red')
  				}
  			}],
  		}
  	})
  }
  _randomParabolaValues(size: number) {
  	return _.times(size, (index) => {
  		return {x: index, y: index * index}
  	});
  }

  handleSelect(event) {
  	let entry = event.nativeEvent
  	if (entry == null) {
  		this.setState({...this.state, selectedEntry: null})
  	} else {
  		this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
  	}

  	console.log(event.nativeEvent)
  }

  render() {

  	let borderColor = processColor("red");
  	return (
  		<View style={{flex: 1}}>

  		<View style={{height:80}}>
  		<Text> selected entry</Text>
  		<Text> {this.state.selectedEntry}</Text>
  		</View>

  		<View style={styles.container}>


  		<LineChart
  		style={styles.chart}
  		data={this.state.data}
  		chartDescription={{text: ''}}
  		legend={this.state.legend}
  		marker={this.state.marker}

  		drawGridBackground={true}

  		borderColor={borderColor}
  		borderWidth={1}
  		drawBorders={true}

  		yAxis={this.state.yAxis}


  		onSelect={this.handleSelect.bind(this)}
  		onChange={(event) => console.log(event.nativeEvent)}

  		ref="chart"
  		/>
  		</View>
  		</View>


  		);
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	chart: {
		flex: 1
	}
});