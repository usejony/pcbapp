import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  Animated,
  TouchableOpacity
} from 'react-native';
import Request from '../../common/request';
import config from '../../common/config';
import Button from '../../common/button';
import LoginModal from '../../common/loginModal';
import Line from '../../common/line';
import Item from './handleItem';

import FontIcon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      loginInfo: [],
      modalVisible: false,
      data: null
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  //fetch请求 
  fetchData() {
    const url = config.api.base + config.api.account;
    const params = {
      accessToken: '杜超'
    }
    Request.Get(url, params)
      .then(data => {
        if (data && data.success) {
          console.log("获取的数据", data.data);
          this.setState({
            data: data.data
          });
        }
      })
  }

  //控制注册登录页面的显示与影藏
  modalVisible(boo) {
    let _this = this;
    _this.setState({
      modalVisible: boo,
    });
  }

  //点击设置按钮打开什么页面。当用户有登录的时候打开设置页面，当用户没有登录的时候打开登录注册页面
  openWhereScreen() {
    const { navigate } = this.props.navigation;
    if (this.state.loginInfo) {
      return navigate('GearScreen');
    }
    this.modalVisible(true);
  }
  //固定渐变头部
  renderFixedHeader() {
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 1]
    });
    const title = this.state.scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [0, 0, 150]
    })
    return (
      <Animated.View style={[
        styles.head,
        {
          transform: [
            {
              translateY: title
            }
          ]
        }
      ]}>
        <Animated.View style={[
          styles.header,
          {
            opacity: opacity
          }
        ]} />
        <TouchableOpacity onPress={this.openWhereScreen.bind(this)} style={styles.gearBtn}>
          <FontIcon name="gear" size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let data = this.state.data;
    console.log('render:', data)
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
          scrollEventThrottle={10}>
          <View style={styles.headerBox}>
            <TouchableOpacity activeOpacity={1} onPress={this.openWhereScreen.bind(this)}>
              {
                data
                  ? <View style={styles.headCont}>
                    {
                      data.avatar
                        ? <Image source={{ uri: data.avatar }} style={styles.avatar} />
                        : <Image source={require('../../imgs/manAvatar.png')} style={styles.avatar}/>
                    }
                    <View>
                      <Text style={styles.nickName}>{data.nickName}</Text>
                      <View style={styles.headInfo}>
                        <Text style={styles.extraText}>个人信息</Text>
                        <FontIcon name="angle-right" size={16} color={'#fff'} />
                      </View>
                    </View>
                  </View>
                  : <View style={styles.headCont}>
                    <Image source={require("../../imgs/manAvatar.png")} style={styles.avatar}/>
                    <View>
                      <Text style={styles.nickName}>点击登录</Text>
                    </View>
                  </View>
              }
            </TouchableOpacity>
          </View>
          <View style={styles.tools}>
            <Item icon="bandcamp" iconColor="#f6af2d" title="余额" info={data ? "￥"+data.useableLimit: null} press={() => alert('3')}/>
            <Line left={13}/>
            <Item icon="server" iconColor="#b245f8" title="积分" info={data ? data.integral: null} press={() => null}/>
            <Line left={13}/>
            <Item icon="credit-card-alt" iconColor="#52db52" title="信用额度" info={data ? data.creditLimit: null} press={() => null}/>
          </View>
          <View style={styles.tools}>

          </View>
          {this.renderFixedHeader()}
        </ScrollView>
        <Modal visible={this.state.modalVisible} animationType={'slide'} >
          <LoginModal closeModal={this.modalVisible.bind(this)} />
        </Modal>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  headerBox: {
    backgroundColor: '#00d7a7',
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
    borderColor: '#8dffe6',
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
    right: 0,
    bottom: 0,
    height: 60,
  },
  header: {
    flex: 1,
    backgroundColor: '#00d7a7'
  },
  gearBtn: {
    width: 48,
    height: 48,
    position: 'absolute',
    right: 0,
    top: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  tools: {
    marginTop: 12
  }
});