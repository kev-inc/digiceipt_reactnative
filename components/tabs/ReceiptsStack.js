import React from 'react'
import { Text, View, Button, SectionList, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SearchBar, Avatar, ListItem } from 'react-native-elements'

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
    search : ''
  }

  updateSearch = search => {
    this.setState({ search })
  }

  static navigationOptions = {
    title: 'Receipts'
  }

  render() {

    const {search} = this.state

    return (
      <View style={{ flex: 1}}>

      <SearchBar  
        placeholder='Search'
        onChangeText={this.updateSearch}
        value={search}
        platform='android' />

      <SectionList
        sections={[
          {title: '24 May 2019', data:['Zara', 'Uniqlo']},
          {title: '22 May 2019', data:['NTUC', 'Lazada', 'Forever 21', 'Food Republic']},
          {title: '21 May 2019', data:['Astons', 'Dockers', 'Marks and Spencers', 'Shake Shack', 'Sakae Sushi']},
        ]}
        renderItem={({item}) => (
          <ListItem
            title={item}
            leftElement={() => <Avatar size='medium' rounded title={item.charAt(0)}/>}
            onPress={() => this.props.navigation.navigate('Details', {
              name: item
            })}
            />
        )}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor = {(item, index) => index}/>

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

