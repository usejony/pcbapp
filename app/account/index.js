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

import FontIcon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
/*export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: [],
      modalVisible: false,
      data: null
    }
  }
  componentWillMount() {
    this.fetchData();
  }
  fetchData() {
    const url = config.api.base + config.api.account;
    const params = {
      accessToken: '杜超'
    }
    Request.Get(url, params)
      .then(data => {
        if (data && data.success) {
          // console.log("获取的数据", data.data);
          this.setState({
            data: data.data
          })
        }
      })
  }
  modalVisible(boo) {
    let _this = this;
    _this.setState({
      modalVisible: boo,
    });
  }
  render() {
    const data = this.state.data;
    const { navigate } = this.props.navigation;
    // console.log(data);
    if (this.state.data) {
      return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} onScroll={(e) => console.log(e)}>
            <View style={styles.head}>
              <FontIcon name="gear" size={20} style={{ paddingHorizontal: 15 }} color="#fff" onPress={() => {
                if (this.state.loginInfo) {
                  return navigate('GearScreen');
                }
                this.modalVisible(true);
              }} />
            </View>
            <View style={styles.headerBox}>
              {
                !data.avatar
                  ? <Image source={{ uri: data.avatar }} style={styles.avatar} />
                  : <Image source={require("../../imgs/WechatIMG14.png")} style={styles.avatar} />
              }
          

            </View>
            <View style={styles.tools}>
              <Text onPress={() => {
                if (this.state.loginInfo) {
                  return navigate('GearScreen');
                }
                this.modalVisible(true);
              }}>打开</Text>
              <Modal visible={this.state.modalVisible} animationType={'slide'} >
                <LoginModal closeModal={this.modalVisible.bind(this)} />
              </Modal>
            </View>
          </ScrollView>
        </View>
      )
    } else {
      return null
    }
  }
}*/

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }
  _renderFixHeader() {
    //固定Title
    let title = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 0]
    });
    //根据滑动距离改变透明度
    let opacity = this.state.scrollY.interpolate({
      inputRange: [0, 250 - 50],
      outputRange: [0, 1]
    });
    //收藏图标
    
    return (
      <Animated.View
        style={[styles.header, { transform: [{ translateY: title }], }]}>
        {/*电影名称*/}
        <Animated.View style={[styles.headerBackground, { opacity: opacity }]}>
          <View style={styles.headerTitle}>
            <View><Text style={styles.headerTitleText}>哈哈</Text></View>
          </View>
        </Animated.View>
        <View style={styles.headerTitle}>
          {/*返回*/}
          <TouchableOpacity
            style={{ position: "absolute", left: 10, }}
          >
            <FontIcon name={"angle-left"} size={25} color="red"/>
          </TouchableOpacity>
         
         
        </View>
      </Animated.View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
          scrollEventThrottle={16}
          style={{
            flex:1,
            backgroundColor: 'red',
          }}
        >
          <View style={{height: 1000}}></View>
        </ScrollView>
        {this._renderFixHeader()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9'
  },
  head: {
    height: 56,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#00d7a7',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15
  },
  headerBox: {
    height: 80,
    backgroundColor: '#00d7a7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 56
  },
  avatar: {
    width: 60,
    height: 60,
    borderColor: '#8dffe6',
    borderWidth: 3,
    borderRadius: 30,
    marginRight: 20
  },
  headInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  nickName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoBtn: {
    marginRight: 3
  },
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: 50,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitleText: {
    color: 'white',
    fontSize: 18,
  },
  headerBackground: {
    backgroundColor: "#1d2635",
    height: 50
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
});