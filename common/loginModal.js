//登录模块
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
//第三方组件
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import Toast from 'react-native-easy-toast';

//自定义组件
import Button from './button';
import Request from './request';
import config from './config';

const { width } = Dimensions.get('window');
class Enter extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "登录",
    headerRight: (
      <Button title="注册" onPress={() => navigation.navigate('EnrollScreen', { user: '独宠' })} style={{ marginRight: 15 }} tintColor="#FFF" size={15} />
    ),
    headerLeft: (
      <Icon name={"ios-close"} size={35} color={'#fff'} style={{ marginLeft: 15 }} onPress={
        () => navigation.goBack(null)
      } />
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }
  componentWillMount() {
    // alert()
  }
  componentDidMount() {
    storage.remove({key: 'loginInfo'});
    console.log("enter:", this.props);
  }

  /**
   * loginIn: 点击登录成功后将登录信息保存到本地storage里面
   */
  loginIn() {
    const { navigate } = this.props.navigation;
    let that = this;
    let { userName, password } = this.state;
    if(userName === '') {
      this.refs.toast.show('账户名不能为空');
      return;
    }
    if(password === '') {
      this.refs.toast.show('密码不能为空');
      return;
    }
    const params = {
      userName,
      password
    }
    const url = config.api.base + config.api.account;
    Request.Post(url,params)
      .then(data => {
        if(data && data.success) {
          //当成功获取到用户信息的时候，将用户的信息保存到本地storage;
          storage.save({
            key: 'loginInfo',
            rawData: data
          });
          console.log('成功获取到的数据：',data);
          DeviceEventEmitter.emit('logined');
          this.props.navigation.goBack(null);
        }
      })
      .catch(err => {
        console.log('登录失败！没有获取到用户信息:',err);
      });
  }

  loginFail() {
    //点击无法登录的的处理
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
        <TouchableOpacity onPress={this.loginIn.bind(this)} style={styles.loginBtn} activeOpacity={0.8}>
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.err} onPress={this.loginFail.bind(this)} activeOpacity={0.6}>
          <Text style={styles.errText}>无法登录？</Text>
        </TouchableOpacity>
         <Toast ref="toast" opacity={0.5} position="top" positionValue={250} style={{ padding: 5 }} />
      </View>
    );
  }
}

class Enroll extends Component {
  static navigationOptions = {
    title: '注册',
  }
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    }
  }
  /**
   * onEnroll：点击注册的事件
   */
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
  },
  EnrollScreen: {
    screen: Enroll
  }
}, {
    initialRouteName: 'EnterScreen',
    // mode: 'card',
    // headerMode: 'screen',
    navigationOptions: {
      headerStyle: { backgroundColor: "#00d7a7" },
      headerTintColor: '#fff',
      headerTitleColor: '#fff',
      headerBackTitle: null,
      cardStack: {
        gesturesEnabled: true
      }
    }
  });

// class LoginStack extends Component {
//   componentDidMount() {
//     console.log('阿斯蒂芬：', this.props)
//   }
//   render() {
//     return (
//       <LoginNav screenProps={{...this.props}} />
//     );
//   }
// }

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

export default LoginNav;
