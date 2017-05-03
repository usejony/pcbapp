import React, { Component } from 'react';
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
import Button from './common/button';
import GearNav from './app/account/gear/gear';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

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
  GearScreen: {
    screen: GearNav,
    navigationOptions: {
      headerVisible: false
    }
  }
}, {
    headerMode: 'none',
    navigationOptions: {
      headerTitleStyle: { fontSize: 17 },
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#00d7a7', shadowOpacity: 0 }
    }
  });

 export default class App extends Component {
   constructor(props) {
     super(props);
     this.state = {

     }
   }
   componentDidMount() {
     this.loginRefresh = RCTDeviceEventEmitter.addListener('loginRefresh',()=>{
      //这里实现你需要刷新的东西
      
    });
   }
   render() {
     return (
       <Nav screenProps={this.props.navigation}/>
     );
   }
 } 


// export default Nav;

