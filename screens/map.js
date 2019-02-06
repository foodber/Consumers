import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { db } from '../db/fire';

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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 100000, maximumAge: 500 }
    );

    db.collection('truckLocation')
      .where('state', '==', 'NY')
      .onSnapshot(
        function(querySnapShot) {
          let arr = [];
          querySnapShot.forEach(function(doc) {
            arr.push(doc.data().location);
          });
          this.setState({
            markers: arr,
          });
        }.bind(this)
      );
  }

  render() {
    const latLong = this.state.markers;
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
                  key={coordinates}
                  coordinate={{
                    longitude: coordinates.Long,
                    latitude: coordinates.Lat,
                  }}
                />
              );
            })}
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
