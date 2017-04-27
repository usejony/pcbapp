import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
const Line = (props) => (
  <View style={[styles.line,{left: props.left ? props.left : 0}]}/>
);

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
  }
});

export default Line;