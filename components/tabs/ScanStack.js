import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Button, Avatar } from 'react-native-elements'
import * as Permissions from 'expo-permissions';

import { WebView } from 'react-native-webview'

import { BarCodeScanner } from 'expo-barcode-scanner';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Add this receipt?', 
    headerLeft: null
  }
  render() {

    const sampleScanData = {
      pdf: 'https://github.com/kev-inc/digiceipt_reactnative/raw/master/assets/receipt31.pdf',
      amt: 24.39,
      shopName: 'Lazada',
      shopThumbnail: 'https://laz-img-cdn.alicdn.com/tfs/TB15BYfh4rI8KJjy0FpXXb5hVXa-200-200.png'
    }

    const { navigation } = this.props
    const scanData = JSON.parse(navigation.getParam('scanData', 'Error reading QR code'))
    // const scanData = sampleScanData
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
            <Button title='Cancel' type='clear' containerStyle={{ width: '50%' }} onPress={() => this.props.navigation.goBack()} />
            <Button title='Save Receipt' containerStyle={{ width: '50%' }} onPress={() => this.props.navigation.navigate('ReceiptAdded')} />
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
    title: 'Scan new receipt'
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

class ReceiptAddedScreen extends React.Component {

  static navigationOptions = {
    title: 'Receipt added', 
    headerLeft: null
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Receipt added!</Text>
        <Image source={require('../../assets/tick.gif')} style={{ width: 120, height: 120, margin: 16 }} />
        <Text>Your receipt from Grab has been added!</Text>
        <Button title='Back to Main' type='clear' style={{ margin: 24 }} onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    )
  }
}

export default createStackNavigator({
  Scan: ScanScreen,
  Details: DetailsScreen,
  ReceiptAdded: ReceiptAddedScreen
})

