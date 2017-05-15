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
  StatusBar,
  Alert,
} from 'react-native';
//第三方组件
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import EStyleSheet from 'react-native-extended-stylesheet';

//自定义组件
import Button from './button';
import Request from './request';
import config from './config';
import Font from './normSize';
import IconBtn from './iconBtn';

const { width } = Dimensions.get('window');
class Enter extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "登录",
    headerRight: (
      <Button title="注册" onPress={() => navigation.navigate('EnrollScreen')} style={{ marginRight: 8,paddingVertical: 6, paddingHorizontal: 8 }} tintColor="#FFF" size={Font(15)} />
    ),
    headerLeft: (
      <IconBtn name="ios-close" onPress={() => {
          navigation.goBack(null);
        }} style={{marginLeft: 5}}/>
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
    console.log("enter:", this.props);
  }

  /**
   * loginIn: 点击登录成功后将登录信息保存到本地storage里面
   */
  loginIn() {
    let { userName, password } = this.state;
    if (userName === '' || password === '') {
      Alert.alert('账户名或密码不能为空');
      return;
    }
    const params = {
      userName,
      password
    };
    const url = config.api.base + config.api.account;
    Request.Post(url, params)
      .then(data => {
        if (data && data.success) {
          //当成功获取到用户信息的时候，将用户的信息保存到本地storage;
          storage.save({
            key: 'loginInfo',
            data: data
          });
          console.log('成功获取到的数据：', data);
          DeviceEventEmitter.emit('logined');
          this.props.navigation.goBack(null);
        }
      })
      .catch(err => {
        console.log('登录失败！没有获取到用户信息:', err);
      });
  }

  loginFail() {
    //点击无法登录的的处理
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' animated={true} />
        <View style={styles.loginBox}>
          <View style={[styles.inpBox]}>
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
  };
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
        <StatusBar barStyle='light-content' animated={true} />
        <View style={styles.loginBox}>
          <View style={[styles.inpBox]}>
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
    navigationOptions: {
      headerStyle: { backgroundColor: "#47B2EA" },
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginBox: {
    marginLeft: 15,
    marginTop: 15,
  },
  inpBox: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd'
  },
  input: {
    flex: 1,
    marginLeft: 15,
    fontSize: Font(13),
  },
  title: {
    color: '#555',
    fontSize: Font(14),
  },
  loginBtn: {
    width: width - 40,
    alignSelf: 'center',
    backgroundColor: '$theme6',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  loginText: {
    fontSize: Font(14),
    color: '#fff',
    textAlign: 'center'
  },
  err: {
    marginTop: 15,
  },
  errText: {
    color: '#666',
    fontSize: Font(12),
    textAlign: 'center'
  }
});

export default LoginNav;
