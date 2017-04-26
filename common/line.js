import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
const Line = (props) => (
  <View style={[styles.line,{marginLeft: props.left ? props.left : 0}]}/>
);

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e5e5',
  }
});

export default Line;