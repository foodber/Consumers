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
    const truckMenu = firebase
      .database()
      .ref()
      .child("truckmenus")
      .orderByChild("truckKey")
      .on("value", snapShot => {
        const data = snapShot.val();
        if (data) {
          console.log(data);
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <View>{this.state.menu.map(truckMenu => console.log(truckMenu))}</View>
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
