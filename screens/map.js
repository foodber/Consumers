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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { fetchTruckLocation } from '../store/mapReducer';
import { truckLocation } from '../db/fire';

export default class MapTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

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
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );

    const coord = await truckLocation.get();
    coord.docs.map(doc => {
      console.log('*******************', doc.data());
    });

    console.log('WOO>>>>>>', coordData);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.latitude && this.state.longitude && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: { alignSelf: 'stretch', height: 450 },
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
