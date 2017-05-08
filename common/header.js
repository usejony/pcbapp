//import liraries
import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const { width } = Dimensions.get('window');
// create a component
class Header extends Component {
  render() {
    return (
      <View style={[styles.header,this.props.style]}>
        {
          this.props.title
            ? <Text style={[styles.title,{color: this.props.tintColor ? this.props.tintColor : "#fff" }]}>{this.props.title}</Text>
            : null
        }
        {
          this.props.leftIcon
            ? <TouchableOpacity activeOpacity={1} onPress={this.props.leftHandle} style={styles.leftBtn}>
              {this.props.leftIcon}
            </TouchableOpacity>
            : null
        }
        {
          this.props.rightIcon
            ? <TouchableOpacity activeOpacity={1} onPress={this.props.rightHandle} style={styles.rightBtn}>
              {this.props.rightIcon}
            </TouchableOpacity>
            : null
        }
      </View>
    );
  }
}

// define your styles
const styles = EStyleSheet.create({
  header: {
    backgroundColor: '$theme6',
    height: 64,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
  },
  leftBtn: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 18,
    left: 0
  },
  rightBtn: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 18,
    right: 0
  }
});

//make this component available to the app
export default Header;
