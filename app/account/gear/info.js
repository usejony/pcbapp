import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Line from '../../../common/line';
import Request from '../../../common/request';
import config from '../../../common/config';
class Info extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '个人信息',
  });
  constructor(props) {
    super(props);
    this.state = {
      // loginInfo: null
    }
  }
  componentWillMount() {
    this.fetchData();
  }

  //请求用户个人信息
  fetchData() {
    const params = {
      accessToken: '杜超'
    },
      url = config.api.base + config.api.account;
    Request.Get(url, params)
      .then(data => {
        this.setState({
          loginInfo: data.data
        });
      })
      .catch(err => {
        console.log('请求信息个人信息失败:', err.message);
      });
  }

  componentDidMount() {
    
  }
  render() {
    const data = this.state.loginInfo;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true} />
        {
          this.state.loginInfo
            ? <View style={styles.itemList}>
              <TouchableHighlight underlayColor="#ededed" onPress={() => null}>
                <View style={styles.item}>
                  <View style={styles.cont}>
                    <Text style={styles.title}>头像</Text>
                    <Image source={{ uri: data.avatar }} style={styles.avatar} />
                  </View>
                  <FontIcon name="angle-right" size={18} color="#d5d5d5" />
                </View>
              </TouchableHighlight>
              <Line left={12} />
              <TouchableHighlight underlayColor="#ededed" onPress={() => null}>
                <View style={styles.item}>
                  <View style={styles.cont}>
                    <Text style={styles.title}>昵称</Text>
                    <Text style={styles.text}>{data.nickName}</Text>
                  </View>
                  <FontIcon name="angle-right" size={18} color="#d5d5d5" />
                </View>
              </TouchableHighlight>
              <Line left={12} />
              <TouchableHighlight underlayColor="#ededed" onPress={() => null}>
                <View style={styles.item}>
                  <View style={styles.cont}>
                    <Text style={styles.title}>生日</Text>
                    <Text style={styles.text}>{data.birthday}</Text>
                  </View>
                  <FontIcon name="angle-right" size={18} color="#d5d5d5" />
                </View>
              </TouchableHighlight>
              <Line left={12} />
              <TouchableHighlight underlayColor="#ededed" onPress={() => null}>
                <View style={styles.item}>
                  <View style={styles.cont}>
                    <Text style={styles.title}>收货地址</Text>
                    <Text style={styles.text}>添加/修改</Text>
                  </View>
                  <FontIcon name="angle-right" size={18} color="#d5d5d5" />
                </View>
              </TouchableHighlight>
            </View>
            : <ActivityIndicator style={{ marginTop: 20 }} />
        }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  itemList: {
    marginTop: 15,
    backgroundColor: '#fff'
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 13,
    color: '#333'
  },
  cont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee'
  },
  text: {
    fontSize: 12,
    color: '#888'
  }
});

//make this component available to the app
export default Info;
