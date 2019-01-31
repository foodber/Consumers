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
import { connect } from "react-redux";
import { fetchAllTrucks } from "../store/trucksReducer";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Homepage"
  };

  async componentDidMount() {
    await this.props.fetchAllTrucks();
    //this is going to ref our firebase JUST ONCE when component mounts
    //it is going to look under orders for all the children and we can access it through snapshot
    //snapshot.val() will return a object with the key as a random string and value as the orders
    //we set our orders state with the new array for values in foodTrucks
    // firebase
    //   .database()
    //   .ref()
    //   .child("trucks")
    //   .once("value", snapshot => {
    //     const data = snapshot.val();
    //     if (data) {
    //       const foodTrucks = [];
    //       //Object.keys(data).forEach(order => foodTrucks.push(data[order]));
    //       for (let key in data) {
    //         foodTrucks.push({ [key]: data[key].name });
    //       }
    //       this.setState({
    //         orders: [...foodTrucks]
    //       });
    //     }
    //   });
    //this is going to ref our firebase at orders and put a event listener on there
    //this will trigger everytime a child is added to our orders
    //if the value in the child being added is valid it will add it to our orders state
    //which will make our page re-render since state was updated
    // firebase
    //   .database()
    //   .ref()
    //   .child('orders')
    //   .on('child_added', snapshot => {
    //     const data = snapshot.val();
    //     console.log('on', data);
    //     if (data) {
    //       this.setState(prevState => ({
    //         orders: [...prevState.orders, data],
    //       }));
    //     }
    //   });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    const allTrucks = this.props.allTrucks || [];
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.theHeader}>All Trucks</Text>
        <View>
          {allTrucks.map(truck => {
            return (
              <View key={truck.name} style={styles.padding}>
                <View style={styles.ViewBox}>
                  <Text
                    style={styles.FoodBox}
                    onPress={() =>
                      this.props.navigation.navigate("singleTruck", {
                        truckKey: truck.name
                      })
                    }
                  >
                    {truck.name}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <Button color="#d63031" title="LOGOUT" onPress={this.logout} />
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

const mapStateToProps = state => ({
  allTrucks: state.allTrucks.allTrucks
});

const mapDispatchToProps = dispatch => ({
  fetchAllTrucks: () => {
    dispatch(fetchAllTrucks());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
