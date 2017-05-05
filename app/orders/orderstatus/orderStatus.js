//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarView } from 'react-navigation';

import Total from './totalOrder';
import Ok from './waitOk';
import Pay from './waitPay';
import Receive from './waitReceive';
import Sale from './afterSale'; 

const tabNav = TabNavigator({
  TotalScreen: {
    screen: Total
  },
  OkScreen: {
    screen: Ok
  },
  PayScreen: {
    screen: Pay
  },
  ReceiveScreen: {
    screen: Receive
  },
  SaleScreen: {
    screen: Sale
  }
},{
  // tabBarPosition: 
});

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
export default TabNav;
