//import liraries
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import FontIcon from 'react-native-vector-icons/FontAwesome';
// create a component
class HandleItem extends Component {
  static PropTypes = {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
  }
  render() {
    return (
      <TouchableHighlight underlayColor="#aaa" onPress={this.props.press}>
      <View style={styles.item}>
        <View style={styles.leftCont}>
          <View style={styles.iconBox}>
          <FontIcon name={this.props.icon} size={20} color={this.props.iconColor} />
          </View>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.rightCont}>
          {
            this.props.info
              ? <Text style={styles.rightText}>{this.props.info}</Text>
              : null
          }
          <FontIcon name="angle-right" size={15} color="#aaa" />
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  item: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 27,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 13,
    color: '#666',
    marginLeft: 15
  },
  rightCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 12,
    color: '#888',
    marginRight: 10,
  }
});

//make this component available to the app
export default HandleItem;
