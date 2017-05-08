import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  Animated,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Request from '../../common/request';
import config from '../../common/config';
import Button from '../../common/button';
import Line from '../../common/line';
import Item from './handleItem';
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
    let that = this;
    if (this.state.data) {
      return this.props.navigation.navigate('GearScreen');
    }
    navigate('LoginScreen');
  }

  /**
   * 点击账户页面的顶部个人信息栏，当用户有登录。跳转到个人信息页面。否则跳转到登录注册页面
   */
  personInfo() {
    if (this.state.data) {
      const actions = NavigationActions.navigate({
        routeName: "GearScreen",
        params: {},
        action: NavigationActions.navigate({ routeName: 'InfoScreen' })
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
          <FontIcon name="gear" size={20} color="#fff" />
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
                        <FontIcon name="angle-right" size={12} color={'#fff'} />
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
          <View style={styles.tools}>
            <Item icon="bandcamp" iconColor="#f6af2d" title="余额" info={data ? "￥" + data.useableLimit : null} press={() => alert('3')} />
            <Line left={13} />
            <Item icon="server" iconColor="#b245f8" title="积分" info={data ? data.integral : null} press={() => null} />
            <Line left={13} />
            <Item icon="credit-card-alt" iconColor="#52db52" title="信用额度" info={data ? data.creditLimit : null} press={() => null} />
          </View>
          <View style={styles.tools}>
            {/*code...*/}
          </View>
        </ScrollView>
      </View>
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
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  headInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  extraText: {
    fontSize: 12,
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
  }
});
