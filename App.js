import React from 'react';
import { Text, View, Button } from 'react-native';
import Ionicons from '@expo/vector-icons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { YellowBox } from 'react-native';
import _ from 'lodash';



import TabNavigator from './components/navigation/TabNavigator'
import LoginPage from './components/auth/LoginPage'
const AppContainer = createAppContainer(TabNavigator)

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends React.Component {

  constructor() {
    super()
    console.ignoredYellowBox = ['Setting a timer']
  }
  state = {
    loggedIn: true,
    email: 'test@digiceipt.com', 
    password: 'password'
  }

  login = () => {
    this.setState({loggedIn: true})
  }
  render() {
    if(this.state.loggedIn) {
      return <AppContainer/>
    } 
    return <LoginPage login={this.login} email={this.state.email} password={this.state.password}/>
  }
}