import React, { Component } from 'react';
import {
  StyleSheet,
  PixelRatio,
  View,
  Text,
} from 'react-native';

import Font from './normSize';
export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.content}>{this.props.children}</Text>
        </View>
        <View style={styles.line}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#eee',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  line: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eee',
    marginLeft: 20
  },
  title: {
    color: '#333',
    fontSize: Font(14),
    marginRight: 10,
  },
  content: {
    color: '#555',
    fontSize: Font(13),
    flex: 1,
    textAlign: 'right'
  }
});