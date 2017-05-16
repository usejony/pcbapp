import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  PixelRatio,
  ScrollView,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';

//引入第三方组件
import Picker from 'react-native-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

//自定义组件
import Header from '../../common/header';
import Font from '../../common/normSize';
import Button from '../../common/button';
const { width } = Dimensions.get('window');
export default class Inquire extends Component {
  state = {
    price: '15412',
    focus: false,
    tier: '双面',
    pcsLength: '',
    pcsWide: '',
    amount: '',
    surface: '有铅喷锡',
    solderCover: '过孔盖油',
    needle: '600',
    x: '5%',
    bill: '不需要',
    payWay: '预付',
    express: '广东省内 京广快递',
    boardThick: '1.6mm',
    lineWide: '6mil',
    lineDistance: '6mil',
    aperture: '0.3mm',
    solderColor: '绿色',
    strColor: '白色',
    deliver: '4天',
    expressCost: '到付'
  }
  back() {
    if (Picker.isPickerShow) {
      Picker.hide();
    }
    if (this.state.focus) {
      Keyboard.dismiss();
    }
    Picker.hide();
    const { navigation } = this.props;
    navigation.goBack();
  }
  /**
   * 层数选择器
   */
  onTier(e) {
    console.log(e.nativeEvent)
    Picker.init({
      ...pickerOptions,
      pickerData: ['单面', '双面', '四层', '六层'],
      selectedValue: [this.state.tier],
      onPickerConfirm: (e) => {
        let result = e[0];
        let options = {
          tier: result
        };
        switch (result) {
          case '单面':
          case '双面':
            options.needle = '600';
            break;
          case '四层':
            options.needle = '1000';
            break;
          default:
            options.needle = '1200';
            break;
        }
        this.setState({
          ...options
        });
      }
    });
  }
  /**
   * 表面处理选择器
   */
  onSurface() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['有铅喷锡', '无铅喷锡', '化金'],
      selectedValue: [this.state.surface],
      onPickerConfirm: (e) => {
        this.setState({
          surface: e[0]
        });
      }
    })
  }
  /**
   * 阻焊覆盖选择器
   */
  onSolderCover() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['过孔盖油', '过孔开窗'],
      selectedValue: [this.state.solderCover],
      onPickerConfirm: (e) => {
        this.setState({
          solderCover: e[0]
        });
      }
    });
  }
  /**
   * 接受打X板先择期
   */
  onX() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['2%', '5%'],
      selectedValue: [this.state.x],
      onPickerConfirm: (e) => {
        this.setState({
          x: e[0]
        });
      }
    });
  }
  /**
   * 发票选择器
   */
  onBill() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['需要', '不需要'],
      selectedValue: [this.state.bill],
      onPickerConfirm: (e) => {
        this.setState({
          bill: e[0]
        });
      }
    });
  }
  /**
   * 付款方式选择器
   */
  onPayWay() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['预付', '快递代收'],
      selectedValue: [this.state.payWay],
      onPickerConfirm: (e) => {
        this.setState({
          payWay: e[0]
        });
      }
    });
  }
  /**
   * 快递选择器
   */
  onExpress() {
    let { express } = this.state;
    let arr = express.split(',');
    console.log(arr);
    Picker.init({
      ...pickerOptions,
      pickerData: [
        {
          '广东省内': ['京广快递']
        },
        {
          '广东省外': ['顺丰快递', '其他']
        }
      ],
      selectedValue: arr,
      onPickerConfirm: (e) => {
        let str = e.join(' ');
        this.setState({
          express: str
        });
      }
    });
  }
  /**
   * 板厚选择器
   */
  onBoardThick() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['0.6mm', '0.8mm', '1.0mm', '1.2mm', '1.6mm', '2.0mm', '2.4mm', '3.0mm'],
      selectedValue: [this.state.boardThick],
      onPickerConfirm: (e) => {
        this.setState({
          boardThick: e[0]
        });
      }
    });
  }
  /**
   * 最小线宽选择器
   */
  onLineWide() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['4mil', '5mil', '6mil', '8mil以上(含8)'],
      selectedValue: [this.state.lineWide],
      onPickerConfirm: (e) => {
        this.setState({
          lineWide: e[0]
        });
      }
    });
  }
  /**
   * 最小线距选择器
   */
  onLineDistance() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['4mil', '5mil', '6mil', '8mil以上(含8)'],
      selectedValue: [this.state.lineDistance],
      onPickerConfirm: (e) => {
        this.setState({
          lineDistance: e[0]
        });
      }
    });
  }
  /**
   * 最小孔径选择器
   */
  onAperture() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['0.25mm', '0.3mm', '0.4mm以上(含0.4)'],
      selectedValue: [this.state.aperture],
      onPickerConfirm: (e) => {
        this.setState({
          aperture: e[0]
        });
      }
    });
  }
  /**
   * 阻焊颜色选择器
   */
  onSolderColor() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['白色', '绿色', '亚绿色', '黄色', '橙色', '蓝色', '紫色', '红色', '黑子', '咖啡色', '哑黑色', '墨绿色'],
      selectedValue: [this.state.solderColor],
      onPickerConfirm: (e) => {
        this.setState({
          solderColor: e[0]
        });
      }
    });
  }
  /**
   * 字符颜色选择器
   */
  onStrColor() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['白色', '绿色', '亚绿色', '黄色', '橙色', '蓝色', '紫色', '红色', '黑子', '咖啡色', '哑黑色', '墨绿色'],
      selectedValue: [this.state.strColor],
      onPickerConfirm: (e) => {
        this.setState({
          strColor: e[0]
        });
      }
    });
  }
  /**
   * 发货时间选择器
   */
  onDeliver() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['2天', '4天', '6天', '8天', '12天', '15天'],
      selectedValue: [this.state.deliver],
      onPickerConfirm: (e) => {
        this.setState({
          deliver: e[0]
        });
      }
    });
  }
  /**
   * 快递费用
   */
  onExpressCost() {
    Picker.init({
      ...pickerOptions,
      pickerData: ['到付', '寄付'],
      selectedValue: [this.state.expressCost],
      onPickerConfirm: (e) => {
        this.setState({
          expressCost: e[0]
        });
      }
    })
  }


  /**
   * 当输入框获得焦点的事件
   */
  onFocus() {
    if (Picker.isPickerShow) {
      Picker.hide();
    }
    this.setState({
      focus: true
    });
  }

  /**
   * 当输入框失去焦点的时候
   */
  onBlur() {
    this.setState({
      focus: false
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="在线询价" leftIcon={<Icon name="ios-arrow-back" size={25} color={"#fff"} />} leftHandle={this.back.bind(this)} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.head}>
            <View style={[styles.leftLine, styles.line]} />
            <Text style={styles.headTitle}>在线询价</Text>
            <View style={[styles.rightLine, styles.line]} />
          </View>
          <Item title={'层数：'} selectedValue={this.state.tier} onPress={this.onTier.bind(this)} />
          <Input title={'PCS长：'} value={this.state.pcsLength} onChangeText={(e) => {
            this.setState({ pcsLength: e });
          }} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
          <Input title={'PCS宽：'} value={this.state.pcsWide} onChangeText={(e) => {
            this.setState({ pcsWide: e });
          }} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
          <Input title={'数量：'} value={this.state.amount} onChangeText={(e) => {
            this.setState({ amount: e });
          }} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
          <Item title={'表面处理：'} selectedValue={this.state.surface} onPress={this.onSurface.bind(this)} />
          <Item title={'阻焊覆盖：'} selectedValue={this.state.solderCover} onPress={this.onSolderCover.bind(this)} />
          <Item title={'接受打x板：'} selectedValue={this.state.x} onPress={this.onX.bind(this)} />
          <Item title={'发票要求：'} selectedValue={this.state.bill} onPress={this.onBill.bind(this)} />
          <Item title={'付款方式：'} selectedValue={this.state.payWay} onPress={this.onPayWay.bind(this)} />
          <Item title={'快递公司：'} selectedValue={this.state.express} onPress={this.onExpress.bind(this)} />
          <Item title={'板厚：'} selectedValue={this.state.boardThick} onPress={this.onBoardThick.bind(this)} />
          <Item title={'最小线宽：'} selectedValue={this.state.lineWide} onPress={this.onLineWide.bind(this)} />
          <Item title={'最小线距：'} selectedValue={this.state.lineDistance} onPress={this.onLineDistance.bind(this)} />
          <Item title={'最小孔径：'} selectedValue={this.state.aperture} onPress={this.onAperture.bind(this)} />
          <Item title={'阻焊颜色：'} selectedValue={this.state.solderColor} onPress={this.onSolderColor.bind(this)} />
          <Item title={'字符颜色：'} selectedValue={this.state.strColor} onPress={this.onStrColor.bind(this)} />
          <Item title={'发货时间：'} selectedValue={this.state.deliver} onPress={this.onDeliver.bind(this)} />
          <Item title={'快递费用：'} selectedValue={this.state.expressCost} onPress={this.onExpressCost.bind(this)} />
        </ScrollView>
        <View style={styles.inquireBox}>
          <View style={styles.handleBox}>
            <Icon name="logo-yen" size={16} color={'#b3b4b4'} />
            <Text style={styles.price}>{this.state.price}</Text>
          </View>
          <View style={[styles.handleBox,]}>
            <Button title="计算价格" style={styles.priceHandle} onPress={() => null} />
          </View>
        </View>
      </View>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <View style={styles.item}>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <TouchableHighlight underlayColor="#ededed" onPress={this.props.onPress} style={styles.touch}>
          <Text style={styles.touchText}>{this.props.selectedValue}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class Input extends Component {
  render() {
    return (
      <View style={styles.input}>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Icon name="ios-medical" size={10} color="red" />
        </View>
        <TextInput
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          style={styles.textInp}
          keyboardType={'numeric'}
          placeholder="请输入pcs长,单位mm"
          value={this.props.value}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  content: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  head: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headTitle: {
    fontSize: Font(14),
    color: '#222'
  },
  line: {
    height: 1 / PixelRatio.get(),
    width: '30%',
    backgroundColor: '#ddd'
  },
  leftLine: {
    marginRight: 8
  },
  rightLine: {
    marginLeft: 8
  },
  touch: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',
    borderRadius: 5,
    marginLeft: 5
  },
  touchText: {
    fontSize: Font(12),
    color: '#555'
  },
  item: {
    height: 40,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#efefef',
    marginTop: 8
  },
  itemTitle: {
    width: Font(80),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    fontSize: Font(13),
    color: '#333'
  },
  input: {
    height: 40,
    paddingHorizontal: 8,
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#efefef',
    marginTop: 8
  },
  textInp: {
    fontSize: Font(12),
    color: '#666',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.05)',
    height: 32,
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginLeft: 5,
    textAlign: 'center'
  },
  inquireBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  handleBox: {
    width: width / 2 -0.5,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '$theme7',
    marginLeft: 8
  },
  priceHandle: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
