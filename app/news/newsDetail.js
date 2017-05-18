import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Modal,
  Keyboard,
  DeviceEventEmitter,
  Animated
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Footer from '../../common/newsFooter';
import BottomTabBar from './detailNavTabBar';
import Font from '../../common/normSize';
import Commentbox from './commenbox';

const { width } = Dimensions.get('window');
export default class NewsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  goComment() {
    const { navigate } = this.props.navigation;
    navigate('NewsCommentScreen')
  }

  showCommentBox() {
    this.setState({
      modalVisible: true
    })
  }

  closeModal(e) {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true} />
        <ScrollView>
          <View style={styles.scrollView}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.date}>{data.date}</Text>
            <Image source={{ uri: data.img }} style={styles.img} />
            <Text style={styles.description}>{data.description}</Text>
          </View>
          <Footer />
        </ScrollView>
        <Modal animationType={'fade'} style={styles.modal} transparent={true} visible={this.state.modalVisible} onRequestClose={this.closeModal.bind(this)}>
          <Commentbox closeModal={this.closeModal.bind(this)} />
        </Modal>
        <BottomTabBar icon="comments-o" text={'520'} showComment={this.showCommentBox.bind(this)} iconPress={this.goComment.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  title: {
    fontSize: Font(18),
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 25
  },
  date: {
    color: '#666',
    fontSize: Font(12),
    marginTop: 10
  },
  img: {
    width: width - 40,
    height: (width - 40) * 0.56,
    marginTop: 10,
    alignSelf: 'center'
  },
  description: {
    fontSize: Font(14),
    color: '#333',
    lineHeight: 20,
    marginTop: 10,
    alignSelf: 'center'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.2)'
  }
});