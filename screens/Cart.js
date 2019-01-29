import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default class Cart extends React.Component {
  static navigationOptions = {
    title: 'Cart',
  };
  constructor() {
    super();
    // this.state = {
    //   test: this.props.truckKey,
    // };
  }
  componentDidMount() {
    let test = this.props.navigation.getParam('truckKey', 'default');
    console.log(test);
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>Hello World</Text>
        <Text />
      </View>
    );
  }
}
