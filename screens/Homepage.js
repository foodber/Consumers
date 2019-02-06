import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Image
} from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import { fetchAllTrucks, setMenuForTruck } from "../store/trucksReducer";
import fire from "firebase";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Homepage"
  };

  async componentDidMount() {
    await this.props.fetchAllTrucks();
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
              <View key={truck.email} style={styles.padding}>
                <View style={styles.ViewBox}>
                  <Text
                    style={styles.FoodBox}
                    onPress={() => {
                      this.props.navigation.navigate("singleTruck", {
                        truckKey: truck.name
                      });
                      this.props.setMenuForTruck(truck.menu);
                    }}
                  >
                    {truck.name}
                  </Text>
                  <Image
                    style={styles.image}
                    source={require(`../constants/images/userone@gmail.com.jpg`)}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <Button color="#e17055" title="LOGOUT" onPress={this.logout} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d63031"
  },
  padding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7
  },
  ViewBox: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  FoodBox: {
    justifyContent: "flex-start",
    textAlign: "center",
    height: 75,
    fontSize: 40,
    paddingTop: 5
  },
  theHeader: {
    flex: 1,
    justifyContent: "flex-start",
    textAlign: "center",
    fontSize: 30,
    color: "#fab1a0"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: 350,
    height: 200
  }
});

const mapStateToProps = state => ({
  allTrucks: state.allTrucks.allTrucks
});

const mapDispatchToProps = dispatch => ({
  fetchAllTrucks: () => {
    dispatch(fetchAllTrucks());
  },
  setMenuForTruck: menu => {
    dispatch(setMenuForTruck(menu));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
