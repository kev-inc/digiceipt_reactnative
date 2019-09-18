import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import HomePage from '../tabs/HomeStack'
import NewScanPage from '../tabs/ScanStack'
import AllReceiptsPage from '../tabs/ReceiptsStack'
import MyProfilePage from '../tabs/ProfileStack'
import AllRewardsPage from '../tabs/RewardsStack'

import { headerColor } from '../../assets/sampledata/samplecolors'

const Navigator = createBottomTabNavigator({
  Home: HomePage,
  Receipts: AllReceiptsPage,
  Scan: NewScanPage,
  Rewards: AllRewardsPage,
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


  componentDidMount() {
    console.log(this.props.navigation.getParam('user', {}))
  }

  render() {
    return <NavigatorContainer />
  }
}

export default TabNavigator