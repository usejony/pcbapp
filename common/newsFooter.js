import React , { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';

import Font from './normSize'

const { width } = Dimensions.get('window');
const Footer = () => (
  <View style={styles.container}>
    <Text style={styles.title}>关注[百能拼客联盟]微信公众平台，了解更多行业资讯和最新动态！（微信号：PCBPP_CN）</Text>
    <Image source={require('../imgs/wxCode.jpg')} style={styles.img}/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },
  title: {
    fontSize: Font(14),
    color: '#666',
    paddingVertical:15,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  img: {
    width: width * 0.3,
    height: width * 0.3,
  }
});

export default Footer;