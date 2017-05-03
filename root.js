//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './app';
import Login from './common/loginModal';

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default RootNav;
