import Vue from 'vue'

Vue.filter('priceValue', function (value) {
  if (!value) {
    return ''
  }
  const result = parseFloat(value)
  // 判断是否为整数
  if (Number.isInteger(result)) {
    return result
  }
  // 小数保留2位小数
  return result.toFixed(2)
})

Vue.filter('filterTime', function (value) {
  // 判断是否为空
  if (!value) {
    return ''
  }
  // 判断是否为时间格式字符串
  if (value.indexOf(':') === -1) {
    return value
  }
  let result = ''
  const arr = value.split(':')
  // 时
  if (parseInt(arr[0]) < 10) {
    result = '0' + arr[0]
  } else {
    result = arr[0]
  }
  // 分
  if (parseInt(arr[1]) < 10) {
    result = result + ':0' + arr[1]
  } else {
    result = result + ':' + arr[1]
  }
  // 秒
  if (parseInt(arr[2]) < 10) {
    result = result + ':0' + arr[2]
  } else {
    result = result + ':' + arr[2]
  }
  return result
})
