/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * const theme = '#00d7a7';
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import App from './app'
class Root extends Component {
  constructor(props){
    super(props);
    this.state = {
      enting: false,
    }
  }
  render() {
    if(this.state.enting) {
      return (
        <View style={styles.container}>
          <Text>我是欢迎页面</Text>
        </View>
      );
    }
    return <App/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


AppRegistry.registerComponent('pcbApp', () => Root);
