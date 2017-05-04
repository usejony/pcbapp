//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
// create a component
class NewsComment extends Component {
	/*static navigationOptions = ({navigation}) => ({
		headerLeft: (
			<FontIcon name="angle-left" size={25} color="#00d7a7" style={{ padding: 20 }} onPress={() => {
          navigation.goBack(null);
        }} />
		)
	});*/
  render() {
    return (
      <View style={styles.container}>
        <Text>NewsComment</Text>
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
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default NewsComment;
