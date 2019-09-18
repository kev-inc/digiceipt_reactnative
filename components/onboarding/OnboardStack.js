import React from 'react'
import { View, Image, Text, Picker, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Button, Input, CheckBox } from "react-native-elements";
import { createStackNavigator } from 'react-navigation';

class Page1 extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 64, paddingHorizontal: 8 }} behavior="padding" enabled>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 160, height: 160 }} source={require('../../assets/icon.png')} />
        </View>

        <View style={{ paddingLeft: 20, paddingBottom: 12 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>About</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Me</Text>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>




          <View style={{ flexDirection: 'row', paddingVertical: 8, }}>
            <Input
              containerStyle={{ flex: 1 }}
              inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
              placeholder="John"
              label="First name"
              labelStyle={{ color: 'black', opacity: 0.5 }}
            />
            <Input
              containerStyle={{ flex: 1 }}
              inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
              placeholder="Appleseed"
              label="Last name"
              labelStyle={{ color: 'black', opacity: 0.5 }}
            />
          </View>

          <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }}>
            <Text style={{ flex: 1, paddingLeft: 8, fontSize: 16, fontWeight: 'bold', opacity: 0.5, }}>Gender</Text>
            <Picker style={{ flex: 1 }}>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Prefer not to say" value="others" />
            </Picker>
          </View>

          <Input
            containerStyle={{ width: '100%', paddingVertical: 8 }}
            inputContainerStyle={{ borderBottomColor: '#e6e6e6' }}
            placeholder="25"
            label="Age"
            labelStyle={{ color: 'black', opacity: 0.5 }}
            keyboardType='numeric'
          />

          <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Save</Text>
            <Button
              backgroundColor="#03A9F4"
              buttonStyle={{ borderRadius: 72, width: 72, height: 72 }}
              icon={{
                name: "arrow-forward",
                size: 24,
                color: "white"
              }}
            // onPress={screenProps.login}
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default createStackNavigator({
  Page1: Page1
})