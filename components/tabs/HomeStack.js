import React from 'react'
import { View, SectionList, Dimensions, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { PieChart } from 'react-native-svg-charts'
import faker from 'faker'
import { LinearGradient } from 'expo-linear-gradient';


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
    title: `Hello, ${faker.name.firstName()}`
  }

  render() {

    const categories = [{
      category: 'Groceries', img: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', amt: 68.27, color: '#24d654'
    }, {
      category: 'Leisure', img: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80', amt: 24.34, color: '#fa2a4d'
    }, {
      category: 'School', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80', amt: 13.24, color: '#facd2a'
    }, {
      category: 'Shopping', img: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1071&q=80', amt: 87.32, color: '#2ac1f7'
    }]

    const recent = [{
      amt: 12.34, 
      img: 'http://bq.sg/wp-content/uploads/2017/01/292611_10150633680856409_1734062773_n.jpg',
      name: 'NTUC'
    },{
      amt: 12.34, 
      img: 'http://bq.sg/wp-content/uploads/2017/01/292611_10150633680856409_1734062773_n.jpg',
      name: 'NTUC'
    },{
      amt: 12.34, 
      img: 'http://bq.sg/wp-content/uploads/2017/01/292611_10150633680856409_1734062773_n.jpg',
      name: 'NTUC'
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


    const ads = [
      'https://laz-img-cdn.alicdn.com/images/ims-web/TB1bSgUdAL0gK0jSZFxXXXWHVXa.jpg_1200x1200.jpg',
      'https://laz-img-cdn.alicdn.com/images/ims-web/TB1shIWdAT2gK0jSZFkXXcIQFXa.jpg_2200x2200Q100.jpg_.webp',
      'https://laz-img-cdn.alicdn.com/images/ims-web/TB14RkRduT2gK0jSZFvXXXnFXXa.jpg_2200x2200Q100.jpg_.webp',
      'https://dp.image-gmkt.com/dp2016/SG/GMKT.IMG/premium/2019/08/13/16/57ced720-df17-41bb-ae24-7ca2cef83c25.jpg',
      'https://dp.image-gmkt.com/dp2016/SG/GMKT.IMG/special/2019/07/18/96f56fa7-7e62-4324-84ce-93a24f5601ff.jpg',
      'https://dp.image-gmkt.com/dp2016/SG/GMKT.IMG/mall/2019/08/20/10/87fe5b02-141a-4848-8851-e4a0471afc77.jpg',
      'https://dp.image-gmkt.com/dp2016/SG/GMKT.IMG/mall/2019/08/16/20/f8d69d60-ec35-42ef-ac1b-8c7f2c231bdf.jpg'
    ]

    return (

      <ScrollView style={{ flex: 1, padding: 16 }}>

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
            fontSize: 16
          }}>${totalSpend}</Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} style={{ margin: 8, borderRadius: 16, elevation: 2, overflow: 'hidden' }} onPress={() => undefined}>
                <ImageBackground source={{ uri: item.img }} style={{ width: 160, height: 96 }}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.category}</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>${item.amt}</Text>
                  </View>

                </ImageBackground>
              </TouchableOpacity>

            ))}
          </ScrollView>
        </View>

        <View style={{ marginVertical: 16 }}>
          <Text h4>Recent Expenses</Text>
          
        </View>

        <View style={{ marginVertical: 16 }}>
          <Text h4>Deals you'll like</Text>

          {ads.map((item, index) => (
            <TouchableOpacity key={index} style={{ borderRadius: 16, marginVertical: 8 }} onPress={() => undefined}>
              <Image style={{ width: Dimensions.get('window').width - 32, height: 120, borderRadius: 16 }}
                source={{ uri: item }} />
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

