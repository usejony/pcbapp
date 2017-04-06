import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
//自定义组件
import News from './news/index';
import Orders from './orders/index';
import Account from './account/index';
import Button from '../common/button';

//第三方组件
import { TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
//新闻页
const NewsScreen = ({ navigation}) => (
  <News navigation={navigation}/>
);
NewsScreen.navigationOptions = {
  title: '新闻',
  tabBar: {
    label: '新闻',
    icon: ({tintColor,focused}) => (
      <Icon size={28} name={focused ? 'ios-flame' : 'ios-flame-outline'} style={{color: tintColor}}/>
    )
  }
}

//订单页
const OrdersScreen = ({navigation}) => (
  <Orders navigation={navigation}/>
);
OrdersScreen.navigationOptions = {
  title: '订单',
  tabBar: {
    label: '订单',
    icon: ({tintColor,focused}) => (
      <Icon size={26} name={ focused ? "ios-paper" : "ios-paper-outline"} style={{color: tintColor}}/>
    )
  }
}

//账户页面
const AccountScreen = ({navigation}) => (
  <Account navigation={navigation} />
);
AccountScreen.navigationOptions = {
  tabBar: {
    label: '我',
    icon: ({tintColor,focused}) => (
      <Icon size={28} name={ focused ? "ios-person" : "ios-person-outline"} style={{color: tintColor}}/>
    )
  },
}

const Tab = TabNavigator({
  NewsTab: { screen: NewsScreen ,navigationOptions: {
    header: {
      right: null
    }
  }},
  OrdersTab: { screen: OrdersScreen },
  AccountTab: { screen: AccountScreen }
},{
  tabBarOptions: {
    activeTintColor: '#00d7a7'
  }
});
export default Tab;