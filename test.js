import React, { Component } from 'react';
import {
  View,
  Text,

} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Test extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("screenPorps:",this.props.screenProps)
    return (
      <View>
        <Text>卡惊世毒妃</Text>
      </View>
    );
  }
}
