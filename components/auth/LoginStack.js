import React from 'react'
import { View, Image, Text, Picker, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Overlay } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';
import { getAuth, updateUserProfile } from '../Firebase'

class LoginPage extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    email: 'appletan@gmail.com',
    password: 'password',
    overlayIsVisible: false,
    errorMsg: ''
  }

  onLogin = () => {
    const { email, password } = this.state
    this.setState({ overlayIsVisible: true }, () => {
      getAuth().signInWithEmailAndPassword(email, password)
        .then(user => {
          this.setState({ overlayIsVisible: false }, () => {
            this.props.navigation.navigate('TabNavigator', { user: user })
          })
        })
        .catch(error => this.setState({ errorMsg: error.message, overlayIsVisible: false }))
    })

  }

  onEmailFieldChange = text => {
    this.setState({ email: text })
  }

  onPasswordFieldChange = text => {
    this.setState({ password: text })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 64, paddingHorizontal: 8 }} behavior="padding" enabled>

        <Overlay isVisible={this.state.overlayIsVisible} height='auto' onBackdropPress={() => this.setState({ overlayIsVisible: false })}>
          <Text>Signing in...</Text>
        </Overlay>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 160, height: 160 }} source={require('../../assets/icon.png')} />
        </View>

        <ScrollView style={{ flex: 1 }}>

          <View style={{ paddingLeft: 20, paddingBottom: 12 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Welcome</Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Back</Text>
          </View>

          <View>
            <Input
              containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
              inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
              placeholder="Email address"
              value={this.state.email}
              onChangeText={this.onEmailFieldChange}
              textContentType='emailAddress'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input
              containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
              inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
              secureTextEntry
              placeholder="Password"
              value={this.state.password}
              onChangeText={this.onPasswordFieldChange}
            />
            <Text style={{ paddingHorizontal: 20, color: 'red' }}>{this.state.errorMsg}</Text>
          </View>

          <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Sign in</Text>
            <Button
              backgroundColor="#03A9F4"
              buttonStyle={{ borderRadius: 72, width: 72, height: 72 }}
              icon={{
                name: "arrow-forward",
                size: 24,
                color: "white"
              }}
              onPress={this.onLogin}
            />

          </View>

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Button
              backgroundColor="#03A9F4"
              containerStyle={{ flex: 1 }}
              title="Sign up"
              type='clear'
              onPress={() => this.props.navigation.navigate('SignUp')}
            />

            <Button
              backgroundColor="#03A9F4"
              containerStyle={{ flex: 1 }}
              title="Forget password"
              type='clear'
              onPress={this.props.login}
            />
          </View>

        </ScrollView>


      </KeyboardAvoidingView>
    )
  }
}

class SignUpPage extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    firstname: 'Apple',
    lastname: 'Tan',
    gender: 'M',
    age: '23',
    email: 'appletan@gmail.com',
    password: 'password',
    confirmPassword: 'password',
    loadingOverlayIsVisible: false,
    successOverlayIsVisible: false,
    errorMsg: ''
  }

  onRegister = () => {
    const { firstname, lastname, gender, age, email, password } = this.state
    this.setState({ loadingOverlayIsVisible: true }, () => {
      getAuth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          const uid = getAuth().currentUser.uid
          updateUserProfile(uid, firstname, lastname, age, gender, email)
          this.setState({ loadingOverlayIsVisible: false, successOverlayIsVisible: true })
        })
        .catch(error => {
          this.setState({ errorMsg: error.message, loadingOverlayIsVisible: false })
        })
    })


  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 64, paddingHorizontal: 8 }} behavior="padding" enabled>
        <Overlay isVisible={this.state.loadingOverlayIsVisible} height='auto' onBackdropPress={() => this.setState({ loadingOverlayIsVisible: false })}>
          <Text>Creating account...</Text>
        </Overlay>

        <Overlay isVisible={this.state.successOverlayIsVisible} height='auto' onBackdropPress={() => this.setState({ successOverlayIsVisible: false })}>
          <View>
            <Text>Account created successfully! Please login with your new account.</Text>
            <Button title='OK' type='clear' onPress={() => this.setState({ successOverlayIsVisible: false }, () => this.props.navigation.pop())} />
          </View>
        </Overlay>


        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 160, height: 160 }} source={require('../../assets/icon.png')} />
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>

          <View style={{ paddingLeft: 8, paddingBottom: 12 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Create</Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Account</Text>
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

          <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Sign up</Text>
            <Button
              backgroundColor="#03A9F4"
              buttonStyle={{ borderRadius: 72, width: 72, height: 72 }}
              icon={{
                name: "arrow-forward",
                size: 24,
                color: "white"
              }}
              onPress={this.onRegister}
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default createStackNavigator({
  Login: LoginPage,
  SignUp: SignUpPage
})