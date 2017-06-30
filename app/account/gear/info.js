import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import Line from '../../../common/line';
import Request from '../../../common/request';
import config from '../../../common/config';
import Font from '../../../common/normSize';
class Info extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '个人信息',
  });
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    this.setState({
      data: this.props.navigation.state.params.data
    });
  }

  componentDidMount() {
    //code...
  }

  /**
   * 换用户头像
   */
  changeAvatar() {
    const options = {
      title: '更改头像',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
      cancelButtonTitle: '取消',
      cameraType: 'front',
      mediaType: 'photo',
      quality: 0.75,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'avatar'
      }
    };
    ImagePicker.showImagePicker(options, (res) => {
      console.log('response:', res);
      if (res.didCancel) {
        console.log('cancel');
      } else if (res.error) {
        console.log('err:', error.message);
      } else {
        storage.save({
          key: 'localAvatar',
          data: res.uri
        });
        this.setState({
          localAvatar: res.uri
        });
      }
    })
  }

  /**
   * 从当前页面传到下个页面的回调，当个人信息改变的时候执行此回调改变State里存储的信息
   */
  changeCallback = (name,value) => {
    console.log(name,value)
    let data = {
      ...this.state.data
    }
    data[name] = value;
    //成功后提交到服务器
    this.setState({
      data: data
    });
    console.log('oooook')
  }

  /**
   * 点击列表去到不同的页面
   */
  goTo(screen, ) {
    const { navigate } = this.props.navigation;
    navigate(screen, { data: this.state.data, callback: this.changeCallback });
  }
  render() {
    const data = this.state.data;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true} />

        <View style={styles.itemList}>
          <TouchableHighlight underlayColor="#ededed" onPress={this.changeAvatar.bind(this)}>
            <View style={styles.item}>
              <View style={styles.cont}>
                <Text style={styles.title}>头像</Text>
                <Image source={{ uri: this.state.localAvatar ? this.state.localAvatar : data.avatar }} style={styles.avatar} />
              </View>
              <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
            </View>
          </TouchableHighlight>
          <Line left={12} />
          <TouchableHighlight underlayColor="#ededed" onPress={this.goTo.bind(this, 'NicknameScreen')}>
            <View style={styles.item}>
              <View style={styles.cont}>
                <Text style={styles.title}>昵称</Text>
                <Text style={styles.text}>{data.nickName}</Text>
              </View>
              <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
            </View>
          </TouchableHighlight>
          <Line left={12} />
          <TouchableHighlight underlayColor="#ededed" onPress={this.goTo.bind(this, 'GenderScreen')}>
            <View style={styles.item}>
              <View style={styles.cont}>
                <Text style={styles.title}>性别</Text>
                <Text style={styles.text}>{data.gender}</Text>
              </View>
              <FontIcon name="angle-right" size={Font(18)} color="#d5d5d5" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  itemList: {
    marginTop: 15,
    backgroundColor: '#fff'
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: Font(13),
    color: '#333'
  },
  cont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee'
  },
  text: {
    fontSize: Font(12),
    color: '#888'
  }
});

//make this component available to the app
export default Info;
