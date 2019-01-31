import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { fetchAllTrucks, setMenuForTruck } from '../store/trucksReducer';
import fire from 'firebase';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Homepage',
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
              <View key={truck.name} style={styles.padding}>
                <View style={styles.ViewBox}>
                  <Text
                    style={styles.FoodBox}
                    onPress={() => {
                      this.props.navigation.navigate('singleTruck', {
                        truckKey: truck.name,
                      });
                      this.props.setMenuForTruck(truck.menu);
                    }}
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
    marginTop: Constants.statusBarHeight,
  },
  padding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7,
  },
  ViewBox: {
    paddingLeft: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: '#f5f5f5',
  },
  FoodBox: {
    //textAlign: 'center',
    //alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    height: 75,
    fontSize: 22,
  },
  theHeader: {
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 30,
    //color: 'rgba(96,100,109, 1)',
    color: '#dc143c',
    //lineHeight: 50,
    //textAlign: 'left',
  },
});

const mapStateToProps = state => ({
  allTrucks: state.allTrucks.allTrucks,
});

const mapDispatchToProps = dispatch => ({
  fetchAllTrucks: () => {
    dispatch(fetchAllTrucks());
  },
  setMenuForTruck: menu => {
    dispatch(setMenuForTruck(menu));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
