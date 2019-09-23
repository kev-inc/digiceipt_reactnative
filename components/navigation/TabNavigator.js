import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import HomePage from '../tabs/HomeStack'
import NewScanPage from '../tabs/ScanStack'
import AllReceiptsPage from '../tabs/ReceiptsStack'
import MyProfilePage from '../tabs/ProfileStack'
import AllRewardsPage from '../tabs/RewardsStack'

import { headerColor } from '../../assets/sampledata/samplecolors'

import {getUserProfile, getAuth} from '../Firebase'

const Navigator = createBottomTabNavigator({
  Home: HomePage,
  Scan: NewScanPage,
  Receipts: AllReceiptsPage,
  // Rewards: AllRewardsPage,
  Profile: MyProfilePage
}, {
  unmountInactiveRoutes: true,
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`;
      } else if (routeName === 'Receipts') {
        iconName = `md-paper`;
      } else if (routeName === 'Scan') {
        iconName = `md-barcode`;
      } else if (routeName === 'Rewards') {
        iconName = `md-gift`;
      } else if (routeName === 'Profile') {
        iconName = `md-person`;
      } 

      return <IconComponent name={iconName} size={25} color={tintColor} size={26} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: headerColor,
    inactiveTintColor: 'gray',
    showIcon: true
  }
})

const NavigatorContainer = createAppContainer(Navigator)

class TabNavigator extends React.Component {

  state={
    loaded: false,
    auth: {},
    database: {},
    backToLogin: () => this.props.navigation.navigate('LoginStack')
  }


  componentDidMount() {

    const auth = this.props.navigation.getParam('auth', null)
    if (auth != null) {
      getUserProfile(auth.user.uid).on('value', snapshot => {
        this.setState({
          loaded: true,
          auth: auth,
          database: snapshot.val()
        })
      })
    }
  }

  render() {
    return <NavigatorContainer screenProps={this.state}/>
  }
}

export default TabNavigator