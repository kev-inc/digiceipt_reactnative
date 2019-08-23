import React from 'react'
import { View, SectionList, Dimensions, Image, ImageBackground, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text, Card, ListItem, Button } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { PieChart } from 'react-native-svg-charts'
import faker from 'faker'
import { LinearGradient } from 'expo-linear-gradient';
import { ads } from '../../assets/sampledata/sampleads'
import { colors } from '../../assets/sampledata/samplecolors'
import { categories } from '../../assets/sampledata/samplepiechart'


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
    title: `Digiceipt`
  }

  render() {

    const recent = [{
      amt: 12.34,
      img: 'http://bq.sg/wp-content/uploads/2017/01/292611_10150633680856409_1734062773_n.jpg',
      name: 'NTUC',
      color: colors.groceries
    }, {
      amt: 95.32,
      img: 'https://blog.iuiga.com/wp-content/uploads/2018/10/Singtel-Logo.jpg',
      name: 'Singtel',
      color: colors.leisure
    }, {
      amt: 124.53,
      img: 'https://i.pinimg.com/originals/40/fa/4d/40fa4da285df398dedff38c1c34bb113.jpg',
      name: 'Tommy Hilfiger',
      color: colors.shopping
    }]

    const totalSpend = categories.map(item => item.amt).reduce((x, y) => x + y)

    const pieData = categories
      .filter(value => value.amt > 0)
      .map((value, index) => ({
        value: value.amt,
        svg: {
          fill: value.color
        },
        key: `pie-${index}`,
      }))


    return (

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>

        <View style={{ marginVertical: 16 }}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'normal', fontSize: 28, }}>Hi </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 28, }}>{faker.name.firstName()}!</Text>
          </View>

          <Text style={{ fontWeight: 'normal', fontSize: 16, opacity: 0.5 }}>Here's a summary of your expenses this week!</Text>


        </View>

        <View style={{ marginVertical: 16 }}>

          <PieChart
            style={{ height: 200, marginVertical: 8 }}
            data={pieData}
          />
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            marginVertical: 8,
            position: 'absolute',
            width: Dimensions.get('window').width - 32,
            height: 200,
            fontWeight: 'bold',
            opacity: 0.5,
            fontSize: 20
          }}>${totalSpend}</Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} style={{ margin: 8, borderRadius: 16, elevation: 2, overflow: 'hidden' }} onPress={() => undefined}>
                <ImageBackground source={{ uri: item.img }} style={{ flexDirection: 'row', width: 160, height: 96, borderBottomColor: item.color }}>
                  <View style={{ flex: 1, backgroundColor: item.color }}></View>
                  <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.category}</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>${item.amt}</Text>
                  </View>
                  <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></View>
                </ImageBackground>
              </TouchableOpacity>

            ))}
          </ScrollView>
        </View>

        <View style={{ marginVertical: 16 }}>

          <View style={{ flexDirection: 'row', marginVertical: 16 }}>
            <Text style={{ fontWeight: 'normal', fontSize: 28, }}>Recent </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 28, }}>Expenses</Text>
          </View>

          <View>
            {recent.map((item, index) => (
              <TouchableOpacity key={index} style={{ margin: 8, borderRadius: 16, elevation: 2, overflow: 'hidden', flexDirection: 'row' }} onPress={() => undefined}>
                <View style={{ flex: 1, backgroundColor: item.color }}></View>

                <Image source={{ uri: item.img }} style={{ width: 96, height: 96 }} />
                <View style={{ flex: 14, backgroundColor: '#fafafa', padding: 16, }}>
                  <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{item.name}</Text>
                    <Text style={{ fontSize: 16, flex: 1, textAlign: 'right' }}>${item.amt}</Text>
                  </View>

                  <Text style={{ fontSize: 12, opacity: 0.6 }}>Paid 2 days ago at 11:17am</Text>
                </View>
              </TouchableOpacity>
            ))}
            <Button title='View all' type='clear' containerStyle={{marginVertical: 8}} onPress={() => this.props.navigation.navigate('Receipts')}/>
          </View>

        </View>


        <View style={{ marginVertical: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 28}}>Deals you'll like</Text>

          {ads.map((item, index) => (
            <TouchableOpacity key={index} style={{ borderRadius: 16, marginVertical: 8 }} onPress={() => Linking.openURL(item.link)}>
              <Image style={{ width: Dimensions.get('window').width - 32, height: 120, borderRadius: 16 }}
                source={{ uri: item.img }} />
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
    );
  }
}

export default createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
})

