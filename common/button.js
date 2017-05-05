import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
/**
 * onPress 是必须要的属性
 * 通过titleStyle设置文本样式
 */
export default class Button extends Component {
  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={this.props.onPress} style={this.props.style}>
        <Text style={{color: this.props.tintColor ? this.props.tintColor : '#00d7a7',fontSize: this.props.size ? this.props.size : 14}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
});