import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
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
      truckKey: ''
    };
  }
  componentDidMount() {
    let cart = this.props.navigation.state.params;
    const truckName = ''
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
    return (
      <View>
        <Text>Your Cart</Text>
        {this.state.cart && this.state.cart[0] && this.state.cart.map(item => {
          return (
            <View key={item.name}>
              <Text>Item : {item.name}</Text>
              <Text>Price : {item.price}</Text>
            </View>
          )
        })}
        <Button title='CHECKOUT' onPress={() => this.props.postOrder(this.state)} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postOrder: order => {
    dispatch(postOrder(order))
  }
})

export default connect(null, mapDispatchToProps)(Cart)
