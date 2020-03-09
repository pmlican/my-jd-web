/**
 *
https://www.w3cschool.cn/weflow/weflow-rem.html
什么是 REM
REM（Font size of the root element）是指相对于根元素的字体大小的单位。

范例：

若根节点font-size设置为 10px，则使用 3rem 时，计算后得 3*10 = 30px
如果根节点设置为 20px，侧计算后得 3*20 = 60px
为什么使用 REM
相对于流布局、响应式布局等适配方式，REM 适配更为灵活，在不同屏幕尺寸上根据根节点来等比适配
兼容性好（Android 2.1+ / iOS 4.1+）
使用便捷，从 px -> rem 可以使用工作流自动完成

 */

const MAX_FONT_SIZE = 42
// 要达到适配不同屏幕，相同rem在不同尺寸的设备上px不同
// 步骤一，设置监听文档加载完成，获取屏幕宽度，计算fontSize,设置为html.style.fontSzie
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  html.style.fontSize = fontSize + 'px'
})
