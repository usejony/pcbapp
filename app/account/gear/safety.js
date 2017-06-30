//账户与安全页面
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';

import Line from '../../../common/line';
import Font from '../../../common/normSize';
class Safety extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '账户与安全',
  });
  showPhone(phone) {
    let ary = phone.split('');
    ary.splice(3,4,'*','*','*','*');
    let str = '';
    for(let i = 0; i < ary.length; i++) {
      str += ary[i];
    }
    return str;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true}/>
        <View style={styles.itemList}>
              <TouchableHighlight underlayColor="#ededed" onPress={() => null}>
                <View style={styles.item}>
                  <View style={styles.cont}>
                    <Text style={styles.title}>换绑手机</Text>
                    <Text style={styles.text}>{this.showPhone('15971057587')}</Text>
                  </View>
                  <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
                </View>
              </TouchableHighlight>
              <Line left={12} />
              <TouchableHighlight underlayColor="#ededed" onPress={() => null}>
                <View style={styles.item}>
                  <View style={styles.cont}>
                    <Text style={styles.title}>登录密码</Text>
                    <Text style={styles.text}>修改</Text>
                  </View>
                  <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
                </View>
              </TouchableHighlight>
            </View>
            <View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',   
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
    fontSize: Font(13),
    color: '#333'
  },
  cont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8
  },
  text: {
    fontSize: Font(12),
    color: '#888'
  }
});


export default Safety;
