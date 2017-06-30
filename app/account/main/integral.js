import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Font from '../../../common/normSize';

export default class Integral extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '我的积分'
  });
  state = {}
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.box}>
            <View style={styles.insert}>
              <Text style={styles.title}>当前积分</Text>
              <View style={styles.middle}>
                <Text style={styles.integral}>
                  555
                <Text style={styles.unit}>分</Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  box: {
    padding: 3,
    backgroundColor: '$theme6'
  },
  insert: {
    backgroundColor: '#fafafa',
    borderRadius: 3,
    overflow: 'hidden',
    padding: 8
  },
  title: {
    color: '#666',
    fontSize: Font(10)
  },
  middle: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'flex-end',
  },
  integral: {
    color: '#1cc61c',
    fontSize: Font(30),
  },
  unit: {
    fontSize: Font(13)
  }
});