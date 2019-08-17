import React from 'react'
import { View, Button, Dimensions, Image, ScrollView } from 'react-native';
import { Text, Tile, Card } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { VictoryLine, VictoryGroup } from "victory-native";



class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Digiceipt'
  }

  render() {

    var data = [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 6 },
      { x: 6, y: 6 }
    ]

    return (

      <ScrollView style={{ flex: 1 }}>

        <View style={{ padding: 16 }}>
          <Text h3>Welcome back,</Text>
          <Text h4>John</Text>
        </View>

        {/* <Card style={{alignItems: 'center'}}>
          <VictoryGroup>
            <VictoryLine interpolation="natural"
              data={data}
              labels={(datum) => datum.x == 5 ? `$${datum.y}` : ``}
            />
          </VictoryGroup>
        </Card> */}

        <Tile containerStyle={{padding:16, height: 240, }}
          imageSrc={{ uri: 'https://storage.googleapis.com/carousell-wordpress-files/1/2019/02/carousell-autos-home-screen-cars-for-sale-singapore.png' }}
          activeOpacity={0.75}
        />

        

        <Tile containerStyle={{padding:16, height: 240}}
          imageSrc={{ uri: 'http://cdn.gsmarena.com/imgroot/news/16/09/ads-appstore/-728x314/gsmarena_001.jpg' }}
          activeOpacity={0.75}
        />

        <Tile containerStyle={{padding:16, height: 240}}
          imageSrc={{ uri: 'https://s3-ap-southeast-1.amazonaws.com/s3.loopme.my/img/newos/posts/d/5498_WhC8zguYvfxHBwcu_.jpg' }}
          activeOpacity={0.75}
        />




        {/* <Button
          title="Go to Home Details"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}
      </ScrollView>
    );
  }
}

export default createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
})

