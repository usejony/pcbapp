//import liraries
import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  ListView,
  TouchableHighlight,
  Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import config from '../../../common/config';
import Request from '../../../common/request';
import Line from '../../../common/line';


const { width, } = Dimensions.get('window');
// create a component
class TotalOrder extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      fetched: false,
      fetching: false,
      hasData: false,
      dataSource: ds.cloneWithRows([]),
      data: null
    }
  }
  componentWillMount() {
    storage.load({
      key: 'loginInfo'
    })
      .then(data => {
        this.setState({
          userId: data.userId
        });
      })
      .catch(err => {
        console.log('全部订单页面没有从本地获取用户的登录信息:', err.message);
      })
    this.fetchData();
  }
  /**
   * 请求数据
   */
  fetchData() {
    this.setState({
      fetching: true,
    })
    const params = {
      accessToken: this.state.userId
    },
      url = config.api.base + config.api.orderList;
    Request.Get(url, params)
      .then(data => {
        if (data && data.success) {
          this.setState({
            fetching: false,
            dataSource: this.state.dataSource.cloneWithRows(data.data),
            fetched: true,
          });
          if (data.data.length === 0) {
            this.setState({
              hasData: false
            });
          } else {
            this.setState({
              hasData: true
            })
          }
        }
      })
      .catch(err => {
        this.setState({
          fetching: false,
        });
        console.log('全部订单列表请求数据失败：', err.message);
      });
  }
  componentDidMount() {

  }

  /**
   * renderRow  数据列表的每一项；
   */
  renderRow(row, sectionId, rowId) {
    const { navigate } = this.props.navigation;
    return (
      <View key={rowId}>
        <TouchableHighlight underlayColor={"#f9f9f9"} onPress={() => navigate('OrderDetail', { data: row })}>
          <View style={styles.list}>
            <View style={styles.itemHead}>
              <Text style={styles.title}>{row.orderNumber}</Text>
              <Text style={styles.status}>{row.status}</Text>
            </View>
            <Text style={[styles.text]}>下单日期：{row.date}</Text>
            <Text style={[styles.text]}>总价：￥{row.totalCharge}</Text>
          </View>
        </TouchableHighlight>
        <Line />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fetching
            ? <View style={styles.indicator}>
              <ActivityIndicator />
            </View>
            : (this.state.hasData
              ?
              <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              />
              : <View style={styles.touch}>
                <Image source={require('../../../imgs/noData.png')} style={styles.loadImg} />
                <Text style={styles.largeText}>您还没有相关订单</Text>
                <Text style={styles.smallText}>去下一单试试吧</Text>
              </View>
            )
        }
      </View>
    );
  }
}
{/*: (<View style={styles.touch}>
                      <Image source={require('../../../imgs/noData.png')} style={styles.loadImg}/>
                      <Text style={styles.largeText}>您还没有相关订单</Text>
                      <text style={styles.smallText}>去下一单试试吧</text>
                    </View>)
                )
                : <TouchableHighlight underlayColor="#efefef" onPress={() => null} style={styles.touch}>
                  <Image source={require('../../../imgs/fetchFailed.png')} style={styles.loadImg}/>
                  <Text style={styles.largeText}>加载数据失败</Text>
                  <Text style={styles.smallText}>点击屏幕重试</Text>
                </TouchableHighlight>
            )*/}

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  indicator: {
    height: 80,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f6f6f6'
  },
  itemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
  },
  status: {
    fontSize: 12,
    color: '$theme6'
  },
  text: {
    fontSize: 12,
    color: '#999',
    marginTop: 5
  },
  touch: {
    flex: 1,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  largeText: {
    fontSize: 12,
    color: '#222',
  },
  smallText: {
    fontSize: 10,
    color: '#888',
    marginTop: 8
  },
  loadImg: {
    resizeMode: 'contain',
    width: 150,
    height: 150
  }
});

//make this component available to the app
export default TotalOrder;
