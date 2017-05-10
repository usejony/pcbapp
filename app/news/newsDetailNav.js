import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, keyboard, DeviceEventEmitter } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

import NewsDetail from './newsDetail';
import NewsComment from './newsComment';
import Button from '../../common/button';
import TabBar from './detailNavTabBar';
import Comment from './comment';
import LoginModal from '../../common/loginModal';

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
      headerTitleStyle: { fontSize: 15, color: '#333', fontWeight: 'normal' },
      headerLeft: (
        <FontIcon name="angle-left" size={25} color={theme6} style={{ padding: 20 }} onPress={() => {
          navigation.goBack(null);
          DeviceEventEmitter.emit('tabBarBack');
        }} />
      ),
    })
  });
/*class NewsDetailNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }
  modalVisible(boo) {
    let that = this;
    that.setState({
      modalVisible: boo
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" animated={true} />
        <NewsDetailStack screenProps={{navigation: this.props.navigation,modalVisible: this.modalVisible.bind(this), name: '杜超'}} />
        <Modal isOpen={this.state.modalVisible} style={styles.modal} position={"bottom"}>
          <Text>发撒会计分录看见爱上咖啡了</Text>
          <TextInput autoFocus={true}/>
        </Modal>
      </View>
    );
  }
}*/
const styles = StyleSheet.create({
  modal: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: "black",
    fontSize: 22
  },
});
//make this component available to the app
export default NewsDetailStack;
