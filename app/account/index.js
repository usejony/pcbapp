import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
} from 'react-native';
import Request from '../../common/request';
import config from '../../common/config';
import Button from '../../common/button';
import LoginModal from '../../common/loginModal';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          // console.log(data.data);
          this.setState({
            data: data.data
          })
        }
      })
  }
  closeModal(boo) {
    let _this = this;
    _this.setState({
      modalVisible: boo,
    });
  }
  render() {
    const data = this.state.data;
    console.log(data);
    if (this.state.data) {
      return (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              {
                !data.avatar
                  ? <Image source={{ uri: data.avatar }} style={styles.avatar} />
                  : <Image source={require("../../imgs/WechatIMG14.png")} style={styles.avatar} />
              }
              <View style={styles.headCont}>
                <Text style={styles.nickName}>{data.nickName}</Text>
                <View style={styles.headInfo}>
                  <Button title="个人信息" size={12} tintColor="#fff" style={styles.infoBtn} onPress={() => null} />
                  <Icon name="ios-arrow-forward" size={14} color="#fff" />
                </View>
              </View>
            </View>
            <View style={styles.tools}>
              <Text onPress={() => this.setState({modalVisible: true})}>打开</Text>
              <Modal visible={this.state.modalVisible} animationType={'slide'} >
                <LoginModal closeModal={this.closeModal.bind(this)} name="杜超"/>
              </Modal>
            </View>
          </ScrollView>
        </View>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9'
  },
  header: {
    height: 80,
    backgroundColor: '#00d7a7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
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
  }
});