//import liraries
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import Info from './info';
import Line from '../../../common/line';
import Safety from './safety';
import Font from '../../../common/normSize';
import Nickname from './nickName';
import Gender from './gender';
import IconBtn from '../../../common/iconBtn';

const { width } = Dimensions.get('window');

const Gear = ({ navigation, screenProps }) => {
  logoutHandle = () => {
    storage.remove({ key: 'loginInfo' });
    navigation.goBack(null);
    DeviceEventEmitter.emit('loginOut');
  }
  const data = navigation.state.params.data;

  change = () => {
    alert('1')
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" animated={true} />
      <ScrollView>
        <View style={styles.itemList}>
          {/*<TouchableHighlight underlayColor="#ededed" onPress={() => {
            navigation.navigate('InfoScreen',{data});
          }}>
            <View style={styles.item}>
              <Text style={styles.title}>个人信息</Text>
              <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
            </View>
          </TouchableHighlight>
          <Line left={12} />*/}
          <TouchableHighlight underlayColor="#ededed" onPress={() => {
            navigation.navigate('SafetyScreen',{callback: this.change});
          }}>
            <View style={styles.item}>
              <Text style={styles.title}>账户与安全</Text>
              <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={this.logoutHandle.bind(this)} style={styles.logoutBtn}>
          <LinearGradient colors={['#cd8282', '#cd5050', '#c93333']} style={styles.touchBox} >
            <Text style={styles.logoutText}>退出登录</Text>
          </LinearGradient>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
};
Gear.navigationOptions = ({ navigation, screenProps }) => ({
  title: '设置',
  headerLeft: (
    <IconBtn name="ios-arrow-back" size={25} color={theme6} onPress={() => {
      navigation.goBack(null);
    }} />
  )
});


const GearStack = StackNavigator({
  GearHomeScreen: {
    screen: Gear
  },
  InfoScreen: {
    screen: Info
  },
  SafetyScreen: {
    screen: Safety
  },
  NicknameScreen: {
    screen: Nickname
  },
  GenderScreen: {
    screen: Gender
  },
}, {
    initialRouteName: 'GearScreen',
    mode: 'card',
    navigationOptions: ({ navigation, screenProps }) => ({
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#00d7a7',
      headerTitleStyle: { color: '#333', fontSize: Font(16) },
      headerLeft: (
        <IconBtn name="ios-arrow-back" size={25} color={theme6} onPress={() => {
          navigation.goBack(null);
        }} />
      )
    }),
    onTransitionStart: () => {
      console.log('加载开始')
    }
  });

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  itemList: {
    marginTop: 15,
    backgroundColor: '#fff'
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: Font(13),
    color: '#333'
  },
  logoutBtn: {
    width: width - 100,
    alignSelf: 'center',
    height: 38,
    marginTop: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden'
  },
  touchBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#fff',
    backgroundColor: 'transparent'
  }
});

//make this component available to the app
export default GearStack;
