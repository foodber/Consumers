import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import { fetchAllTrucks, setMenuForTruck } from "../store/trucksReducer";
import fire from "firebase";

const images = {
  0: require("../constants/images/image1.jpg"),
  1: require("../constants/images/image2.jpg"),
  2: require("../constants/images/image3.png"),
  3: require("../constants/images/image4.jpg"),
  4: require("../constants/images/image5.jpeg"),
  5: require("../constants/images/image6.jpg"),
  6: require("../constants/images/image7.jpeg"),
  7: require("../constants/images/image8.jpg"),
  8: require("../constants/images/image99.jpg"),
  9: require("../constants/images/image9.jpg")
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Nearby Trucks"
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
        <View>
          {allTrucks.map((truck, index) => {
            return (
              <View key={truck.email} style={styles.padding}>
                <TouchableOpacity
                  style={styles.ViewBox}
                  onPress={() => {
                    this.props.navigation.navigate("singleTruck", {
                      truckKey: truck.name
                    });
                    this.props.setMenuForTruck(truck.menu);
                  }}
                >
                  <Text style={styles.FoodBox}>{truck.name}</Text>
                  <Image style={styles.image} source={`${images[index]}`} />
                </TouchableOpacity>
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
    backgroundColor: "#ffc300"
  },
  padding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7
  },
  ViewBox: {
    flex: 1,
    borderWidth: 1,
    paddingBottom: 5,
    backgroundColor: "#be0c0c"
  },
  FoodBox: {
    color: "#FFFF",
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
    width: 347,
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
