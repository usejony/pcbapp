import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ListView,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
  PixelRatio,
  Alert,
} from 'react-native';
import Request from '../../common/request';
import config from '../../common/config';
import Login from '../../login';
import Toast from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/Ionicons';


import { NavigationActions, StackNavigator } from 'react-navigation';
const cacheResult = {
  nextPage: 0,
  items: [],
  total: 0,
}
const { width, height } = Dimensions.get('window');
class Orders extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loadingOk: false,
      isLoading: false,
      refreshing: false,
      loginInfo: null
    }
  }
  componentWillMount() {
    this._fetchData(1);
  }
  _fetchData(page) {
    const params = {
      accessToken: 'duchao',
    }
    const url = config.api.base + config.api.orderList;
    if (page !== 0) {
      this.setState({
        isLoading: true,
      });
    } else {
      this.setState({
        refreshing: true
      });
    }
    Request.Get(url, params)
      .then(data => {
        if (data && data.success) {
          // console.log(data);
          let items = cacheResult.items.slice();
          if (page !== 0) {
            cacheResult.nextPage += 1;
            items = items.concat(data.data);
          } else {
            items = data.data;
          }
          cacheResult.total = data.total;
          cacheResult.items = items;
          this.timer = setTimeout(() => {
            if (page !== 0) {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(cacheResult.items),
                isLoading: false,
                loadingOk: true,
              })
            } else {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(cacheResult.items),
                refreshing: false,
              })
            }
          }, 2000)
        }
      })
      .catch(e => {
        if (page !== 0) {
          this.setState({
            isLoading: false,
          })
          Alert.alert('一个不可预知的错误');
        } else {
          this.setState({
            refreshing: false,
          })
          Alert.alert('一个不可预知的错误');
        }
      });
  }

  _renderRows(row, sectionID, rowID) {
    const navigation = this.props.navigation;
    return (
      <TouchableHighlight underlayColor="#dadada" onPress={() => navigation.navigate('OrderDetail', { data: row })}>
        <View style={styles.item}>
          <View style={styles.head}>
            <Text style={styles.title} numberOfLines={1}>{row.orderNumber}</Text>
            <Text style={styles.status}>{row.status}</Text>
          </View>
          <Text style={styles.text}>下单日期：{row.date}</Text>
          <Text style={styles.text}>交期：{row.deliveryTime}天</Text>
          <Text style={styles.text}>总价：￥{row.totalCharge}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View key={rowID} style={styles.line} />
    );
  }

  _fetchMore() {
    if (this.state.isLoading) {
      return;
    }
    if (!this._hasMore()) {
      this.refs.toast.show('没有更多了');
      return;
    }
    const nextPage = cacheResult.nextPage;
    this._fetchData(nextPage);
  }

  //上滑显示的列表底部的加载视图
  _renderFooter() {
    if (!this._hasMore() && cacheResult.total !== 0) {
      return;
      /*(
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>没有更多了</Text>
        </View>
      );*/
    }
    return (
      <View style={styles.indicator}>
        <ActivityIndicator />
        <Text style={styles.indicatorText}>努力加载中...</Text>
      </View>
    );
  }

  _hasMore() {
    return cacheResult.items.length < cacheResult.total;
  }

  //下拉刷新
  _onRefresh() {
    if (this.state.refreshing) {
      return;
    }
    // if (!this._hasMore()) {
    //   this.refs.toast.show('没有更多了!');
    //   return;
    // }
    this._fetchData(0)
  }

  _renderHeader() {
    const navigate = this.props.navigation.navigate;
    return (
      <TouchableHighlight underlayColor="#eee" onPress={() => navigate('Search')}>
        <View style={styles.search}>
          <Icon name="ios-search" size={18} style={styles.searchIcon} />
          <Text style={styles.searchText}>搜索订单编号</Text>
        </View>
      </TouchableHighlight>
    );
  }

  login() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login',
      params: {},
      action: NavigationActions.navigate({routeName: 'EnterScreen'})
    });
    this.props.navigation.dispatch(navigateAction);
  }
  render() {
    if(!this.state.loginInfo) {
      return (
        <View style={styles.hintCont}>
          <Text style={styles.hintText}>登录可查看订单、账户信息</Text>
          <TouchableHighlight style={styles.loginBtn} onPress={this.login.bind(this)}>
            <Text style={styles.loginText}>登录</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRows.bind(this)}
          onEndReachedThreshold={50}
          onEndReached={this._fetchMore.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          showsVerticalScrollIndicator={false}
          renderSeparator={this._renderSeparator.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
          refreshControl={
            this.state.loadingOk
              ? <RefreshControl
                refreshing={this.state.refreshing}
                tintColor="#00d7a7"
                title="刷新中..."
                onRefresh={this._onRefresh.bind(this)}
              />
              : null
          }
        />
        <Toast ref="toast" opacity={0.5} positionValue={200} style={{ padding: 5 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hintCont: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hintText: {
    color: '#666',
    fontSize: 14
  },
  loginBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#00d7a7',
    marginTop: 15
  },
  loginText: {
    fontSize: 14,
    color: '#fff',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  line: {
    width,
    height: 1 / PixelRatio.get(),
    backgroundColor: '#eee'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 15,
  },
  status: {
    color: '#00d7a7',
    fontSize: 12,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    color: '#aaa',
  },
  indicator: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  indicatorText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 12
  },
  search: {
    width: width - 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    height: 25,
    borderRadius: 8,
    marginVertical: 10
  },
  searchIcon: {
    color: '#aeaeae'
  },
  searchText: {
    color: '#aeaeae',
    fontSize: 12,
    marginLeft: 5
  }
});