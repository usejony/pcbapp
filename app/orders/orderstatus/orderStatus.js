//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

import Total from './totalOrder';
import Ok from './waitOk';
import Pay from './waitPay';
import Receive from './waitReceive';
import Sale from './afterSale'; 

const tabNav = TabNavigator({
  TotalScreen: {
    screen: Total,
    navigationOptions: {
      title: '全部'
    }
  },
  OkScreen: {
    screen: Ok,
    navigationOptions: {
      title: '待确认'
    }
  },
  PayScreen: {
    screen: Pay,
    navigationOptions: {
      title: '待付款'
    }
  },
  ReceiveScreen: {
    screen: Receive,
    navigationOptions: {
      title: '待收货'
    }
  },
  SaleScreen: {
    screen: Sale,
    navigationOptions: {
      title: '退款/售后'
    }
  }
},{
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#47B2EA',
    inactiveTintColor: '#222',
    pressOpacity: 0.8,
    scrollEnabled: true,
    tabStyle: {width: 80,height: 35,paddingHorizontal:0},
    indicatorStyle: {backgroundColor: "#47B2EA"},
    style: { backgroundColor: '#f6f6f6'}
  }
});

export default tabNav;
