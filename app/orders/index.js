//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  LayoutAnimation,
  DeviceEventEmitter
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from '../../common/header';
import Line from '../../common/line';
import Status from './status';
import Request from '../../common/request';
import config from '../../common/config';

// create a component
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: null,
      itemsData: [],
      pressMore: false,
      modalVisible: false,
    }
  }

  componentWillMount() {
    storage.load({
      key: 'loginInfo',
    }).then(data => {
      console.log('找到了注册用户的userId:', data.userId);
      this.setState({
        loginInfo: data
      }, () => {
        this.fetchData();
      });
    }).catch(err => {
      console.log('没有找到用户的注册信息:', err);
    });
  }
  componentDidMount() {
    //当登录成功后通知页面从本地获取用户的登录信息并刷新
    DeviceEventEmitter.addListener("logined", () => {
      //当页面将要加载的时候从本地读取用户是否有登录，如果有则将登录信息保存在state中
      storage.load({
        key: 'loginInfo',
      }).then(data => {
        console.log('找到了注册用户的userId:', data.userId);
        this.setState({
          loginInfo: data
        }, () => {
          this.fetchData();
        });
      }).catch(err => {
        console.log('没有找到用户的注册信息:', err);
      });
    });
    //当退出登录后通知页面刷新并删除data数据
    DeviceEventEmitter.addListener('loginOut', () => {
      this.setState({
        loginInfo: null
      })
    });
  }

  //在组件销毁的时候需要移除的事件
  componentWillUnmount() {
      DeviceEventEmitter.removeAllListeners();
  }


  fetchData(page) {
    const params = {
      accessToken: this.state.loginInfo.userId,
    };
    const url = config.api.base + config.api.orderList;

    Request.Get(url, params)
      .then(data => {
        this.setState({
          orderData: data.data
        }, () => {
          this.loadListData(3);
        });
      })
      .catch(err => {
        console.log('个人订单列表请求失败：', err.message);
      });
  }

  /**
   * 点击登录/注册按钮的事件
   */
  login() {
    const { navigate } = this.props.screenProps;
    navigate('LoginScreen');
  }

  /**
   * loadListData: 指定在订单首页要显示的订单列表，可通过更多按钮加载更多列表项
   * @param {需要再加的个数} num
   */
  loadListData(num) {
    let itemsData = this.state.orderData.slice(0, num);
    this.setState({
      itemsData,
    });
  }

  renderRow() {
    let { itemsData } = this.state;
    let { navigate } = this.props.navigation;
    return itemsData.map((item, index) => {
      return (
        <View key={index}>
          <TouchableHighlight underlayColor={"#f9f9f9"} onPress={() => navigate('OrderDetail', { data: item })}>
            <View style={styles.list}>
              <View style={styles.itemHead}>
                <Text style={styles.title}>{item.orderNumber}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <Text style={[styles.text]}>下单日期：{item.date}</Text>
              <Text style={[styles.text]}>总价：￥{item.totalCharge}</Text>
            </View>
          </TouchableHighlight>
          <Line />
        </View>
      );
    });
  }

  //查看更多
  fetchMore() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.easeOut
      }
    });
    this.loadListData(5);
    this.setState({
      pressMore: true,
    });
  }

  //查看全部
  lookTotal() {
    // code...
  }

  /**
   * @param  {打开的订单页面类型} category
   */
  openOrderStatus(category) {
    const { navigation } = this.props;
    let nav = {
      routeName: 'OrderStatusScreen',
      params: {},
    };
    let navAction = null;
    switch (category) {
      case 'total':
        nav.action = NavigationActions.navigate({ routeName: 'TotalScreen' });
        navAction = NavigationActions.navigate(nav);
        navigation.dispatch(navAction);
        break;
      case 'ok':
        nav.action = NavigationActions.navigate({ routeName: 'OkScreen'});
        navAction = NavigationActions.navigate(nav);
        navigation.dispatch(navAction);
        break;
      case 'pay':
        nav.action = NavigationActions.navigate({ routeName: 'PayScreen'});
        navAction = NavigationActions.navigate(nav);
        navigation.dispatch(navAction);
        break;
      case 'receive':
        nav.action = NavigationActions.navigate({ routeName: 'ReceiveScreen'});
        navAction = NavigationActions.navigate(nav);
        navigation.dispatch(navAction);
        break;
      default:
        nav.action = NavigationActions.navigate({ routeName: 'SaleScreen'});
        navAction = NavigationActions.navigate(nav);
        navigation.dispatch(navAction);
    }
  }
  render() {
    if (!this.state.loginInfo) {
      return (
        <View style={styles.container}>
          <Header title="订单" />
          <View style={styles.hintCont}>
            <Text style={styles.hintText}>登录可查看订单、等详细信息</Text>
            <TouchableHighlight underlayColor={theme7} style={styles.loginBtn} onPress={this.login.bind(this)}>
              <Text style={styles.loginText}>登录/注册</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header title="订单" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.head}>
            <TouchableHighlight underlayColor="#e9e9e9" onPress={this.openOrderStatus.bind(this, 'total')}>
              <View style={styles.orderLink}>
                <Text style={styles.leftText}>我的订单</Text>
                <View style={styles.linkRight}>
                  <Text style={styles.rightText}>全部订单</Text>
                  <FontIcon name="angle-right" size={16} color="#d5d5d5" />
                </View>
              </View>
            </TouchableHighlight>
            <Line />
            <View style={styles.statusBox}>
              <Status icon="handshake-o" title="待确认" iconColor="#6cc0f1" press={this.openOrderStatus.bind(this, 'ok')} />
              <Status icon="cc-paypal" title="待付款" iconColor="#a358f7" press={this.openOrderStatus.bind(this, 'pay')} />
              <Status icon="truck" title="待收货" iconColor="#edd867" press={this.openOrderStatus.bind(this, 'receive')} />
              <Status icon="institution" title="退款/售后" iconColor="#ec7979" press={this.openOrderStatus.bind(this, 'sale')} />
            </View>
          </View>
          <View>
            <View style={styles.latelyOrder}>
              <Text style={styles.latelyText}>最近订单</Text>
            </View>
            <View style={styles.latelyList}>
              {
                this.state.orderData
                  ? <View>
                    {this.renderRow()}
                    {
                      !this.state.pressMore
                        ? <TouchableHighlight underlayColor="#efefef" onPress={this.fetchMore.bind(this)}>
                          <View style={styles.moreBox}>
                            <Text style={styles.more}>更多</Text>
                            <FontIcon name="angle-down" size={13} color="#00d7a7" />
                          </View>
                        </TouchableHighlight>
                        : <TouchableHighlight underlayColor="#efefef" onPress={this.openOrderStatus.bind(this,'total')}>
                          <View style={styles.moreBox}>
                            <Text style={styles.more}>查看全部</Text>
                            <FontIcon name="angle-right" size={13} color="#00d7a7" />
                          </View>
                        </TouchableHighlight>
                    }
                  </View>
                  : <View style={styles.indicatorBox}><ActivityIndicator /></View>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  hintCont: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hintText: {
    color: '#666',
    fontSize: 14
  },
  loginBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '$theme6',
    marginTop: 15
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
  },
  head: {
    backgroundColor: '#fff',
  },
  orderLink: {
    height: 35,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
  },
  linkRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rightText: {
    fontSize: 11,
    color: '#888',
    marginRight: 3
  },
  statusBox: {
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  latelyOrder: {
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  latelyText: {
    fontSize: 11,
    color: '#888',
  },
  indicatorBox: {
    paddingVertical: 30,
  },
  latelyList: {
    backgroundColor: '#fff'
  },
  moreBox: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  more: {
    fontSize: 13,
    color: '$theme6',
    marginRight: 3
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  itemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
  },
  status: {
    fontSize: 12,
    color: '$theme6'
  },
  text: {
    fontSize: 12,
    color: '#999',
    marginTop: 5
  },

});

//make this component available to the app
export default Order;
