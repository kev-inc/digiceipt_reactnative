import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button, Input } from "react-native-elements";

class SignUpPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingVertical: 64, paddingHorizontal: 8 }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 160, height: 160 }} source={require('../../assets/icon.png')} />
        </View>

        <View style={{ paddingLeft: 20, paddingBottom: 12 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Create</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Account</Text>
        </View>

        <View>
          <Input
            containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            placeholder="Email address"
          />
          <Input
            containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            secureTextEntry
            placeholder="Password"
          />
          <Input
            containerStyle={{ width: '100%', paddingHorizontal: 20, paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            secureTextEntry
            placeholder="Confirm password"
          />
        
        </View>

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
            onPress={this.props.login}
          />

        </View>

        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Button
            backgroundColor="#03A9F4"
            buttonStyle={{ width: '100%' }}
            title="Sign in"
            type='clear'
          />

        </View>

      </View>
    )
  }
}

export default SignUpPage