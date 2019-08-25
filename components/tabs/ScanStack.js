import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Button, Avatar } from 'react-native-elements'
import * as Permissions from 'expo-permissions';
import { colors } from '../../assets/sampledata/samplecolors'
import { WebView } from 'react-native-webview'

import { BarCodeScanner } from 'expo-barcode-scanner';

import { addReceiptToID } from '../Firebase'

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Add this receipt?',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
  }

  sendDataToFirebase(receiptData, userID) {
    addReceiptToID(receiptData, userID).then(() => {
      this.props.navigation.replace('ReceiptAdded')
    })
  }

  render() {

    const { navigation } = this.props
    const scanData = JSON.parse(navigation.getParam('scanData', 'Error reading QR code'))
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>

        <View style={{ flex: 2 }} >
          <WebView
            source={{ uri: 'https://docs.google.com/gview?embedded=true&url=' + scanData.pdf }}
            style={{ width: Dimensions.get('window').width }} />
        </View>


        <View style={{ width: Dimensions.get('window').width, height: 160 }}>

          <View style={{ margin: 16, flexDirection:'row', flex: 1, alignItems:'center'}}>
            <Avatar rounded size='large'
              overlayContainerStyle={{ backgroundColor: 'white', elevation: 2, margin: 8 }}
              source={{ uri: scanData.shopThumbnail }} />
            <Text style={{ fontWeight: 'bold', fontSize: 20, }}>{scanData.shopName}</Text>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
              <Text style={{ opacity: 0.4, fontSize: 12, fontWeight: 'bold' }}>AMOUNT PAID</Text>
              <Text style={{ fontSize: 24, }}>${scanData.amt}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', padding: 16 }}>
            <Button title='Cancel' type='clear' containerStyle={{ width: '50%' }} onPress={() => this.props.navigation.replace('Scan')} />
            <Button title='Save Receipt' containerStyle={{ width: '50%' }} onPress={() => this.sendDataToFirebase(scanData, '000001')} />
          </View>

        </View>

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
    title: 'Scan new receipt',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.replace('Details', {
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

class ReceiptAddedScreen extends React.Component {

  static navigationOptions = {
    title: 'Receipt added',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Receipt added!</Text>
        <Image source={require('../../assets/tick.gif')} style={{ width: 120, height: 120, margin: 16 }} />
        <Text>Your receipt from Grab has been added!</Text>
        <Button title='Back to Scan' type='clear' style={{ margin: 24 }} onPress={() => this.props.navigation.replace('Scan')} />
      </View>
    )
  }
}

export default createStackNavigator({
  Scan: ScanScreen,
  Details: DetailsScreen,
  ReceiptAdded: ReceiptAddedScreen
})

