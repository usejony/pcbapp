import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  ListView,
  StatusBar,
  TouchableHighlight,
  PixelRatio,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Image,
  LayoutAnimation
} from 'react-native';
import config from '../../common/config';
import Request from '../../common/request';
import Header from '../../common/header';

import { StackNavigator } from 'react-navigation';
import Toast from 'react-native-easy-toast';
import FontIcon from 'react-native-vector-icons/FontAwesome';

const cacheResult = {
  nextPage: 0,
  items: [],
  total: 0,
}
const { width, height } = Dimensions.get('window');
export default class News extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loadingOk: false,
      isLoading: false,
      refreshing: false,
    }
  }
  
  componentDidMount() {
    this._fetchData(1);
  }

  _fetchData(page) {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear
      }
    });
    const params = {
      accessToken: 'duchao',
    }
    const url = config.api.base + config.api.newsList;
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
            items = data.data
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
          }, 1000);
        }
      })
      .catch(e => {
        if (page !== 0) {
          Alert.alert('获取新闻列表失败');
          this.setState({
            isLoading: false,
          });
        } else {
          Alert.alert('获取新闻列表失败');
          this.setState({
            refreshing: false,
          });
        }
      });
  }

  //前往新闻详细页面
  _goDetail(data) {
    this.props.navigation.navigate('NewsDetailNavScreen', { data: data })
  }

  //新闻列表
  _renderRows(row, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor="#d5d5d5" onPress={this._goDetail.bind(this, row)} key={rowID}>
        <View style={styles.item} >
          <View style={styles.article}>
            <Text style={styles.title}>{row.title}</Text>
            {
              !row.img
              ? <Image source={{ uri: row.img }} style={styles.newImg} />
              : <Image source={require('../../imgs/eg.jpeg')} style={styles.newImg}/>
            }
          </View>
          <View style={styles.extra}>
            <Text style={styles.footer}>来源：{row.source}</Text>
            <Text style={styles.footer}>{row.date}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  //上滑加载更多
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
      return
    }
    return (
      <View style={styles.indicator}>
        <ActivityIndicator />
        <Text style={styles.indicatorText}>努力加载中...</Text>
      </View>
    );
  }

  _hasMore() {
    return cacheResult.items.length < cacheResult.total
  }

  //下拉刷新
  _onRefresh() {
    if (this.state.refreshing) {
      return;
    }
    this._fetchData(0)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated={true} />
        <Header title="新闻" />
        <ListView
          style={{flex:1}}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRows.bind(this)}
          onEndReachedThreshold={50}
          onEndReached={this._fetchMore.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
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
    backgroundColor: '#fafafa'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginHorizontal: 10,
    paddingVertical: 15,
    borderColor: '#d9d9d9',
    borderBottomWidth: 1 / PixelRatio.get()
  },
  article: {
    flexDirection: 'row',
  },
  newImg: {
    width: width * 0.3,
    height: width * 0.3 * 0.56,
  },
  title: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    lineHeight: 20
  },
  footer: {
    color: '#aaa',
    fontSize: 10,
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
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
  }
});