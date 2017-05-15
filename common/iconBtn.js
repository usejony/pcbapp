import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class IconBtn extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired,
  }
  state = {}
  render() {
    return (
      <TouchableOpacity style={[styles.touch,this.props.style]} onPress={this.props.onPress}>
        <Icon name={this.props.name} size={this.props.size ? this.props.size : 40} color={this.props.color ? this.props.color : '#fff' } />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    paddingHorizontal: 12,
  }
});