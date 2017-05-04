//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

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
  goNewsDetail() {
    Animated.timing(
      this.state.translate,
      {
        toValue: 1,
      }
    ).start();
    this.props.navigation.navigate('NewsCommentScreen');
    console.log('comment.navigation:',this.props.navigation);
  }
  goNewsComment() {
    Animated.timing(
      this.state.translate,
      {
        toValue: 0
      }
    ).start();
    this.props.navigation.navigate('NewsDetailScreen');
  }
  componentDidMount() {
    console.log('tabbar:',this.props.modal)
  }
  render() {
    return (
      <View style={styles.commentInp}>
        <TouchableOpacity activeOpacity={0.9} style={styles.inp}>
          <FontIcon name="pencil" size={15} />
          <Text style={styles.commentText}>评论一下</Text>
        </TouchableOpacity>
        <View style={styles.tabBar}>
          <Animated.View style={[
            styles.tabBox,
            {
              transform: [
                {
                  translateX: this.state.translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70]
                  })
                }
              ],
              opacity: this.state.translate.interpolate({
                inputRange: [0,0.5,1],
                outputRange: [1,0,1]
              })
            }]}>
            <TouchableOpacity activeOpacity={0.9} style={styles.commentIcon} onPress={this.goNewsDetail.bind(this)}>
              <FontIcon name="commenting-o" size={18} color="#00d7a7" />
              <Text style={styles.commentText}>202</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.commentIcon} onPress={this.goNewsComment.bind(this)}>
              <FontIcon name="file-text-o" size={18} color="#00d7a7" />
              <Text style={styles.commentText}>正文</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  commentInp: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inp: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  commentIcon: {
    height: 40,
    width: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  commentText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5
  },
  tabBar: {
    width: 70,
    overflow: 'hidden',
  },
  tabBox: {
    flexDirection: 'row',
  }
});

//make this component available to the app
export default DetailTabBar;
