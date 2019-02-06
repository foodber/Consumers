import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class ThankYou extends React.Component {
    static navigationOptions = {
        title: 'Thank You',
      };

      render () {
          return (
              <View>
                  <Text>Thank You For Your Order!!!</Text>
                  <Button title='Go Back To Home Pahe' onPress={() => {
                      this.props.navigation.navigate('Home')
                  }} />
              </View>
          )
      }
}