import React from 'react'
import { View } from 'react-native'
import { Badge, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

// component
import AccountScreen from './ConstanParentComponent/AccountScreen'
import ActivityScreen from './ConstanParentComponent/ActivityScreen'
import DashboardScreen from './ConstanParentComponent/DashboardScreen'
import InboxScreen from './ConstanParentComponent/InboxScreen'
import ReportScreen from './ConstanParentComponent/ReportScreen'

import BadgeInboxScreen from './ConstanParentComponent/ConstanChildComponent/InboxScreen/BadgeInboxScreen'

const MainMenuBottomScreen = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Home'
    }) 
  },
  Activity: {
    screen: ActivityScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Aktivitas'
    }) 
  },
  Inbox: {
    screen: InboxScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Kotak Masuk'
    }) 
  },
  Report: {
    screen: ReportScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Laporan'
    }) 
  },
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Profile'
    }) 
  }
}, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      let { badgeStyles, iconStyles } = styles;
      if (routeName === 'Dashboard') {
        iconName = `ios-home`;
      } else if (routeName === 'Activity') {
        iconName = `ios-clock`;
      } else if (routeName === 'Inbox') {
        iconName = `ios-mail`;
        /*return (
          <View >
            <BadgeInboxScreen />
            <Ionicons style={iconStyles} name="ios-mail" size={25} color={tintColor} />
          </View>
          )*/
        } else if (routeName === 'Report') {
          iconName = `ios-stats`;
          /*return (
           <View >
             <BadgeInboxScreen />
             <Ionicons style={iconStyles} name="ios-stats" size={25} color={tintColor} />
           </View>
          )*/
        } else if (routeName ==='Account') {
          iconName = `ios-contact`;
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />
        
        ;
      },
    }),
        swipeEnabled: false,
        tabBarOptions: {
          activeTintColor: '#FF0000',
          inactiveTintColor: '#A1A3A2',
          swipeEnabled: true,
          labelStyle: {
            fontFamily: 'roboto'
          },
        },

      },

      )
  let styles = {
    badgeStyles: {
      scaleX: 0.7, 
      scaleY: 0.7, 
      position: 'relative', 
      top: -15,
      right: -11 
    },
    iconStyles: {
      position: 'absolute',
      alignContent: 'center',
      marginLeft: 3
    }
  }
  export default createAppContainer(MainMenuBottomScreen);