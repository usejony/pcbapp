import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import Dash from 'react-native-dash';

import Button from '../../../common/button';
import Font from '../../../common/normSize';

const { width } = Dimensions.get('window');
export default class Address extends Component {
  state = {}

  componentWillMount() {
    this.setState({
      address: this.props.navigation.state.params.address
    });
  }
  addAddress() {

  }
  renderAddress() {
    const { address } = this.state;
    return (
      address.map((item, index) => {
        return (
          <View style={styles.item} key={index}>
            <View style={styles.head}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.phone}</Text>
            </View>
            <Text style={styles.site}>{item.site}</Text>
            <Dash dashGap={5} dashLength={10} dashColor={'#aaa'} style={{ width, marginTop: 10 }} dashStyle={{ height: StyleSheet.hairlineWidth }} />
            <View style={styles.handleBox}>
              <TouchableWithoutFeedback onPress={() => null}>
                <View style={styles.setNormal}>
                  <Icon name={item.normal ? "ios-radio-button-off" : "ios-radio-button-on"} color={theme5} size={20} />
                  <Text style={styles.setText}>设为默认地址a </Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.handle}>
                <Button title={"编辑"} style={styles.handleBtn} size={Font(13)} tintColor="#333" onPress={() => null} />
                <Button title={"删除"} style={styles.handleBtn} size={Font(13)} tintColor="#333" onPress={() => null} />
              </View>
            </View>
          </View>
        );
      })
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {this.renderAddress()}
        </ScrollView>
        <Button title="新增收货地址" style={styles.btn} tintColor='#fff' onPress={this.addAddress.bind(this)} />
      </View>
    );
  }
}


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: '#efefef'
  },
  btn: {
    width,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d15656',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  item: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  head: {
    marginVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Font(13),
    color: '#333'
  },
  site: {
    fontSize: Font(10),
    color: '#555',
    paddingHorizontal: 15
  },
  handleBox: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  setNormal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  setText: {
    fontSize: Font(12),
    color: '#444',
    marginLeft: 3,
  },
  handle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  handleBtn: {
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#aaa',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3
  }
});