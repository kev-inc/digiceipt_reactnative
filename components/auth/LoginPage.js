import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button, Input } from "react-native-elements";


class LoginPage extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, paddingVertical: 64, paddingHorizontal: 8 }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 160, height: 160 }} source={require('../../assets/icon.png')} />
        </View>

        <View style={{ paddingLeft: 20, paddingBottom: 12 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Welcome</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Back</Text>
        </View>

        <View>
          <Input
            containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            placeholder="Email address"
            value={this.props.email}
          />
          <Input
            containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            secureTextEntry
            placeholder="Password"
            value={this.props.password}
          />
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
            onPress={this.props.login}
          />

        </View>

        <View style={{ flexDirection: 'row', flex: 1, alignItems:'flex-end', justifyContent:'center' }}>
          <Button
            backgroundColor="#03A9F4"
            buttonStyle={{width:'100%'}}
            title="Sign up"
            type='clear'
            onPress={() => this.props.navigation.navigate('SignUp')}
          />

          <Button
            backgroundColor="#03A9F4"
            buttonStyle={{width:'100%'}}
            title="Forget password"
            type='clear'
            onPress={this.props.login}
          />
        </View>

      </View>
    )
  }
}

export default LoginPage