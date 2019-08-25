import React from 'react'
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../../assets/sampledata/samplecolors'


class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
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
    title: 'Rewards',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
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

