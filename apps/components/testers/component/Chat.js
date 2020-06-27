// @flow
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity } from 'react-native'

import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import Fire from '../config/Fire';

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

// 

render() {
  return (
    <View>
    <GiftedChat
    messages={this.state.messages}
    onSend={Fire.shared.send}
    user={this.user}
    />
    </View>
    );
}


}

export default Chat;
