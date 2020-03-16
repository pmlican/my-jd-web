
const isIphoneX = () => {
  // window对象是否存在
  if (typeof window !== 'undefined' && window) {
    // 判断是否为iphone，并且垂直高度大于812
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}
// 将计算结果赋值给window属性
window.isIphoneX = isIphoneX()
