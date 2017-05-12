import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Font from '../common/normSize';
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
        <Text style={{color: this.props.tintColor ? this.props.tintColor : theme6,fontSize: this.props.size ? this.props.size : Font(14)}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
