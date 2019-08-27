import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native'
// component
import AccountScreen from './ConstanComponent/AccountScreen'
import ActivityScreen from './ConstanComponent/ActivityScreen'
import DashboardScreen from './ConstanComponent/DashboardScreen'
import InboxScreen from './ConstanComponent/InboxScreen'
import ReportScreen from './ConstanComponent/ReportScreen'


const MainMenuBottomScreen = createBottomTabNavigator({
  Dashboard: { screen: DashboardScreen },
  Activity: { screen: ActivityScreen },
  Inbox: { screen: InboxScreen },
  Report: { screen: ReportScreen },
  Account: { screen: AccountScreen }
}, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Dashboard') {
        iconName = `ios-home`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = <Text>{ screenProps.newConversations }</Text>; 
        } else if (routeName === 'Activity') {
          iconName = `ios-clock`;
        } else if (routeName === 'Inbox') {
          iconName = `ios-mail`;
        } else if (routeName === 'Report') {
          iconName = `ios-card`;
        } else if (routeName ==='Account') {
          iconName = `ios-contact`;
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  swipeEnabled: false
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'gray',
    swipeEnabled: true,
      labelStyle: {
        fontFamily: 'roboto'
      },
  },

},

)
export default createAppContainer(MainMenuBottomScreen);