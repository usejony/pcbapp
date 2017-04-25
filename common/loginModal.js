//登录模块
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

import Button from './button';

const { width } = Dimensions.get('window');
class Enter extends Component {
  // static navigationOptions = {
  //   title: '阿萨德飞机阿斯蒂芬',
  //   header: {
  //     left: <Text>asdf </Text>
  //   }
  // };
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }
  componentDidMount() {
    console.log("enter:", this.props)
  }
  loginIn() {

  }
  loginFail() {

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <View style={[styles.inpBox, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
            <Text style={styles.title}>账号</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              keyboardType="email-address"
              onChangeText={(userName) => this.setState({ userName })}
              placeholder="请输入账号" />
          </View>
          <View style={styles.inpBox}>
            <Text style={styles.title}>密码</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(password) => this.setState({ password })}
              placeholder="请输入密码" />
          </View>
        </View>
        <TouchableOpacity onPress={this.loginIn.bind(this)} style={styles.loginBtn} activeOpacity={0.8}>
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.err} onPress={this.loginFail.bind(this)} activeOpacity={0.6}>
          <Text style={styles.errText}>无法登录？</Text>
        </TouchableOpacity>
        <Text onPress={() => this.props.screenProps.closeModal(false)}>关闭</Text>
      </View>
    );
  }
}

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }
  onEnroll() {

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <View style={[styles.inpBox, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
            <Text style={styles.title}>账号</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(userName) => this.setState({ userName })}
              placeholder="请输入账号" />
          </View>
          <View style={styles.inpBox}>
            <Text style={styles.title}>密码</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(password) => this.setState({ password })}
              placeholder="请输入密码" />
          </View>
        </View>
        <TouchableOpacity onPress={this.onEnroll.bind(this)} style={styles.loginBtn} activeOpacity={0.8}>
          <Text style={styles.loginText}>注册</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const LoginNav = StackNavigator({
  EnterScreen: {
    screen: Enter,
    /*navigationOptions: {
      title: '登录',
      header: (navigation) => ({
        backTitle: null,
        left: (
          <Icon name={"ios-close"} size={35} color={'#fff'} style={{ marginLeft: 15 }} onPress={
              () => console.log(navigation)
            } />
        ),
        right: (
          <Button title="注册" onPress={() => navigation.navigate('EnrollScreen',{user: '独宠'})} style={{ marginRight: 15 }} tintColor="#FFF" size={15} />
        ),
        style: { backgroundColor: '#00d7a7' },
        titleStyle: { color: '#fff' }
      })
    }*/
  },
  EnrollScreen: {
    screen: Enroll,
    // navigationOptions: {
    //   title: (screenProps) => `${screenProps.name}阿萨德`,
    //   header: {
    //     style: { backgroundColor: '#00d7a7' },
    //     titleStyle: { color: '#fff', },
    //     tintColor: '#fff'
    //   }
    // }
  }
}, {
    initialRouteName: 'EnterScreen',
    mode: 'card',
    headerMode: 'screen',
    navigationOptions: {
      header: {
        backTitle: '返回',
        style: {
          backgroundColor: 'red'
        },
        titleStyle: {
          color: 'green'
        }
      }
    }
  });

class LoginStack extends Component {
  componentDidMount() {
    console.log('阿斯蒂芬：', this.props)
  }
  render() {
    return (
      <LoginNav screenProps={{...this.props}} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginBox: {
    marginLeft: 15,
    marginTop: 15,
    borderColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inpBox: {
    flexDirection: 'row',
    paddingBottom: 12,
    marginTop: 15,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    marginLeft: 15,
    fontSize: 13
  },
  title: {
    color: '#555',
    fontSize: 14,
  },
  loginBtn: {
    width: width - 40,
    alignSelf: 'center',
    backgroundColor: '#00d7a7',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  err: {
    marginTop: 15,
  },
  errText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center'
  }
});

export default LoginStack;
