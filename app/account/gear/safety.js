//import liraries
//账户与安全页面
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Safety extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '账户与安全'
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>Safety</Text>
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
export default Safety;
