import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import { Constants } from 'expo';
import { fetchTruckMenu } from '../store/trucksReducer';
import { connect } from 'react-redux';

class SingleTruck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      truckName: '',
    };
    // this.cartChecker = this.cartChecker.bind(this)
  }

  static navigationOptions = {
    title: 'Truck',
    style: {
      backgroundColor: 'blue',
    },
  };

  async componentDidMount() {
    const truckKey = this.props.navigation.getParam(
      'truckKey',
      'Not Available'
    );
    await this.props.fetchTruckMenu(truckKey);
  }
  
  render() {
    const menu = this.props.menu || [];
    const truckKey = this.props.navigation.getParam(
      'truckKey',
      'Not Available'
      );
      return (
        <View style={styles.container}>
        <Text>{truckKey}</Text>
        <Text>Menu</Text>
        {menu.map((menuItem, index) => {
          return (
            <View key={index}>
              <Text>Item: {menuItem.name}</Text>
              <Text>Price: {menuItem.price}</Text>
              <Button title="Add To Cart" onPress={() => {
                const cart = this.state.cart
                if (cart.length === 0) {
                  this.setState({
                    cart: [menuItem]
                  })
                } else {
                  let checkerArr = []
                  cart.map(cartObj => {
                    checkerArr.push(cartObj.name)
                  })
                  if (!checkerArr.includes(menuItem.name)) {
                    this.setState({
                      cart: [...cart, menuItem]
                    })
                  }
                }
              }} />
            </View>
          );
        })}
        <Button
          color="red"
          title="Proceed To Checkout"
          onPress={() => {
            this.props.navigation.navigate('Cart', {
              cart: this.state.cart,
              truckKey: this.state.truckName,
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
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  isItWorking: {
    fontSize: 24,
  },
  theHeader: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
});

const mapStateToProps = state => ({
  menu: state.allTrucks.menu,
});

// const mapDispatchToProps = dispatch => ({
//   setTruckMenu: (key) => {
//     dispatch(setTruckMenu(key))
//   }
// })

export default connect(mapStateToProps)(SingleTruck);
