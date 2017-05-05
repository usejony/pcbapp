import React, { Component } from 'react';
import {
  View,
} from 'react-native';
//第三方组件
import { StackNavigator } from 'react-navigation';

//路由
import MainPages from './app/mainPage';
import NewsDetailNav from './app/news/newsDetailNav';
import OrderDetail from './app/orders/detail';
import Button from './common/button';
import GearNav from './app/account/gear/gear';
import OrderStatus from './app/orders/orderstatus/orderStatus';

const Nav = StackNavigator({
  MainPageScreen: {
    screen: MainPages,
  },
  NewsDetailNavScreen: {
    screen: NewsDetailNav
  },
  OrderDetail: {
    screen: OrderDetail
  },
  OrderStatusScreen: {
    screen: OrderStatus
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

