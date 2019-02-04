import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import {connect} from 'react-redux'
import { postOrder } from '../store/trucksReducer'

class Cart extends React.Component {
  static navigationOptions = {
    title: 'Cart',
  };
  constructor() {
    super();
    this.state = {
      cart: [],
      truckKey: '',
    };
  }

  componentDidMount() {
    let cart = this.props.navigation.state.params;
    const newObj = []
    cart.cart.map(obj => {
      newObj.push(obj)
    })
    if (newObj && newObj[0]) {
      this.setState({
        cart: [...newObj],
        truckKey: newObj[0].truckName
      })
  }
}

render() {
    const cart = this.state.cart
    return (
      <View>
        <Text>Your Cart</Text>
        {cart && cart[0] && cart.map(item => {
          return (
            <View key={item.name}>
              <Text>Item : {item.name}</Text>
              <Text>Price : {item.price}</Text>
              <Text>Quantity : {item.quantity}</Text>
              <Button title="REMOVE FROM CART" onPress={() => {
                this.setState({
                  cart: cart.filter(cartItem => {
                   return cartItem.name !== item.name
                  })
                })
              }} />
            </View>
          )
        })}
        <Button title='CHECKOUT' onPress={() => {
          if (cart.length !== 0) {
            this.props.postOrder(this.state)
            this.setState({
              cart: []
            })
          } else {
            alert("YOUR CART IS EMPTY")
          }
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewBox: {
    paddingLeft: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: '#f5f5f5',
  },
})

const mapDispatchToProps = dispatch => ({
  postOrder: order => {
    dispatch(postOrder(order))
  }
})

export default connect(null, mapDispatchToProps)(Cart)
