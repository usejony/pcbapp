//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Button from '../../common/button';
import Font from '../../common/normSize';

const { width } = Dimensions.get('window');
// create a component
class DetailTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: new Animated.Value(0),
      modalVisible: false
    }
  }

  componentWillMount() {
    storage.load({ key: 'loginInfo' })
      .then(data => {
        this.setState({
          loginInfo: data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <View style={styles.commentInp}>
        <TouchableOpacity activeOpacity={0.9} style={styles.inp} onPress={this.props.showComment}>
          <Text style={styles.commentText}>评论一下...</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.commentIcon} onPress={this.props.iconPress}>
          <FontIcon name={this.props.icon} size={Font(18)} color={theme6} />
          <Text style={styles.commentText}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  back: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInp: {
    height: 46,
    paddingHorizontal: 15,
    backgroundColor: '#f2f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inp: {
    flex: 1,
    height: 30,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOffset: { x: 0, y: 0 },
    marginHorizontal: 3,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  commentIcon: {
    height: 40,
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  commentText: {
    fontSize: Font(12),
    color: '#666',
    marginLeft: 5
  },
});

//make this component available to the app
export default DetailTabBar;
