import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
//自定义组件
import News from './news/index';
import Orders from './orders/index';
import Account from './account/index';

//第三方组件
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
//新闻页
const NewsScreen = ({ navigation }) => (
  <News navigation={navigation} />
);
NewsScreen.navigationOptions = {
  title: '新闻',
  tabBarLabel: '新闻',
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon size={28} name={focused ? 'ios-flame' : 'ios-flame-outline'} style={{ color: tintColor }} />
  )
}

//订单页
const OrdersScreen = ({ navigation, screenProps }) => (
  <Orders navigation={navigation} screenProps={screenProps}/>
);
OrdersScreen.navigationOptions = {
  title: '订单',
  tabBarLabel: '订单',
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon size={26} name={focused ? "ios-paper" : "ios-paper-outline"} style={{ color: tintColor }} />
  )
}

//账户页面
const AccountScreen = ({ navigation,screenProps }) => (
  <Account navigation={navigation} screenProps={screenProps}/>
);
AccountScreen.navigationOptions = ({ navigation }) => ({
  title: '我',
  tabBarLabel: '我',
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon size={28} name={focused ? "ios-person" : "ios-person-outline"} style={{ color: tintColor }} />
  ),
  /*headerRight: (
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
      <FontIcon name="gear" size={20} style={{paddingHorizontal: 15}} color="#fff" onPress={() => {
          navigation.navigate('GearScreen')
        }}/>
    </View>
  ),*/
  headerVisible: false
})

const Tab = TabNavigator({
  NewsTab: { screen: NewsScreen },
  OrdersTab: { screen: OrdersScreen },
  AccountTab: { screen: AccountScreen }
}, {
    tabBarOptions: {
      activeTintColor: '#47B2EA'
    },
    lazy: true
  });


export default Tab;