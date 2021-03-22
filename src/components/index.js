import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import DashboardScreen from './DashboardScreen/DashboardScreen';
import CashierScreen from './ChasierScreen/CashierScreen';
import ProductScreen from './ProductScreen/ProductScreen'
import DepositScreen from './DepositScreen/DepositScreen'
// import ProfileScreen from './ProfileScreen/ProfileScreen'

const TabBottomNavigation = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Home'
    })
  },
  // Cashiers: {
  //   screen: CashierScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     tabBarLabel: 'Cashier'
  //   })
  // },
  Products: {
    screen: ProductScreen,
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarLabel: 'Product',
      headerMode: 'none',

    })
  },
  Deposits: {
    screen: DepositScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Setoran'
    })
  },
  // Profiles: {
  //   screen: ProfileScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     tabBarLabel: 'Profile'
  //   })
  // }
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
      } else if (routeName === 'Cashiers') {
        iconName = `ios-calculator`;
      } else if (routeName === 'Products') {
        iconName = `ios-mail`;
        } else if (routeName === 'Deposits') {
          iconName = `ios-stats`;
        } else if (routeName ==='Profiles') {
          iconName = `ios-contact`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
        swipeEnabled: false,
        tabBarOptions: {
          activeTintColor: '#FF0000',
          inactiveTintColor: '#6700ce',
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

  export default createAppContainer(TabBottomNavigation);
