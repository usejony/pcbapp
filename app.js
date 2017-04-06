import React from 'react';
import {
  View,
} from 'react-native';
//第三方组件
import { StackNavigator } from 'react-navigation';

//路由
import MainPages from './app/mainPage';
import NewsDetail from './app/news/detail';
import OrderDetail from './app/orders/detail';
import Search from './app/orders/search';
import Test from './test';
import Button from './common/button';

const Nav = StackNavigator({
  MainPage: {
    screen: MainPages,
    
  },
  NewsDetail: {
    screen: NewsDetail
  },
  OrderDetail: {
    screen: OrderDetail
  },
  Search: {
    screen: Search
  },
  Test: {
    screen: Test
  }
},{
  // headerMode: 'screen',
  navigationOptions: {
    header: {
      titleStyle: { fontSize: 17 },
      tintColor: '#fff',
      style: {backgroundColor: '#00d7a7',shadowOpacity:0}
    }
  }
});


export default Nav;

