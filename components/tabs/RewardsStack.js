import React from 'react'
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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

class RewardScreen extends React.Component {
  static navigationOptions = {
    title: 'Rewards'
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Go to Reward Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

export default createStackNavigator({
  Reward: RewardScreen,
  Details: DetailsScreen
})

