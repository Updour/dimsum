import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import firebaseSDK from '../config/firebaseSDK';
import firebase from 'firebase'

export default class Chat extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || 'Chat!'
	});

	state = {
		messages: []
	};

	getuser = () => {
		return {
			name: this.props.navigation.state.params.name,
			email: this.props.navigation.state.params.email,
			avatar: this.props.navigation.state.params.avatar,
			id: firebaseSDK.uid,
			_id: firebaseSDK.uid
		};
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={firebaseSDK.send}
				user={this.user}
			/>
		);
	}

	componentDidMount() {
		this.getuser()
		
	// }
		// firebaseSDK.refOn(message =>
		// 	this.setState(previousState => ({
		// 		messages: GiftedChat.append(previousState.messages, message)
		// 	}))
		// );
	}
	// componentWillUnmount() {
	// 	firebaseSDK.refOff();
	// }
}