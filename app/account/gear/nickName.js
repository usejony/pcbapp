import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import Font from '../../../common/normSize';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../../common/button';
import closeKeyboard from '../../../common/closeKeyboard';
import IconBtn from '../../../common/iconBtn';

export default class Nickname extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '昵称',
    headerLeft: (
      <IconBtn name="ios-arrow-back" size={25} color={theme6} onPress={() => {
        closeKeyboard();
        navigation.goBack();
      }} />
    ),
  });
  state = {
    // data: this.props.navigation.state.params.data
  }
  componentWillMount() {
    this.setState({
      nickName: this.props.navigation.state.params.data.nickName
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.label}>昵称：</Text>
          <TextInput
            style={styles.textInp}
            clearButtonMode="while-editing"
            value={this.state.nickName}
            selectionColor={theme7}
            onChangeText={(text) => {
             this.setState({
               nickName: text
             });
            }}
          />
        </View>
        <Button title="保存" style={styles.submit} tintColor="#fff" size={14} onPress={() => {
          this.props.navigation.state.params.callback('nickName',this.state.nickName)
        }} />
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
    marginTop: 20,
    marginHorizontal: 15,
    borderColor: '$theme7',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6
  },
  label: {
    fontSize: Font(13),
    color: '#333'
  },
  textInp: {
    flex: 1,
    height: 25,
    fontSize: Font(12),
    color: '#333',
    marginLeft: 10
  },
  submit: {
    marginHorizontal: 100,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '$theme5',
    marginTop: 20
  }
});