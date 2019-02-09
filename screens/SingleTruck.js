import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import { Constants } from "expo";
import { fetchTruckMenu } from "../store/trucksReducer";
import { connect } from "react-redux";

class SingleTruck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      truckName: "",
      quantity: 0
    };
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  static navigationOptions = {
    title: "Truck",
    style: {
      backgroundColor: "blue"
    }
  };

  async componentDidMount() {
    const truckKey = this.props.navigation.getParam(
      "truckKey",
      "Not Available"
    );
    await this.props.fetchTruckMenu(truckKey);
  }

  increaseQuantity() {
    this.setState({ quantity: this.state.quantity + 1 });
  }
  decreaseQuantity() {
    if (this.state.quantity === 0) {
      this.setState({ quantity: 0 });
    } else {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }

  render() {
    const menu = this.props.menu || [];
    const truckKey = this.props.navigation.getParam(
      "truckKey",
      "Not Available"
    );
    return (
      <View style={styles.container}>
        <Text style={styles.theHeader}>{`${truckKey}'s Menu`}</Text>
        {menu.map((menuItem, index) => {
          return (
            <View key={index} style={styles.menuItemContainer}>
              <View style={styles.menuItem}>
                <Text>Item: {menuItem.name}</Text>
                <Text>Price: {menuItem.price}</Text>
              </View>
              <View />
              <View>
                <Button
                  title="Add To Cart"
                  style={styles.button}
                  onPress={() => {
                    const cart = this.state.cart;
                    if (this.state.quantity < 1) {
                      alert("Please increase quantity");
                    } else if (cart.length === 0) {
                      this.setState({
                        cart: [
                          {
                            name: menuItem.name,
                            price: menuItem.price,
                            quantity: this.state.quantity,
                            truckName: truckKey
                          }
                        ],
                        quantity: 0
                      });
                    } else {
                      let checkerArr = [];
                      cart.map(cartObj => {
                        checkerArr.push(cartObj.name);
                      });
                      if (!checkerArr.includes(menuItem.name)) {
                        this.setState({
                          cart: [
                            ...cart,
                            {
                              name: menuItem.name,
                              price: menuItem.price,
                              quantity: this.state.quantity,
                              truckName: truckKey
                            }
                          ],
                          quantity: 0
                        });
                      }
                    }
                  }}
                />
              </View>
            </View>
          );
        })}
        <View>
          <Text>Quantity Of Item: </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 50 }}>
              <Button
                title="-"
                style={styles.button}
                onPress={this.decreaseQuantity}
              />
            </View>
            <View style={styles.quantityBox}>
              <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Text style={{ fontSize: 30 }}>{this.state.quantity}</Text>
              </View>
              <View style={{ width: 50 }}>
                <Button
                  title="+"
                  buttonStyle={styles.button}
                  onPress={this.increaseQuantity}
                />
              </View>
            </View>
          </View>
          <Button
            color="#00cec9"
            title="Proceed To Checkout"
            onPress={() => {
              this.props.navigation.navigate("Cart", {
                cart: this.state.cart,
                truckKey: this.state.truckName
              });
              this.setState({
                cart: []
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  theHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10
  },
  menuItemContainer: {
    flexDirection: "row",
    paddingBottom: 15,
    justifyContent: "center"
  },
  menuItem: {
    paddingRight: 30
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#74b9ff"
  },
  quantityBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch"
  }
});

const mapStateToProps = state => ({
  menu: state.allTrucks.menu
});

export default connect(mapStateToProps)(SingleTruck);
