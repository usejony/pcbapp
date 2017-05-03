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
} from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator, NavigationActions } from 'react-navigation';

import Info from './info';
import Line from '../../../common/line';
import Safety from './safety';

const { width } = Dimensions.get('window');

const Gear = ({ navigation, screenProps }) => {
  logoutHandle = () => {
    // navigation.state.params.logout();
    storage.remove({ key: 'loginInfo' });
    const backAction = NavigationActions.back({
      key: null
    });
    screenProps.dispatch(backAction)
  }
  return (<View style={styles.container}>
    <ScrollView>
      <View style={styles.itemList}>
        <TouchableHighlight underlayColor="#ededed" onPress={() => {
          navigation.navigate('InfoScreen');
        }}>
          <View style={styles.item}>
            <Text style={styles.title}>个人信息</Text>
            <FontIcon name="angle-right" size={18} color="#999" />
          </View>
        </TouchableHighlight>
        <Line left={12} />
        <TouchableHighlight underlayColor="#ededed" onPress={() => {
          navigation.navigate('SafetyScreen');
        }}>
          <View style={styles.item}>
            <Text style={styles.title}>账户与安全</Text>
            <FontIcon name="angle-right" size={18} color="#999" />
          </View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight underlayColor="#f9f9f9" onPress={this.logoutHandle.bind(this)} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableHighlight>
    </ScrollView>
  </View>)
};
Gear.navigationOptions = ({ navigation, screenProps }) => ({
  title: '设置',
  headerLeft: (
    <FontIcon name="angle-left" size={28} color="#00d7a7" style={{ paddingHorizontal: 15 }} onPress={() => {
      const backAction = NavigationActions.back({
        key: null
      });
      screenProps.dispatch(backAction)
    }} />
  )
});


const GearStack = StackNavigator({
  GearScreen: {
    screen: Gear
  },
  InfoScreen: {
    screen: Info
  },
  SafetyScreen: {
    screen: Safety
  }
}, {
    initialRouteName: 'GearScreen',
    mode: 'card',
    navigationOptions: ({ navigation, screenProps }) => ({
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#00d7a7',
      headerTitleStyle: { color: '#333', fontSize: 16 },
      headerLeft: (
        <FontIcon name="angle-left" size={28} color="#00d7a7" style={{ paddingHorizontal: 15 }} onPress={() => {
          navigation.goBack()
        }} />
      )
    })
  });
const GearNav = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <StatusBar animated={true} barStyle={'dark-content'} />
    <GearStack screenProps={navigation} />
  </View>
)
// define your styles
const styles = StyleSheet.create({
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
    fontSize: 12,
    color: '#444'
  },
  logoutBtn: {
    width: width - 40,
    alignSelf: 'center',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 5
  },
  logoutText: {
    color: '#333'
  }
});

//make this component available to the app
export default GearNav;
