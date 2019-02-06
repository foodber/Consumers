import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Homepage from '../screens/Homepage';
import SingleTruck from '../screens/SingleTruck';
import Cart from '../screens/Cart';
import Map from '../screens/map';
import ThankYou from '../screens/thankYou'

const HomeStack = createStackNavigator({
  Home: Homepage,
  singleTruck: SingleTruck,
  Cart: Cart,
  ThankYou: ThankYou
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Main',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const mapStack = createStackNavigator({
  Map: Map,
});

mapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

// const SingleTruck = createStackNavigator({
//   Links: SingleTruck
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Orders',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Test",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-options" : "md-options"}
//     />
//   )
// };

export default createBottomTabNavigator({
  HomeStack,
  mapStack,
  //LinksStack,
  // SettingsStack
});
