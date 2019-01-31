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
    };
  }
  componentDidMount() {
    let cart = this.props.navigation.getParam('cart', 'default');
    this.setState({
      cart: [...cart]
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        {this.state.cart && this.state.cart[0] && this.state.cart.map(item => {
          const [itemName, quantity] = Object.keys(item)
          return (
            <View key={itemName}>
              <Text>Item : {itemName}</Text>
              <Text>Price : {item[itemName]}</Text>
              <Text>Quantity : {item[quantity]}</Text>
            </View>
          )
        })}
        <Button title='CHECKOUT' onPress={() => this.props.postOrder(this.state.cart)} />
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
