import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import Button from '../../common/button';

const a = "阿斯蒂芬"
const { width, height } = Dimensions.get('window');

export default class Search extends Component {
  static navigationOptions = {
    header: (navigation) => ({
      title: (
        <View style={{width,height:28,flexDirection: 'row',justifyContent: 'space-between',alignItems:'center',paddingHorizontal:15}}>
          <TextInput autoFocus={true} keyboardType="email-address" style={{width:width - 70,paddingVertical:1,paddingHorizontal:10,fontSize: 14, color: '#444',backgroundColor: 'rgba(0,0,0,.1)',borderRadius: 8}} placeholder="请输入订单编号"/>
          <Button title="取消" onPress={() => navigation.goBack()}/>
        </View>
      ),
      left: null,
      tintColor: '#00d7a7',
      titleStyle: {backgroundColor:'red'}
    })
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View>
        <StatusBar barStyle="default" animated={true}/>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    width: width - 30,
    height:25,
    backgroundColor: 'rgba(0,0,0,.2)'
  }
})