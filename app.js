import React, { Component } from 'react';
import {
  View,
} from 'react-native';
//第三方组件
import { StackNavigator } from 'react-navigation';
import FontIcon from 'react-native-vector-icons/FontAwesome';
//路由
import MainPages from './app/mainPage';
import NewsDetailNav from './app/news/newsDetailNav';
import OrderDetail from './app/orders/detail';
import Button from './common/button';
import GearNav from './app/account/gear/gear';
import OrderStatus from './app/orders/orderstatus/orderStatus';
import Header from './common/header';
import Font from './common/normSize';
import Inquire from './app/orders/inquire';

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
    screen: OrderStatus,
    navigationOptions: ({ navigation }) => ({
      header: (<Header title="订单状态" leftIcon={<FontIcon name="angle-left" size={Font(25)} color="#fff"/>} leftHandle={() => {
        navigation.goBack();
      }}/>),
    })
  },
  GearScreen: {
    screen: GearNav,
  },
  InquireScreen: {
    screen: Inquire,
  }
}, {
    headerMode: 'screen',
    navigationOptions: {
      headerTitleStyle: { fontSize: Font(17) },
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#00d7a7', shadowOpacity: 0 },
      header: null,
    }
  });

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <Nav screenProps={this.props.navigation} />
    );
  }
}


// export default Nav;

