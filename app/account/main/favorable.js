import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import Font from '../../../common/normSize';

export default class Favorable extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '优惠'
  });
  state = {}
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.box}>
            <View style={styles.insert}>
              <Text style={styles.title}>优惠券</Text>
              <View style={styles.middle}>
                <Text style={styles.favorable}>
                  555
                <Text style={styles.unit}>个</Text>
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
  favorable: {
    color: '#fc4444',
    fontSize: Font(30),
  },
  unit: {
    fontSize: Font(13)
  }
});