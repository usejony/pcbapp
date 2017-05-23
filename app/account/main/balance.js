import React, { Component } from 'react';
import { 
  View,
  Text
 } from 'react-native';

 export default class Balance extends Component {
   static navigationOptions = ({navigation}) => ({
     title: '钱包',
   });
   render() {
     return (
       <View>
         <Text>余额</Text>
       </View>
     );
   }
 }