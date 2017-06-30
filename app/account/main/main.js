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
// import Gear from '../gear/gear';
// import Info from '../gear/info';
// import Safety from '../gear/safety';
// import Gender from '../gear/gender';
// import Nickname from '../gear/nickName';

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
  },
  // GearScreen: {
  //   screen: Gear
  // },
  // InfoScreen: {
  //   screen: Info
  // },
  // SafetyScreen: {
  //   screen: Safety
  // },
  // GenderScreen: {
  //   screen: Gender
  // },
  // NicknameScreen: {
  //   screen: Nickname
  // }
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