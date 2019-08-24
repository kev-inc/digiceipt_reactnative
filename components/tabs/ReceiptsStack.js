import React from 'react'
import { Text, View, Button, SectionList, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar, Avatar, ListItem } from 'react-native-elements'
import { getReceiptDataWithID, snapshotToArray } from '../Firebase'

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Receipt Details'
  }
  render() {
    const {navigation} = this.props
    const name = navigation.getParam('name', 'invalid')
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{name}</Text>
      </View>
    );
  }
}

class ReceiptScreen extends React.Component {

  state = {
    search : '',
    receiptData: [], 
    loaded: false
  }

  updateSearch = search => {
    this.setState({ search })
  }

  static navigationOptions = {
    title: 'Receipts'
  }

  componentDidMount() {
    getReceiptDataWithID('000001').once('value', snapshot => {
      this.setState({receiptData: snapshotToArray(snapshot).reverse(), loaded: true})
    })
  }

  categoriseByDate(array) {
    let catarr = {}
    array.map(x => {
      let d = new Date(x.timestamp).toDateString()
      let tmp
      if (!catarr.hasOwnProperty(d)) {
        tmp = []
      } else {
        tmp = catarr[d]
      }
      tmp.push(x)
      catarr[d] = tmp
    })
    console.log(catarr)

    let formatted = []
    Object.keys(catarr).forEach(key => {
      formatted.push({title: key, data: catarr[key]})
    })
    return formatted
  }

  

  render() {

    const {search} = this.state

    const sectionList = <SectionList
    sections={this.categoriseByDate(this.state.receiptData)}
    renderItem={({item}) => (
      <ListItem
        title={item.shopName}
        leftElement={() => <Avatar size='medium' rounded source={{uri: item.shopThumbnail}} overlayContainerStyle={{ backgroundColor: 'white', elevation: 2}}
        />}
        rightElement={() => <Text>${item.amt}</Text>}
        subtitle={`${new Date(item.timestamp).getHours()%12}:${new Date(item.timestamp).getMinutes()} ${new Date(item.timestamp).getHours()/12 == 1 ? 'am': 'pm'}`}
        onPress={() => this.props.navigation.navigate('Details', {
          name: item.shopName
        })}
        />
    )}
    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
    keyExtractor = {(item, index) => index}/>



    return (
      <View style={{ flex: 1}}>

      <SearchBar  
        placeholder='Search'
        onChangeText={this.updateSearch}
        value={search}
        platform='android' />

      {this.state.loaded ? sectionList : null}

    

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

export default createStackNavigator({
  Receipts: ReceiptScreen,
  Details: DetailsScreen
})

