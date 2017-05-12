//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Font from '../../../common/normSize';
// create a component
class WaitPay extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.touch}>
          <Image source={require('../../../imgs/noData.png')} style={styles.loadImg} />
          <Text style={styles.largeText}>您还没有相关订单</Text>
          <Text style={styles.smallText}>去下一单试试吧</Text>
        </View>
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
  touch: {
    flex: 1,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeText: {
    fontSize: Font(12),
    color: '#222',
  },
  smallText: {
    fontSize: Font(10),
    color: '#888',
    marginTop: 8
  },
  loadImg: {
    resizeMode: 'contain',
    width: 150,
    height: 150
  }
});

//make this component available to the app
export default WaitPay;
