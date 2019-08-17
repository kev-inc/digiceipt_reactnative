import React from 'react';
import { Text, View, Button } from 'react-native';
import Ionicons from '@expo/vector-icons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import TabNavigator from './components/navigation/TabNavigator'

const AppContainer = createAppContainer(TabNavigator)

export default class App extends React.Component {
  render() {
    return <AppContainer/>
  }
}