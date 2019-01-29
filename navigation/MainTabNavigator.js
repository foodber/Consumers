import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

<<<<<<< HEAD
import TabBarIcon from '../components/TabBarIcon';
import OrderPage from '../screens/OrderPage';
import NotbeingUsed from '../screens/NotbeingUsed';
import Cart from '../screens/Cart';
=======
import TabBarIcon from "../components/TabBarIcon";
import Homepage from "../screens/Homepage";
import SingleTruck from "../screens/SingleTruck";
import SettingsScreen from "../screens/SettingsScreen";
>>>>>>> 22660afe56683911f94dbf31aa386fabcf65a7bf

const HomeStack = createStackNavigator({
  Home: Homepage,
  singleTruck: SingleTruck
});

HomeStack.navigationOptions = {
  tabBarLabel: "Main",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
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

<<<<<<< HEAD
const Cart = createStackNavigator({
  CurrnetCart: Cart,
});

Cart.navigationOptions = {
  tabBarLabel: 'Test',
=======
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Test",
>>>>>>> 22660afe56683911f94dbf31aa386fabcf65a7bf
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  //LinksStack,
<<<<<<< HEAD
  // SettingsStack,
=======
  SettingsStack
>>>>>>> 22660afe56683911f94dbf31aa386fabcf65a7bf
});
