import React from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import * as firebase from "firebase";
import { Constants } from "expo";
import {fetchTruckMenu} from '../store/trucksReducer'
import {connect} from 'react-redux'

class SingleTruck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }
  
  static navigationOptions = {
    title: 'Truck',
    style: {
      backgroundColor: "blue"
    }
  };
  async componentDidMount() {
    const truckKey = this.props.navigation.getParam(
      "truckKey",
      "Not Available"
    );
      await this.props.fetchTruckMenu(truckKey)
    
    // const truckMenu = firebase
    //   .database()
    //   .ref()
    //   .child("truckMenus")
    //   .child(truckKey)
    //   .on("value", snapShot => {
    //     const data = snapShot.val();
    //     const arr = [];
    //     if (data) {
    //       for (let key in data) {
    //         arr.push({ [key]: data[key] });
    //       }
    //     }
    //     this.setState({menu: [...arr] });
    //   });
  }

  render() {
    const menu = this.props.menu || []
    const value = Object.keys(menu)
    return (
      <View style={styles.container}>
      <Text>{this.props.navigation.getParam(
        "truckKey",
        "Not Available"
      )}
      </Text>
      <Text>Menu</Text>
        {value.map(item => {
            return (
              <View key={item}>
                <Text>Item : {item}</Text>
                <Text>Price : {menu[item]}</Text>
                <Button
                  title="Add To Cart"
                  onPress={() => {
                    this.setState({
                      cart: [
                        ...this.state.cart,
                        { [item]: menu[item] }
                      ]
                    });
                  }}
                />
              </View>
            );
          })}
        <Button
          color="red"
          title="Proceed To Checkout"
          onPress={() => {
            this.props.navigation.navigate("Cart", {
              cart: this.state.cart
            });
          }}
        />
        {/* {this.state.cart &&
          this.state.cart[0] &&
          this.state.cart.map(item => {
            const [itemName] = Object.keys(item);
            return (
              <View key={itemName}>
                <Text>Item : {itemName}</Text>
                <Text>Price : {item[itemName]}</Text>
              </View>
            );
          })} */}
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

const mapStateToprops = state => ({
  menu: state.menu.menu
})

const mapDispatchToProps = dispatch => ({
  fetchTruckMenu: (key) => {
    dispatch(fetchTruckMenu(key))
  }
})

export default connect(mapStateToprops, mapDispatchToProps)(SingleTruck)