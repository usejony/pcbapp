import React, { Component } from 'react';
import {
  Dimensions,
  PixelRatio,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  Animated,
  TouchableOpacity,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Request from '../../common/request';
import config from '../../common/config';
import Button from '../../common/button';
import Line from '../../common/line';
import Item from './handleItem';
import Font from '../../common/normSize';
const { width } = Dimensions.get('window');
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      data: null
    }
  }
  componentWillMount() {
    console.log('willmount')
    storage.load({
      key: 'loginInfo'
    }).then(data => {
      // console.log('找到了注册用户的信息:', data);
      this.setState({
        data: data.data
      });
    }).catch(err => {
      console.log('没有在本地获取到用户的登录信息:', err.message);
    });
  }
  //在页面将要加载的时候去本地查询是否有用户登录的信息
  componentDidMount() {
    //当登录成功后通知页面刷新
    DeviceEventEmitter.addListener('logined', () => {
      storage.load({
        key: 'loginInfo'
      }).then(data => {
        console.log('找到了注册用户的userId:', data.userId);
        this.setState({
          data: data.data
        });
      }).catch(err => {
        console.log('没有在本地获取到用户的登录信息:', err.message);
      });
    });
    //当退出登录后通知页面刷新并删除data数据
    DeviceEventEmitter.addListener('loginOut', () => {
      this.setState({
        data: null
      })
    });
  }

  //在组件销毁的时候需要移除的事件
  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
  }
  //点击设置按钮打开什么页面。当用户有登录的时候打开设置页面，当用户没有登录的时候打开登录注册页面
  gearTouch() {
    const { navigate } = this.props.screenProps;
    if (this.state.data) {
      const actions = NavigationActions.navigate({
        routeName: 'GearScreen',
        params: {},
        action: NavigationActions.navigate({ routeName: 'GearHomeScreen',params: {data: this.state.data} })
      });
      this.props.navigation.dispatch(actions);
    } else {
      navigate('LoginScreen');
    }
  }

  /**
   * 点击账户页面的顶部个人信息栏，当用户有登录。跳转到个人信息页面。否则跳转到登录注册页面
   */
  personInfo() {
    if (this.state.data) {
      const actions = NavigationActions.navigate({
        routeName: "GearScreen",
        params: {},
        action: NavigationActions.navigate({ routeName: 'InfoScreen', params: { data: this.state.data}})
      });
      this.props.navigation.dispatch(actions);
    } else {
      this.props.screenProps.navigate('LoginScreen');
    }
  }

  /**
   * 链接页面方法
   */
  toWhere(where) {
    if (this.state.data) {
      const actions = NavigationActions.navigate({
        routeName: 'AccountMainScreen',
        params: {},
        action: NavigationActions.navigate({ routeName: where, params: { data: this.state.data } })
      });
      this.props.navigation.dispatch(actions);
    } else {
      this.props.screenProps.navigate('LoginScreen');
    }
  }

  //固定渐变头部
  renderFixedHeader() {
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 1]
    });
    const title = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 200],
      outputRange: [100, 0, 0]
    })
    return (
      <Animated.View style={[
        styles.head,
        {
          transform: [
            {
              translateY: title
            }
          ],
        }
      ]}>
        <Animated.View style={[
          styles.header,
          {
            opacity: opacity
          }
        ]} />
        <TouchableOpacity onPress={this.gearTouch.bind(this)} style={styles.gearBtn}>
          <FontIcon name="gear" size={Font(16)} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let data = this.state.data;
    return (
      <View style={styles.container}>
        {this.renderFixedHeader()}
        <ScrollView
          scrollIndicatorInsets={{ top: 50 }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
          scrollEventThrottle={8}>
          <View style={styles.headerBox}>
            <TouchableOpacity activeOpacity={1} onPress={this.personInfo.bind(this)}>
              {
                data
                  ? <View style={styles.headCont}>
                    {
                      data.avatar
                        ? <Image source={{ uri: data.avatar }} style={styles.avatar} />
                        : <Image source={require('../../imgs/manAvatar.png')} style={styles.avatar} />
                    }
                    <View>
                      <Text style={styles.nickName}>{data.nickName}</Text>
                      <View style={styles.headInfo}>
                        <Text style={styles.extraText}>个人信息</Text>
                        <FontIcon name="angle-right" size={Font(12)} color={'#fff'} />
                      </View>
                    </View>
                  </View>
                  : <View style={styles.headCont}>
                    <Image source={require("../../imgs/manAvatar.png")} style={styles.avatar} />
                    <View>
                      <Text style={styles.nickName}>点击登录</Text>
                    </View>
                  </View>
              }
            </TouchableOpacity>
          </View>
          <View style={styles.chunck}>
            <TouchableHighlight style={styles.card} underlayColor="#efefef" onPress={this.toWhere.bind(this, 'BalanceScreen')}>
              <View style={styles.touchBox}>
                {
                  this.state.data
                    ? <Text style={styles.useableLimit}>
                      {data ? data.useableLimit : 0.00}
                      <Text style={styles.unit}>元</Text>
                    </Text>
                    : <MaterIcon name="wallet" size={20} color="#feb150" />
                }
                <Text style={styles.bottomText}>钱包</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#efefef" style={[styles.card, { marginHorizontal: 1 / PixelRatio.get() }]} onPress={this.toWhere.bind(this, 'FavorableScreen')}>
              <View style={styles.touchBox}>
                {
                  this.state.data
                    ? <Text style={styles.privilege}>
                      {data ? data.useableLimit : 0}
                      <Text style={styles.unit}>个</Text>
                    </Text>
                    : <MaterIcon name="ticket-confirmation" size={20} color="#e44825" />
                }
                <Text style={styles.bottomText}>优惠</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#efefef" style={styles.card} onPress={this.toWhere.bind(this, 'IntegralScreen')}>
              <View style={styles.touchBox}>
                {
                  this.state.data
                    ? <Text style={styles.integral}>
                      {data ? data.integral : 0}
                      <Text style={styles.unit}>分</Text>
                    </Text>
                    : <MaterIcon name="cube" size={20} color="#1cc61c" />
                }
                <Text style={styles.bottomText}>积分</Text>
              </View>
            </TouchableHighlight >
          </View >
          <View style={styles.tools}>
            {/*<Item icon="bandcamp" iconColor="#f6af2d" title="余额" info={data ? "￥" + data.useableLimit : null} press={() => null} />
            <Line left={13} />
            <Item icon="server" iconColor="#b245f8" title="积分" info={data ? data.integral : null} press={() => null} />
            <Line left={13} />*/}
            <Item icon="credit-card-alt" iconColor="#52db52" title="信用额度" info={data ? data.creditLimit : null} press={() => null} />
            <Line left={13} />
            <Item icon="map-marker" iconColor="#3694de" title="收货地址" press={this.toWhere.bind(this, 'AddressScreen')} />
          </View>
          <View style={styles.tools}>
            {/*code...*/}
          </View>
        </ScrollView >
      </View >
    )
  }
}


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  headerBox: {
    backgroundColor: '$theme6',
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20
  },
  headCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderColor: '$theme4',
    borderWidth: 3,
    borderRadius: 30,
    marginRight: 20,
  },
  nickName: {
    fontSize: Font(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  headInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  extraText: {
    fontSize: Font(12),
    color: '#fff',
    marginRight: 5
  },
  head: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: 60,
    backgroundColor: "transparent",
    zIndex: 5
  },
  header: {
    flex: 1,
    backgroundColor: '$theme6'
  },
  gearBtn: {
    width: 48,
    height: 48,
    position: 'absolute',
    right: 0,
    top: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10
  },
  tools: {
    marginTop: 12,
    backgroundColor: '#fff'
  },
  chunck: {
    height: 70,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  useableLimit: {
    fontSize: Font(16),
    color: '#feb150',
  },
  privilege: {
    fontSize: Font(16),
    color: '#fc4444',
  },
  integral: {
    fontSize: Font(16),
    color: '#1cc61c',
  },
  unit: {
    fontSize: Font(8),
  },
  bottomText: {
    fontSize: Font(10),
    color: '#666',
    marginTop: 5
  },
  touchBox: {
    alignItems: 'center'
  }
});
