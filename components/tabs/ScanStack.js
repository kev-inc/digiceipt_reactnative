import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { Text, View, StyleSheet, Dimensions, SectionList } from 'react-native';
import { Button, ListItem, Input } from 'react-native-elements'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { WebView } from 'react-native-webview'

import { BarCodeScanner } from 'expo-barcode-scanner';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }
  render() {

    const { navigation } = this.props
    const scanData = navigation.getParam('scanData', 'Error reading QR code')
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>

        <View style={{ flex: 1 }} >
          <WebView
            source={{ uri: scanData }}
            style={{ width: Dimensions.get('window').width }} />
        </View>

        <View style={{ flex: 1 }} >

          <View style={{ flex: 1 }}>
            <Input label='Merchant Name' />
            <Input keyboardType = 'numeric' label='Amount Paid ($)' />
          </View>



          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Button title='Cancel' type='clear' containerStyle={{ width: '50%' }} />
            <Button title='Save Receipt' containerStyle={{ width: '50%' }} />

          </View>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

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

