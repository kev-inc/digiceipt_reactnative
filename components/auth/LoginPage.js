import React from 'react'
import { View, Image, Text } from 'react-native'
import { Card, Button, Input } from "react-native-elements";

class LoginPage extends React.Component {
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 120, height: 120 }} source={require('../../assets/icon.png')} />
        
          <Input containerStyle={{width: 240}} inputStyle={{textAlign: 'center'}} placeholder="Email address" value={this.props.email} />
          <Input containerStyle={{width: 240}} inputStyle={{textAlign: 'center'}} secureTextEntry placeholder="Password" value={this.props.password}/>

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={this.props.login}
          />
      </View>
    )
  }
}

export default LoginPage