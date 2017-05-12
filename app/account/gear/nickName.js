import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import Font from '../../../common/normSize';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class Nickname extends Component {
  static navigationOptions = () => ({
    title: '昵称'
  });
  state = {
    nickname: this.props.navigation.state.params.nickname
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.label}>昵称：</Text>
          <TextInput
            style={styles.textInp}
            autoFocus={true}
            clearButtonMode="while-editing"
            value={this.state.nickname}
            selectionColor={theme7}
            onChangeText={(text) => {
              this.setState({
                nickname: text
              })
            }}
            />
        </View>
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
});