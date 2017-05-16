import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Picker from 'react-native-picker';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Font from '../../../common/normSize';

export default class Birthday extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '性别',
    headerLeft: (
      <FontIcon name="angle-left" size={Font(25)} color={theme6} style={{ paddingHorizontal: Font(15) }} onPress={() => {
        if (Picker.isPickerShow) {
          Picker.hide();
          navigation.goBack(null);
        }
        navigation.goBack(null);
      }} />
    )
  });
  state = {
    gender: this.props.navigation.state.params.gender,
  }
  
  /**
   * 点击性别的时候呼出选择框
   */
  showModal() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['男', '女'],
      selectedValue: [this.state.gender],
      onPickerSelect: (choose) => {
        this.setState({
          gender: choose
        })
      },
      onPickerConfirm: (choose) => {
        console.log('confirm:',choose);
      }
    });
    Picker.toggle();
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.showModal.bind(this)}>
          <View style={styles.box}>
            <Text style={styles.label}>性别：</Text>
            <Text style={styles.gender}>{this.state.gender}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  box: {
    backgroundColor: '#fff',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 20,
    borderColor: '$theme7',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: Font(13),
    color: '#333',
  },
  gender: {
    fontSize: Font(12),
    color: '#888',
    marginLeft: 10
  }
});