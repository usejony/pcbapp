import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Button from '../../common/button';
import Item from '../../common/item';
export default class OrderDetail extends Component {
  static navigationOptions = {
    title: '订单详情',
  };
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props.navigation.state.params.data;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          <Item title={"拼客(甲方)："}>{data.partyA}</Item>
          <Item title={"供方(乙方)："}>{data.partyB}</Item>
          <Item title={"订单编号："}>{data.orderNumber}</Item>
          <Item title={"签订日期："}>{data.date}</Item>
          <Item title={"spec编号："}>{data.specNumber}</Item>
          <View style={styles.header}>
            <Text style={styles.headerText}>交易信息</Text>
          </View>
          <Item title={"数量(PCS)："}>{data.amount}</Item>
          <Item title={"交期："}>{data.deliveryTime}天</Item>
          <Item title={"起交数量："}>{data.leastCount}</Item>
          <Item title={"单价："}>{data.price}元</Item>
          <Item title={"平米价："}>{data.m2Price}元</Item>
          <Item title={"币种："}>{data.currency}</Item>
          <Item title={"工程费："}>{data.projectCharge}元</Item>
          <Item title={"测试架费："}>{data.testCharge}元</Item>
          <Item title={"加急费："}>{data.urgentCharge}元</Item>
          <Item title={"其它费用："}>{data.elseCharge}元</Item>
          <Item title={"总金额："}>{data.totalCharge}元</Item>
          {
            data.note
              ? (<View style={styles.noteBox}>
                <Text style={styles.noteTitle}>订单备注:</Text>
                <Text style={styles.notes}>{data.note}</Text>
              </View>)
              : null
          }
          <View style={styles.header}>
            <Text style={styles.headerText}>工程信息</Text>
          </View>
          <Item title={"层数："}>{data.tier}</Item>
          <Item title={"产品类型："}>{data.category}</Item>
          <Item title={"产品类型："}>{data.category}</Item>
          <Item title={"板厚："}>{data.ply}</Item>
          <Item title={"拼版方式："}>{data.makeup}</Item>
          <Item title={"板料级别："}>{data.rank}</Item>
          <Item title={"表面处理："}>{data.surface}</Item>
          <Item title={"油墨颜色："}>{data.printColor}</Item>
          <Item title={"字符颜色："}>{data.charsColor}</Item>
          <Item title={"set尺寸："}>{data.setSize}</Item>
          <Item title={"外层铜厚："}>{data.cuprumThickness}oz</Item>
          <Item title={"外层铜厚："}>{data.cuprumThickness}</Item>
          {
            data.elseInfo
              ? (<View style={styles.noteBox}>
                <Text style={styles.noteTitle}>其他信息:</Text>
                < Text style={styles.notes}>{data.elseInfo}</Text>
              </View>)
              : null
          }
          <View style={styles.header}>
            <Text style={styles.headerText}>结算信息</Text>
          </View>
          <Item title={"结算方式："}>{data.settleWay}</Item>
          <Item title={"票据："}>{data.bill}</Item>
          <Item title={"送货方式："}>{data.express}</Item>
          <Item title={"联系人："}>{data.contact}</Item>
          <Item title={"联系方式："}>{data.contactWay}</Item>
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>送货地址:</Text>
            <Text style={styles.notes}>{data.sendAddress}</Text>
          </View>
          <View style={styles.foot}>
            <Text style={styles.footHead}>说明：</Text>
            <Text style={styles.footText}>1、本合同自签订之日起生效，银货两讫之日止；但有预付款约定的，自预付款支付之日起合同生效；</Text>
            <Text style={styles.footText}>2、交货日期为工厂发货时间，工厂发货后视为乙方交货义务履行完毕，甲方不得拒收；</Text>
            <Text style={styles.footText}>3、乙方产品均为根据甲方要求定制的产品，甲方不得无故拒收，否则乙方有权收回拒收产品并要求甲方支付合同款；</Text>
            <Text style={styles.footText}>4、甲方需按照合同的约定付款，否则需向乙方支付迟延付款总金额千分之五/天的违约金；</Text>
            <Text style={styles.footText}>5、本合同产生争议，协商不成由乙方所在地法院审理；</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
OrderDetail.navigationOptions = {
  title: '订单详情',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingVertical: 20
  },
  header: {
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    color: '#111'
  },
  noteBox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  noteTitle: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  notes: {
    fontSize: 13,
    color: '#555',
    flex: 1,
    marginTop: 0,
    lineHeight: 16
  },
  foot: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  footHead: {
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footText: {
    fontSize: 12,
    color: '#666',
    marginTop:10,
    lineHeight: 16
  }
});
