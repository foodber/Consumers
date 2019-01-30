import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView
} from "react-native";
import { Constants } from "expo";
import db from '../db/fire'

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Place Order: ",
      cart: "",
      orders: []
    };
  }
  static navigationOptions = {
    title: "Homepage"
  };

  componentDidMount() {
	db.collection('trucks')
		.get()
		.then((querySnapshot) => {
			const trucks = [];
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				trucks.push(doc.data())
			});
			console.log('hey')
			this.setState({orders: trucks})
		});
	
	db.collection('trucks')
		.add({
			email: 'truck' * Math.floor(Math.random() * 99) + '@truckytruck.com',
			pass: ';lasdkfjn;lksadfn',
			name: 'truck' * Math.floor(Math.random() * 99),
			menu: [
				{
					name: 'Potato',
					price: 12.10
				}
			]
		})
  }

  render() {
	const trucks = this.state.orders || []
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.theHeader}>All Trucks</Text>
		<Text>Hey theHeader</Text>
        {trucks.map(truck => (
			<View>
				<Text>{truck.name}</Text>
				{truck.menu.map(item => <Text>Name: {item.name} at {item.price}</Text>)}
			</View>
		))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    //backgroundColor: '#f7b7332',
    marginTop: Constants.statusBarHeight
  },
  padding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7
  },
  ViewBox: {
    paddingLeft: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: "#f5f5f5"
  },
  FoodBox: {
    //textAlign: 'center',
    //alignSelf: 'flex-start',
    justifyContent: "flex-start",
    height: 75,
    fontSize: 22
  },
  theHeader: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize: 30,
    //color: 'rgba(96,100,109, 1)',
    color: "#dc143c"
    //lineHeight: 50,
    //textAlign: 'left',
  }
});
