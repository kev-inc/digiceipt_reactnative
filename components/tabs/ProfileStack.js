import React from 'react'
import { View, SectionList, StyleSheet, KeyboardAvoidingView, Image, ScrollView, Picker } from 'react-native';
import { Text, Avatar, ListItem, Button, Overlay, Input } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { colors } from '../../assets/sampledata/samplecolors'
import { getAuth, getUserProfile, updateUserProfile } from '../Firebase'


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

  state = {
    firstname: '',
    lastname: ''
  }
  render() {
    const { navigation } = this.props
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
    title: 'My Profile',
    headerStyle: {
      backgroundColor: colors.headerColor
    },
    headerTitleStyle: {
      color: colors.headerTitleColor
    },
  }

  signOut = () => {
    getAuth().signOut()
      .then(this.props.screenProps.backToLogin)
      .catch(() => console.log('error'))
  }

  generateAvatar() {
    var avatarlist = []
    avatarlist.push(require('../../assets/avatar/0.png'))
    avatarlist.push(require('../../assets/avatar/1.png'))
    avatarlist.push(require('../../assets/avatar/2.png'))
    avatarlist.push(require('../../assets/avatar/3.png'))
    avatarlist.push(require('../../assets/avatar/4.png'))
    avatarlist.push(require('../../assets/avatar/5.png'))
    avatarlist.push(require('../../assets/avatar/6.png'))
    avatarlist.push(require('../../assets/avatar/7.png'))
    avatarlist.push(require('../../assets/avatar/8.png'))
    avatarlist.push(require('../../assets/avatar/9.png'))
    let index = (this.props.screenProps.database.firstname.charCodeAt(0) + this.props.screenProps.database.lastname.charCodeAt(0)) % 10
    return avatarlist[index]
  }


  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ height: 144, flexDirection: 'row', alignItems: 'center', padding: 16 }} >
          <Avatar rounded source={this.generateAvatar()} overlayContainerStyle={{ backgroundColor: 'white', elevation: 2 }} size='large' />
          <Text h3 style={{ padding: 16 }}>{this.props.screenProps.database.firstname} {this.props.screenProps.database.lastname}</Text>
        </View>



        <SectionList
          contentContainerStyle={{ flex: 1 }}
          sections={[
            { title: 'Settings', data: ['My Account', 'Preferences', 'Help'] },
          ]}
          renderItem={({ item }) => (
            <ListItem
              title={item}
              onPress={() => {
                if (item == 'My Account') {
                  this.props.navigation.navigate('Account')
                }
              }}
            />
          )}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index} />

        <Button title='Sign out' type='clear' onPress={this.signOut} />

      </View>
    );
  }
}

class AccountPage extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    firstname: '',
    lastname: '',
    gender: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    loadingOverlayIsVisible: true,
    loadingSend: false,
    successOverlayIsVisible: false,
    errorMsg: ''
  }

  componentWillMount() {
    getUserProfile(getAuth().currentUser.uid).once('value').then(snapshot => {
      let profile = snapshot.val()
      this.setState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        gender: profile.gender,
        age: profile.age,
        email: profile.email,
        loadingOverlayIsVisible: false
      })
    })
  }

  onSave = () => {
    const { firstname, lastname, gender, age, email } = this.state
    this.setState({ loadingSend: true }, () => {
      updateUserProfile(getAuth().currentUser.uid, firstname, lastname, age, gender, email)
        .then(() => this.setState({loadingSend: false, successOverlayIsVisible: true}))
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 64, paddingHorizontal: 8 }} behavior="padding" enabled>

        <Overlay isVisible={this.state.loadingOverlayIsVisible} height='auto'>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Loading...</Text>
            <Button loading type='clear' />
          </View>
        </Overlay>

        <Overlay isVisible={this.state.successOverlayIsVisible} height='auto' onBackdropPress={() => this.setState({ successOverlayIsVisible: false })}>
          <View>
            <Text>Account details saved!</Text>
            <Button title='OK' type='clear' onPress={() => this.setState({ successOverlayIsVisible: false }, () => this.props.navigation.pop())} />
          </View>
        </Overlay>


        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 160, height: 160 }} source={require('../../assets/icon.png')} />
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>

          <View style={{ paddingLeft: 8, paddingBottom: 12 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>My Account</Text>
          </View>

          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <Input
              containerStyle={{ flex: 1 }}
              inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
              placeholder="John"
              label="First name"
              labelStyle={{ color: 'black', opacity: 0.5 }}
              onChangeText={text => this.setState({ firstname: text })}
              value={this.state.firstname}
            />
            <Input
              containerStyle={{ flex: 1 }}
              inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
              placeholder="Appleseed"
              label="Last name"
              labelStyle={{ color: 'black', opacity: 0.5 }}
              onChangeText={text => this.setState({ lastname: text })}
              value={this.state.lastname}
            />
          </View>

          <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }}>
            <Text style={{ flex: 1, paddingLeft: 8, fontSize: 16, fontWeight: 'bold', opacity: 0.5, }}>Gender</Text>
            <Picker style={{ flex: 1 }} selectedValue={this.state.gender} onValueChange={(itemValue) => this.setState({ gender: itemValue })}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Prefer not to say" value="others" />
            </Picker>
          </View>

          <Input
            containerStyle={{ flex: 1 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            placeholder="25"
            label="Age"
            labelStyle={{ color: 'black', opacity: 0.5 }}
            keyboardType='numeric'
            onChangeText={text => this.setState({ age: text })}
            value={this.state.age}
          />

          <Input
            containerStyle={{ flex: 1, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            label="Email address"
            labelStyle={{ color: 'black', opacity: 0.5 }}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            name='email'
            placeholder='john_appleseed@gmail.com'
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input
            containerStyle={{ flex: 1, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            secureTextEntry
            label="Password"
            labelStyle={{ color: 'black', opacity: 0.5 }}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            name='password'
            placeholder='At least 8 characters'
          />
          <Input
            containerStyle={{ flex: 1, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            secureTextEntry
            label="Confirm password"
            labelStyle={{ color: 'black', opacity: 0.5 }}
            value={this.state.confirmPassword}
            onChangeText={text => this.setState({ confirmPassword: text })}
            name='confirmpassword'

          />

          <Text style={{ paddingHorizontal: 12, color: 'red' }}>{this.state.errorMsg}</Text>

          <View style={{ flexDirection: 'row', paddingBottom: 24, paddingTop: 12, justifyContent: 'flex-end' }}>

            <Button
              icon={{
                name: 'arrow-forward',
                size: 24,
                color: 'white'
              }}
              title='Save Details'
              iconRight={true}
              buttonStyle={{ paddingHorizontal: 48, height: 80, borderRadius: 40, justifyContent: 'flex-end' }}
              loading={this.state.loadingSend}
              onPress={this.onSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
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
  Details: DetailsScreen,
  Account: AccountPage
})

