import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }
  render() {

    const { navigation } = this.props
    const scanData = navigation.getParam('scanData', 'Error reading QR code')
    const source = { url: 'http://samples.leanpub.com/thereactnativebook-sample.pdf' }
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
       



      </View>
    );
  }


}

class ScanScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  }

  static navigationOptions = {
    title: 'Scanner'
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate('Details', {
      scanData: data
    })
  };

  render() {

    const { hasCameraPermission, scanned } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
  }
}

export default createStackNavigator({
  Scan: ScanScreen,
  Details: DetailsScreen
})

