//评论页面
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, ScrollView, Alert } from 'react-native';

import Button from '../../common/button';

class Comment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '评论',
    headerLeft: (
      <Button title="关闭" onPress={() => {
        navigation.goBack(null);
      }} style={{padding: 15}}/>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      submiting: false
    }
  }
  submit() {
    if(this.state.comment === '') {
      return Alert.alert('评论内容不能为空');
    }
    this.setState({
      submiting: true,
    });
    this.timer = setTimeout(() => {
      this.setState({
        submiting: false,
        comment: ''
      });
      this.props.navigation.goBack(null);
    },2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true} />
        <ScrollView keyboardShouldPersistTaps="always">
          <TextInput
            style={styles.textInp}
            multiline={true}
            value={this.state.comment}
            placeholder="写下你的精彩评论!"
            onChangeText={(text) => {
              this.setState({
                comment: text
              });
            }}
          />
          <Button title={this.state.submiting ? "评论提交中..." : "提交评论"} size={14} tintColor="#fff" onPress={this.submit.bind(this)} style={styles.submit} />
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  textInp: {
    padding: 10,
    fontSize: 13,
    color: '#444',
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 15,
    height: 150,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 }
  },
  submit: {
    height: 35,
    marginHorizontal: 30,
    backgroundColor: '#00d7a7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 30
  }
});

export default Comment;
