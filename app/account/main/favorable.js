import React, { Component } from 'react';
import { 
  View,
  Text,
 } from 'react-native';

 export default class Favorable extends Component {
   static navigationOptions = ({navigation}) => ({
     title: '优惠'
   });
   state = {  }
   render() {
     return (
       <View>
         <Text>优惠</Text>
       </View>
     );
   }
 }