import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Footer from '../../common/newsFooter';

const { width } = Dimensions.get('window');
class Details extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '详情',
    headerLeft: (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        screenProps.goBack()
      }} >
        <FontIcon name="angle-left" size={28} color="#fff" style={{ paddingHorizontal: 15 }} />
      </TouchableOpacity>
    )
  });
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount() {
    // this.props.navigation
  }
  render() {
    const data = this.props.screenProps.state.params.data;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{data.date}</Text>
          <Image source={{ uri: data.img }} style={styles.img} />
          <Text style={styles.description}>{data.description}</Text>
        </View>
        <Footer />
      </ScrollView>
    );
  }
}

const DetailsNav = StackNavigator({
  DetailsScreen: {
    screen: Details
  }
}, {
    navigationOptions: {
      headerStyle: { backgroundColor: '#00d7a7' },
      headerTitleStyle: { color: '#fff' },

    }
  });

const DetailsStack = ({ navigation }) => (
  <DetailsNav screenProps={navigation} />
);

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

export default DetailsStack;