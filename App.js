import React from 'react';
import { Text, View, Button } from 'react-native';
import Ionicons from '@expo/vector-icons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import { YellowBox } from 'react-native';
import _ from 'lodash';
import {getAuth} from './components/Firebase'


import TabNavigator from './components/navigation/TabNavigator'
import LoginStack from './components/auth/LoginStack'

const StackNavigator = createSwitchNavigator({
  LoginStack: LoginStack,
  TabNavigator: TabNavigator
}, {
  initialRouteName: 'LoginStack'
})

export default createAppContainer(StackNavigator)

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// class App extends React.Component {

//   constructor() {
//     super()
//     console.ignoredYellowBox = ['Setting a timer']
//   }

//   componentDidMount() {
//     getAuth().onAuthStateChanged(user => {
//       this.setState(user)
//     }, () => console.log(this.state))
//   }

//   componentWillUnmount() {
//     this.authSubscription()
//   }

//   login = () => {
//     this.setState({ loggedIn: true })
//   }

//   logout = () => {
//     this.setState({ loggedIn: false })
//   }
//   render() {
//     // return <OnboardContainer/>
//     // if (this.state.loggedIn) {
//     //   return <AppContainer screenProps={{ logout: this.logout }} />
//     // }
//     // return <LoginContainer screenProps={{ login: this.login, email: this.state.email, password: this.state.password }} />
//     return <AppContainer screenProps={{test:'screenpropz'}}/>
//   }
// }