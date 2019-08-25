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
import { getReceiptDataWithID, snapshotToArray } from '../Firebase'


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
    title: `Digiceipt`,
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    }
  }

  state = {
    receiptData: [],
    loaded: false, 
    pieData: []
  }

  componentWillMount() {
    getReceiptDataWithID('000001').on('value', snapshot => {
      this.setState({receiptData: snapshotToArray(snapshot).reverse(), loaded: true}, () => {
        this.compilePieData()
      })
    })
  }

  compilePieData() {
    let pd = categories

    pd.map(item => {
      item.amt = this.state.receiptData
        .filter(x => x.category.toLowerCase() == item.category.toLowerCase())
        .reduce((x,y) => x + parseFloat(y.amt), 0)
    })

    this.setState({pieData: pd}, () => console.log(this.state.pieData))
    
  }

  calculateTotal() {
    return this.state.receiptData.map(item => parseFloat(item.amt)).reduce((x, y) => x + y).toFixed(2)
  }

  createPie() {
    return this.state.pieData
    .filter(value => value.amt > 0)
    .map((value, index) => ({
      value: value.amt,
      svg: {
        fill: value.color
      },
      key: `pie-${index}`,
    }))
  }

  render() {
    return (

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>

        <View style={{ marginVertical: 16 }}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'normal', fontSize: 28, }}>Hi </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 28, }}>{faker.name.firstName()}!</Text>
          </View>

          <Text style={{ fontWeight: 'normal', fontSize: 16, opacity: 0.5 }}>Here's a summary of your expenses this week!</Text>


        </View>

        {
          this.state.loaded ? 
          <View style={{ marginVertical: 16 }}>

          <View style={{ flexDirection: 'row' }}>
            <PieChart
              style={{ height: 200, width: 200, marginVertical: 8 }}
              data={this.createPie()}
            />
            <View style={{ flex: 1, padding: 24, alignItems: 'flex-end'}}>
              <Text style={{ fontSize: 16, opacity: 0.5}}>Total Expenses</Text>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>${this.calculateTotal()}</Text>
            </View>

            
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.pieData.sort((x, y) => y.amt - x.amt).map((item, index) => (
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
        </View> : null
        }

        

        <View style={{ marginVertical: 16 }}>

          <View style={{ flexDirection: 'row', marginVertical: 16 }}>
            <Text style={{ fontWeight: 'normal', fontSize: 28, }}>Recent </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 28, }}>Expenses</Text>
          </View>

          <View>
            {this.state.loaded ? this.state.receiptData.filter((i, index) => index <3).map((item, index) => (
              <TouchableOpacity key={index} style={{ margin: 8, borderRadius: 16, elevation: 2, overflow: 'hidden', flexDirection: 'row' }} onPress={() => undefined}>
                <View style={{ flex: 1, backgroundColor: colors[item.category.toLowerCase()] }}></View>
                <Image source={{ uri: item.shopThumbnail }} style={{ width: 72, height: 72, resizeMode: 'cover' }}/>
                <View style={{ flex: 14, backgroundColor: '#fafafa', padding: 16, }}>
                  <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 2 }}>{item.shopName}</Text>
                    <Text style={{ fontSize: 16, flex: 1, textAlign: 'right' }}>${item.amt}</Text>
                  </View>

                  <Text style={{ fontSize: 12, opacity: 0.6 }}>{`${new Date(item.timestamp).getHours()%12}:${new Date(item.timestamp).getMinutes()} ${new Date(item.timestamp).getHours()/12 == 1 ? 'am': 'pm'}`}</Text>
                </View>
              </TouchableOpacity>
            )) : null}
            <Button title='View all' type='clear' containerStyle={{ marginVertical: 8 }} onPress={() => this.props.navigation.navigate('Receipts')} />
          </View>

        </View>


        <View style={{ marginVertical: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Deals you'll like</Text>

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

