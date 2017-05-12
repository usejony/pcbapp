import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, keyboard, DeviceEventEmitter } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import NewsDetail from './newsDetail';
import NewsComment from './newsComment';
import Button from '../../common/button';
import TabBar from './detailNavTabBar';
import Comment from './comment';
import LoginModal from '../../common/loginModal';
import Font from '../../common/normSize';

const NewsDetailTab = TabNavigator({
  NewsDetailScreen: {
    screen: NewsDetail,
    navigationOptions: {
      title: '新闻详情'
    }
  },
  NewsCommentScreen: {
    screen: NewsComment,
    navigationOptions: {
      title: '评论详情'
    }
  }
}, {
    initialRouteName: 'NewsDetailScreen',
    tabBarComponent: (props) => <TabBar {...props} />,
    animationEnabled: true,
    tabBarOptions: {
      style: { height: 0, backgroundColor: 'red', overflow: 'hidden'}
    }
  });

const NewsDetailStack = StackNavigator({
  NewsDetailTabScreen: {
    screen: NewsDetailTab
  },
  CommentScreen: {
    screen: Comment
  },
  LoginScreen: {
    screen: LoginModal,
    navigationOptions:{
      header: null
    }
  }
}, {
      mode: 'modal',
      navigationOptions: ({ navigation, screenProps }) => ({
      headerStyle: { backgroundColor: '#f9f9f9' },
      headerTitleStyle: { fontSize: Font(15), color: '#333', fontWeight: 'normal' },
    })
  });

export default NewsDetailStack;
