import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  Animated,
  TouchableOpacity
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Button from '../../common/button';
import Font from '../../common/normSize';
const { width, height } = Dimensions.get('window');

export default class Search extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTintColor: '#00d7a7',
    headerTitleStyle: { backgroundColor: 'red' }
  });
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }
  renderFixedHeader() {
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1]
    });
    let title = this.state.scrollY.interpolate({
      inputRange: [0, 500],
      outputRange: [0, 0]
    });
    return (
      <Animated.View style={[styles.head,{transform: [{translateY: this.state.scrollY}]}]}>
        <Animated.View style={[styles.header, { opacity: opacity }]}>
          <Text style={{ fontSize: Font(16), color: '#fff' }}>水电费</Text>
        </Animated.View>
        <TouchableOpacity style={styles.icon} activeOpacity={1} onPress={() => null}>
          <FontIcon name="gear" size={Font(28)} color="#fff"/>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  render() {

    return (
      <View style={styles.container}>
        <ScrollView onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )
        }
          scrollEventThrottle={5}>
          <View style={{ height: 1500, backgroundColor: '#00d7a7' }}>
            <Text>撒大家</Text>
          </View>
        {this.renderFixedHeader()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    width: width - 30,
    height: 25,
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  container: {
    flex: 1,
    backgroundColor: '#00d7a7'
  },
  head: {
    position: 'absolute',
    top:0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: 64,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'red',
    alignItems: 'center',
    paddingBottom: 10
  },
  icon: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'transparent'
  }
})