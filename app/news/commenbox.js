import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../../common/button.js';
import Font from '../../common/normSize';

export default class Commenbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transY: new Animated.Value(0),
      keyboardHeight: null,
    }
  }

  componentWillMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardWillChange = Keyboard.addListener('keyboardDidChangeFrame',this.keyboardWillChange.bind(this));
  }
  keyboardWillChange(e) {
    console.log(e);
  }
  

  /**
   * 监视键盘的显示，当显示的时候将评论框以动画形态往上移动
   * @param {键盘事件对象} e 
   */
  keyboardDidShow(e) {
    if (!this.state.keyboardHeight) {
      this.setState({
        keyboardHeight: e.startCoordinates.height
      }, () => {
        this.comAnimate(1);
      });
    } else {
      this.comAnimate(1);
    }
  }

  comAnimate(value) {
    Animated.timing(
      this.state.transY,
      {
        toValue: value,
        duration: 400,
      }
    ).start();
  }

  render() {
    return (
      <View style={styles.content}>
        <Animated.View style={[styles.commentBox, {
          transform: [
            {
              translateY: this.state.transY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -this.state.keyboardHeight]
              })
            }
          ]
        }]}>
          <TextInput
            autoFocus={true}
            style={styles.textInp}
            multiline={true}
            placeholder="写下评论...aa"
          />
          <View style={styles.handleBox}>
            <Button title="取消" style={styles.handleBtn} tintColor="#fff" size={13} onPress={() => {
              this.props.closeModal()
            }} />
            <Button title={'评论'} style={styles.handleBtn} tintColor="#fff" size={13} onPress={() => null} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  commentBox: {
    backgroundColor: '#f1f1f1',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10

  },
  textInp: {
    height: Font(70),
    margin: Font(10),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { x: 0, y: 0 },
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: Font(12),
    color: '#333'
  },
  handleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  handleBtn: {
    width: Font(50),
    height: Font(22),
    backgroundColor: '#40ca40',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  }
});