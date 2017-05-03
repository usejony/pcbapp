/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * '#00d7a7'; 主题色
 * ‘#efefef’; 背景色
 * @flow
 */

import { AppRegistry, AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import App from './app';
import Root from './root';
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpores: 1000 * 3600 * 24,
  enableCache: true,
  sync: () => {
    console.log('我是storage里面自定义的方法')
  }
});
global.storage = storage;
// import App from './login';

AppRegistry.registerComponent('pcbApp', () => Root);