//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ListView,
  Image,
  ActivityIndicator
} from 'react-native';
import Request from '../../common/request';
import config from '../../common/config';

let cacheResult = {
  page: 0,
  items: [],
  total: 0,
}
import FontIcon from 'react-native-vector-icons/FontAwesome';
// create a component
class NewsComment extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      commentList: ds.cloneWithRows([]),
      isLoading: false,
    }
  }
  componentWillMount() {
    this.fetchData();
  }

  /**
   * 获取评论列表
   */
  fetchData() {
    this.setState({
      isLoading: true,
    });
    const params = {
      accessToken: '杜超'
    };
    const url = config.api.base + config.api.comment;
    Request.Get(url, params)
      .then(data => {
        if (data && data.success) {
          cacheResult.total = data.total;
          let items = cacheResult.items.slice();
          items = items.concat(data.data);
          cacheResult.items = items;
          console.log("列表长度：", data.total)
          this.setState({
            commentList: this.state.commentList.cloneWithRows(cacheResult.items),
            isLoading: false
          })
        }

      })
      .catch(err => {
        console.log('获取评论列表失败：', err.message);
      });
  }

  //评论列表项
  renderCommentItem(row, sectionId, rowId) {
    return (
      <View style={styles.item}>
        <Image source={{ uri: row.avatar }} style={styles.avatar} />
        <View style={styles.content}>
          <Text style={styles.nickName}>{row.nickName}</Text>
          <Text style={styles.commentInfo}>{row.commentInfo}</Text>
          <Text style={styles.commentDate}>{row.commentDate}</Text>
        </View>
      </View>
    );
  }

  //上滑加载更多
  fetchMore() {
    if (!this.hasMore()) {
      return;
    }
    this.fetchData();
  }

  /**
   * 列表上滑的时候底部的标识
   */
  renderFooter() {
    if (this.state.isLoading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator />
          <Text style={styles.indicatorText}>努力加载中...</Text>
        </View>
      );
    }
    return (
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>没有更多了</Text>
      </View>
    )
  }

  //是否还有更多数据
  hasMore() {
    return cacheResult.items.length < cacheResult.total;
  }

  renderSeparator(sectionId,rowId) {
    return (
      <View style={styles.separator} key={rowId}/>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" animated={true} />
        <ListView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.listView}
          enableEmptySections={true}
          dataSource={this.state.commentList}
          renderRow={this.renderCommentItem.bind(this)}
          onEndReachedThreshold={10}
          onEndReached={this.fetchMore.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    marginBottom: 40
  },
  listView: {
    backgroundColor: '#f6f6f6',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginRight: 8
  },
  content: {
    flex: 1,
  },
  nickName: {
    fontSize: 13,
    color: '#49aae3'
  },
  commentInfo: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    lineHeight: 18
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 8
  },
  indicator: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginLeft: 65
  }
});

//make this component available to the app
export default NewsComment;
