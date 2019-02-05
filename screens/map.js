import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { fetchTruckLocation } from '../store/mapReducer';
import { truckLocation } from '../db/fire';

export default class MapTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: [],
    };
  }

  static navigationOptions = {
    title: 'Nearby Trucks',
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 100000, maximumAge: 0 }
    );

    const coord = await truckLocation.get();
    //console.log('HHHHHHHHH', coord.docs);
    const finalArr = [];
    coord.docs.map(doc => {
      const location = doc.data();
      // console.log('*******************', doc.data());
      finalArr.push(location.location);
    });
    this.setState({
      markers: finalArr,
    });
  }

  render() {
    const latLong = this.state.markers || [];
    console.log('asdfasdfasdfasdf', latLong);
    return (
      <View style={styles.container}>
        {this.state.latitude && this.state.longitude && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              longitudeDelta: 0.00299,
              latitudeDelta: 0.00299,
            }}
          >
            {latLong.map(coordinates => {
              return (
                <MapView.Marker
                  key={coordinates.Lat}
                  coordinate={{
                    longitude: coordinates.Long,
                    latitude: coordinates.Lat,
                  }}
                />
              );
            })}
            {/* <MapView.Circle
              radius={200}
              //strokeColor="transparent"
              center={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
            /> */}
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

// const mapStateToProps = state => ({
//   truckLocation: state.truckLocation.truckLocation,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchTruckLocation: () => {
//     dispatch(fetchTruckLocation());
//   },
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MapTab);

// {/* <MapView.Marker
//   coordinate={{
//     longitude: -74.44363748958308,
//     latitude: 40.49420049978771,
//   }}
// />
// <MapView.Marker
//   coordinate={{
//     longitude: -74.44353748958998,
//     latitude: 40.49450049978771,
//   }}
// />
// <MapView.Marker
//   coordinate={{
//     longitude: -74.44353748958308,
//     latitude: 40.49440049978771,
//   }}
// /> */}
