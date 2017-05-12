/**
 * 导出一个函数，控制APP中的字体不随系统的字体大小而变化；
 */
import { 
  PixelRatio,
  Dimensions
 } from 'react-native';
 const { width, height } = Dimensions.get('window');
export default (size) => {
  let self = PixelRatio.get();
  if(self === 2) {
    //iphone 5s and older Androids
    if(width < 360) {
      return size * 0.95;
    }
    //iphone 5
    if(height < 667) {
      return size;
    } else if (height >= 667 && height <= 735) {
      //iphone 6-6s
      return size * 1.15;
    }
    //older phablets
    return size * 1.25;
  }
  if (self === 3) {
    //catch larger devices
    //ie iphone 6s plus / 7 plus / mi note 等
    return size * 1.27;
  }
}