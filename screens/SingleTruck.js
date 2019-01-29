import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";
import { Constants } from "expo";

export default class SingleTruck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      menu: []
    };
  }

  static navigationOptions = {
    title: "Truck Name",
    style: {
      backgroundColor: "blue"
    }
  };

  componentDidMount() {
    const truckKey = this.props.navigation.getParam(
      "truckKey",
      "Not Available"
    );

    const key = truckKey[0];

    const truckMenu = firebase
      .database()
      .ref()
      .child("truckmenus")
      .child(key)
      .on("value", snapShot => {
        const data = snapShot.val();
        const arr = [];
        if (data) {
          for(let key in data) {
            arr.push({[key]: data[key]})
          }
        }
        this.setState({menu: [...arr]})
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Menu</Text>
        {this.state.menu && this.state.menu.map(item => {
          for(let key in item) {
            return (
              <View key={item[key]}>
              <Text>Item : {[key]}</Text>
              <Text>Price : {item[key]}</Text>
              </View>
            )
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight
  },
  isItWorking: {
    fontSize: 24
  },
  theHeader: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "left"
  }
});
