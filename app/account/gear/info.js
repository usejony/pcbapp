//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Info extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '个人信息',
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>个人信息</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
});

//make this component available to the app
export default Info;
