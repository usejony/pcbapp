import React, { Component } from 'react';
import { 
  View,
  Text
 } from 'react-native';

 export default class Integral extends Component {
   static navigationOptions = ({navigation}) => ({
     title: '积分'
   });
   state = {  }
   render() {
     return (
       <View>
         <Text>积分</Text>
       </View>
     );
   }
 }