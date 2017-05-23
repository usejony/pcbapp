import React, { Component } from 'react';
import {
  Text
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Balance from './balance';
import Favorable from './favorable';
import Integral from './integral';
import Address from './address';
import IconBtn from '../../../common/iconBtn';

const AccountMain = StackNavigator({
  BalanceScreen: {
    screen: Balance,
  },
  FavorableScreen: {
    screen: Favorable
  },
  IntegralScreen: {
    screen: Integral
  },
  AddressScreen: {
    screen: Address,
  }
},{
  navigationOptions: ({navigation}) =>  ({
    headerStyle: { backgroundColor: theme6},
    headerTitleStyle: { color: '#fff'},
    headerLeft: (
      <IconBtn name="ios-arrow-back" size={25} color="#fff" onPress={() => {
        navigation.goBack(null);
        }}/>
    )
  })
});

export default AccountMain;