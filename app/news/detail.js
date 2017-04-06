import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Footer from '../../common/newsFooter';

const { width } = Dimensions.get('window');
export default class Details extends Component {
  static navigationOptions = {
    title: '详情'
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount() {
    // this.props.navigation
  }
  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{data.date}</Text>
          <Image source={{uri:data.img}} style={styles.img}/>
          <Text style={styles.description}>{data.description}</Text>
        </View>
        <Footer/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 18,
    color: '#111',
    lineHeight: 20
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginTop: 10
  },
  img: {
    width: width - 40,
    height: (width - 40) * 0.56,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginTop: 10,
  }
});
