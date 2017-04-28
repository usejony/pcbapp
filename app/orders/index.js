//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import Header from '../../common/header';
import Line from '../../common/line';
import Status from './status';
import Request from '../../common/request';
import config from '../../common/config';

// create a component
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: null,
    }
  }
  componentDidMount() {
    this.fetchData(0);
  }
  fetchData(page) {
    const params = {
      accessToken: 'duchao',
    };
    const url = config.api.base + config.api.orderList;

    Request.Get(url, params)
      .then(data => {
        if (page === 0) {
          let result = data.data.slice(0, 3);
          this.setState({
            orderData: result
          });
        }
        // console.log("个人订单列表：",data.data);
      })
      .catch(err => {
        console.log('个人订单列表请求失败：', err);
      })
  }

  renderRow() {
    let { orderData } = this.state;
    let items = orderData.map((item, index) => {
      return (
        <TouchableHighlight underlayColor={"#e9e9e9"} key={index}>
          <View style={styles.list}>
            <View>
              <Text>{item.orderNumber}</Text>
              <Text>{item.status}</Text>
            </View>
            <Text>下单日期：{item.date}</Text>
            <Text>总价：{item.totalCharge}</Text>
          </View>
        </TouchableHighlight>
      );
    });
    return items;
  }

  //查看更多
  fetchMore() {
    //code...
  }

  //查看全部
  lookTotal() {
    // code...
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header title="订单" />
        <ScrollView>
          <View style={styles.head}>
            <TouchableHighlight underlayColor="#e9e9e9" onPress={() => null/*difined handle code..*/}>
              <View style={styles.orderLink}>
                <Text style={styles.leftText}>我的订单</Text>
                <View style={styles.linkRight}>
                  <Text style={styles.rightText}>全部订单</Text>
                  <FontIcon name="angle-right" size={16} color="#ddd" />
                </View>
              </View>
            </TouchableHighlight>
            <Line />
            <View style={styles.statusBox}>
              <Status icon="handshake-o" title="待确认" iconColor="#6cc0f1" />
              <Status icon="cc-paypal" title="待付款" iconColor="#a358f7" />
              <Status icon="truck" title="待收货" iconColor="#edd867" />
              <Status icon="institution" title="退款/售后" iconColor="#ec7979" />
            </View>
          </View>
          <View>
            <View style={styles.latelyOrder}>
              <Text style={styles.latelyText}>最近订单</Text>
            </View>
            <View style={styles.latelyList}>
              {
                this.state.orderData
                  ? <View>
                    {this.renderRow()}
                    {
                      this.state.pressMore
                        ? <TouchableHighlight underlayColor="#efefef" onPress={this.fetchMore.bind(this)}>
                          <View>
                            <Text style={style.more}>更多</Text>
                            <FontIcon name="angle-down" size={13} color="#00d7a7"/>
                          </View>
                        </TouchableHighlight>
                        : <TouchableHighlight underlayColor="#efefef" onPress={this.lookTotal.bind(this)}>
                          <View>
                            <Text style={style.more}>查看全部</Text>
                            <FontIcon name="angle-right" size={13} color="#00d7a7"/>
                          </View>
                        </TouchableHighlight>
                    }
                  </View>
                  : <View style={styles.indicatorBox}><ActivityIndicator /></View>
              }
            </View>
          </View>
        </ScrollView>
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
  head: {
    backgroundColor: '#fff',
  },
  orderLink: {
    height: 35,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
  },
  linkRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rightText: {
    fontSize: 11,
    color: '#888',
    marginRight: 3
  },
  statusBox: {
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  latelyOrder: {
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  latelyText: {
    fontSize: 11,
    color: '#888',
  },
  indicatorBox: {
    paddingVertical: 30,
  },
  latelyList: {
    backgroundColor: '#fff'
  }
});

//make this component available to the app
export default Order;
