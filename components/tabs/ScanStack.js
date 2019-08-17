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

    var sample = {
      shopname: 'Poulet',
      outlet: 'Raffles City',
      address: {
        line_1: '252 North Bridge Road',
        line_2: '#B1-65/66',
        line_3: 'RAFFLESCITY SHOPPING CENTRE',
        postal: 'S179103'
      },
      gst: '200304429-R',
      tel: '63363119',
      fax: '63361176',
      dateofpurchase: '26/01/2019 20:28',
      table: '6', pax: '2',
      items: [
        {id: '1', qty: '1', item: 'Chicken Carbonara', amount: 13.90},
        {id: '2', qty: '1', item: 'Half Roast Chicken wit', amount: 16.90},
        {id: '3', qty: '1', item: 'French Onion Soup', amount: 5.90}
      ]
    }

    const {navigation} = this.props
    const scanData = navigation.getParam('scanData', 'Error reading QR code')
    // const JSONdata = JSON.parse(scanData)
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>

        <View style={{flex: 1, alignItems: 'center', 
          shadowColor: '#000', shadowOffset:{width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
          <Text>{sample.shopname.toUpperCase()}</Text>
          <Text>{sample.outlet.toUpperCase()}</Text>
          <Text>{sample.address.line_1}</Text>
          <Text>{sample.address.line_2}</Text>
          <Text>{sample.address.line_3}</Text>
          <Text>{sample.address.postal}</Text>
          <Text>GST REG NO: {sample.address.gst}</Text>
          <Text>Tel: {sample.tel} Fax: {sample.fax}</Text>
          <Text>{sample.dateofpurchase}</Text>
          <Text>===</Text>
          <View style={{alignItems: 'flex-start'}}>
            {sample.items.map((item, index) => <Text key ={index}>{item.qty}x {item.item} {item.amount}</Text>)}

          </View>
            
        </View>


        {/* <Text>{JSONdata.receipt.shopname}</Text>
        {JSONdata.receipt.items.map((item, index) => (
          <Text key={index}>{item.qty}x {item.itemname} @ ${item.amount}</Text>
        ))} */}
        
        
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

