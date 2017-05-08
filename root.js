//import liraries
import React, { Component } from 'react';
import { View, Text, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Storage from 'react-native-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import App from './app';
import Login from './common/loginModal';

EStyleSheet.build({
  $theme7: '#3997CF',
  $theme6: '#47B2EA',//APP主题色
  $theme5: '#73C4EF',
  $theme4: '#9CD6F4',
});

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpores: 1000 * 3600 * 24,
  enableCache: true,
  sync: () => {
    console.log('我是storage里面自定义的方法')
  }
});
global.storage = storage;
global.theme7 = '#3997CF';
global.theme6 = '#47B2EA';
global.theme5 = '#73C4EF';
global.theme4 = '#9CD6F4';
// create a component
const RootNav = StackNavigator({
  AppScreen: {
    screen: App
  },
  LoginScreen: {
    screen: Login
  }
},{
  mode: 'modal',
  initialRouteName: 'AppScreen',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: 'none',
  }
})

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default RootNav;
