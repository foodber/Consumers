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
      quantity: 1
    };
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
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
  }
  increaseQuantity() {
    this.setState({quantity: this.state.quantity + 1})
  }

  decreaseQuantity() {
    if (this.state.quantity === 1) {
      this.setState({quantity: 1})
    } else {
      this.setState({quantity: this.state.quantity - 1})
    }
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
                <Text>Quantity : {this.state.quantity}</Text>
                <Button title="+" onPress={this.increaseQuantity} />
                <Button title="-" onPress={this.decreaseQuantity} />
                <Button
                  title="Add To Cart"
                  onPress={() => {
                    this.setState({
                      cart: [
                        ...this.state.cart,
                        { [item]: menu[item],
                          quantity: this.state.quantity
                        }
                      ],
                      quantity: 1,
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