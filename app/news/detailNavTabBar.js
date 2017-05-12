//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, DeviceEventEmitter, } from 'react-native';
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


  goNewsDetail() {
    Animated.timing(
      this.state.translate,
      {
        toValue: 1,
      }
    ).start();
    this.props.navigation.navigate('NewsCommentScreen');
    console.log('comment.navigation:', this.props.navigation);
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

  goComment() {
    storage.load({
      key: 'loginInfo'
    }).then(data => {
      this.props.navigation.navigate('CommentScreen');
    }).catch(err => {
      this.props.navigation.navigate('LoginScreen');
    });
  }

  /**
   * 返回
   */
  goback() {
    Animated.timing(
        this.state.translate,
        {
          toValue: 0,
        }
      ).start();
    this.props.navigation.goBack(null);
  }


  render() {
    return (
      <View style={styles.commentInp}>
        
        <TouchableOpacity activeOpacity={0.9} style={styles.back} onPress={this.goback.bind(this)}>
          <FontIcon name="angle-left" size={Font(28)} color={theme6}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.inp} onPress={this.goComment.bind(this)}>
          <FontIcon name="pencil" size={Font(15)} />
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
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0, 1]
              })
            }]}>
            <TouchableOpacity activeOpacity={0.9} style={styles.commentIcon} onPress={this.goNewsDetail.bind(this)}>
              <FontIcon name="commenting-o" size={Font(18)} color={theme6} />
              <Text style={styles.commentText}>202</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.commentIcon} onPress={this.goNewsComment.bind(this)}>
              <FontIcon name="file-text-o" size={Font(18)} color={theme6} />
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
  back: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInp: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inp: {
    flex: 1,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingHorizontal: 8,
    backgroundColor: '#rgba(0,0,0,.1)',
    borderRadius: 12
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
    fontSize: Font(12),
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
