import React from 'react'
import { Text, View, Dimensions, SectionList, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar, Avatar, ListItem, Button, Overlay } from 'react-native-elements'
import { WebView } from 'react-native-webview'
import { getReceiptDataWithID, snapshotToArray, deleteReceiptDataWithID } from '../Firebase'
import { colors } from '../../assets/sampledata/samplecolors'


class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Receipt Details',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
    headerTintColor: colors.headerTitleColor
  }

  state = {
    visible: false
  }

  toggleConfirmationDialog = () => {
    let visible = this.state.visible
    this.setState({visible: !visible})
  }

  deleteReceipt(receiptID) {
    deleteReceiptDataWithID('000001', receiptID).then(() => {
      this.toggleConfirmationDialog()
      this.props.navigation.navigate('Receipts')
    })
  }
  render() {
    const {navigation} = this.props
    const item = navigation.getParam('item', 'invalid')
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleConfirmationDialog} height='auto'>
          <View style={{justifyContent: 'center', paddingHorizontal: 8}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingVertical: 8}}>Confirm delete receipt?</Text>
            <Text style={{paddingVertical: 8}}>Once you delete, you will not be able to retrieve it back anymore.</Text>
            <View style={{flexDirection: 'row', paddingVertical: 8}}>
              <Button title="Cancel" type='clear' containerStyle={{width: '50%'}} onPress={this.toggleConfirmationDialog}/>
              <Button title="Delete" buttonStyle={{backgroundColor: 'red'}} containerStyle={{width: '50%'}} onPress={() => this.deleteReceipt(item.key)}/>
            </View>
          </View>
          
        </Overlay>

        <View style={{ flex: 2 }} >
          <WebView
            source={{ uri: 'https://docs.google.com/gview?embedded=true&url=' + item.pdf }}
            style={{ width: Dimensions.get('window').width }} />
        </View>

        <View style={{ width: Dimensions.get('window').width, height: 160, padding: 8 }}>
          <Button title="Delete" icon={{ name: 'delete', size:15, color:'white'}} buttonStyle={{backgroundColor: 'red'}} onPress={this.toggleConfirmationDialog}/>
        </View>
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
    title: 'Receipts',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    }
  }

  componentDidMount() {
    getReceiptDataWithID('000001').on('value', snapshot => {
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
          item: item
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

