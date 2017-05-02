// 订单主页面里面的待确认、待付款、待收货、退款/售后 自定义按钮组件 
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
// create a component
class Status extends Component {
  static PropTypes = {
    name: React.PropTypes.string.isRequired,
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.press}>
        <View style={styles.container}>
          <FontIcon name={this.props.icon} color={this.props.iconColor} size={16} />
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 11,
    color: '#666',
    marginTop: 8
  }
});

//make this component available to the app
export default Status;
