import React from 'react'
import { View, Button, SectionList, StyleSheet } from 'react-native';
import { Text, Avatar, ListItem } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }
  render() {
    const {navigation} = this.props
    const page = navigation.getParam('name', 'invalid')
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{page}</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'My Profile'
  }

  render() {
    return (
      <View style={{ flex: 1}}>

        <View style={{ height: 144, flexDirection: 'row', alignItems: 'center', padding: 16 }} >
          <Avatar rounded source={require('../../assets/america.jpg')} size='large' />
          <Text h3 style={{ padding: 16 }}>Steve Rogers</Text>
        </View>

          
        
        <SectionList
        sections={[
          {title: 'Settings', data:['My Account', 'Preferences', 'Help']},
          {title: 'Sign out', data:['Sign out']},
        ]}
        renderItem={({item}) => (
          <ListItem
            title={item}
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
  Profile: ProfileScreen,
  Details: DetailsScreen
})

