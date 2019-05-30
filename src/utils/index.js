/**
* @description 工具函数库
* @author YuanZiWen
* @since 19/05/21
*/


/**
 * 时间戳转格式化时间
 * @params timestamp 时间戳
 * @returns yyyy-mm-dd hh:mm:ss
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((`${time}`).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return timeStr
}

/**
 * 获取url参数
 * @param {*} url地址
 * @returns Object keys List
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *
 *  类似Object.assign
 * @export
 * @param {*} target 低优先级数据源
 * @param {*} source 高优先级数据源
 * @returns 合并数据
 */
export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}
/**
 * 缓动滚屏
 *
 * @export
 * @param {*} element 起点元素
 * @param {*} to 终点位置
 * @param {*} duration 过渡时间
 */
export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop += perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += `${className}`
  } else {
    classString = classString.substr(0, nameIndex)
      + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  }
  return new Date(new Date().toDateString())
}
/**
 * 防抖，电梯等人，不定期运行，再次触发重置等待时间
 *
 * @returns null
 */
export function debounce(func, wait, immediate) {
  let timeout;
  let args;
  let context;
  let timestamp;
  let
    result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/**
 * 防抖，电梯不等人，定期运行一次，再次触发不重置等待时间
 *
 * @returns null
 */
export function throttle(func, wait, options) {
  let context;
  let args;
  let
    result
  let timeout = null
  // 上次执行时间点
  let previous = 0
  if (!options) options = {}
  // 延迟执行函数
  const later = function () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : +new Date()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    const now = +new Date()
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now
    // 延迟执行时间间隔
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
/**
 *
 *
 * @export 深克隆 lodash.deepClone
 * @param {*} source
 * @returns Object
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 查询设备系统类型
 *
 * @export
 * @returns
 */
export function device() {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isChrome = /(?:Chrome|CriOS)/.test(ua)
  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isPhone && !isAndroid && !isSymbian
  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc
  }
}
/**
 *
 * 数组对象排序
 * @export
 * @param {*} arr 需要排序的数组
 * @param {*} key 需要排序的字段
 * @returns
 */
export function sort(arr, key = 'value') {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // 获取第一个值和后一个值比较
      const cur = JSON.parse(JSON.stringify(arr[i]))
      if (cur[key] > arr[j][key]) {
        // 因为需要交换值，所以会把后一个值替换，我们要先保存下来
        const index = JSON.parse(JSON.stringify(arr[j]))
        // 交换值
        arr[j] = cur
        arr[i] = index
      }
    }
  }
  return arr
}
/**
 * rgb转hex  rgb(0,0,0) => #000
 *
 * @export
 * @param {*} str
 * @returns
 */
export function rgbToHex(str) {
  const hex = str
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(hex)) {
    const aColor = hex.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    let strHex = '#'
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16)
      if (hex.length < 2) {
        hex = `0${hex}`
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = hex
    }
    return strHex
  }
  if (reg.test(hex)) {
    const aNum = hex.replace(/#/, '').split('')
    if (aNum.length === 6) {
      return hex
    }
    if (aNum.length === 3) {
      let numHex = '#'
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i])
      }
      return numHex
    }
  }
  return hex
}

/**
 * hex转rgb #fff转rgb(255,255,255)
 *
 * @export
 */
export function hexToRgb(str) {
  if (!str) return
  let sColor = str.toLowerCase()
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
    }
    return `RGB(${sColorChange.join(',')})`
  }
  return sColor
}

/**
 * 深度搜索
 *
 * @param {*} source 数据源
 * @param {*} goal 搜索的目标id
 * @param {*} key 搜索的key名称,默认value
 * @returns 对应数组的下标路径
 */
export function findPathDFS(source, goal, key) {
  // 因为会改变原数据，因此做深拷贝处理
  const dataSource = JSON.parse(JSON.stringify(source))
  const res = []
  return (function dfs(data) {
    res.push(data)
    // 深度搜索一条数据，存取在数组 res 中
    if (data.children) return dfs(data.children[0])
    // 匹配成功
    if (res[res.length - 1][key] === goal) {
      return res.map(r => r.index)
    }
    // 匹配失败则删掉当前比对的节点
    res.pop()
    // 没有匹配到任何值则 return，如果源数据有值则再次深度搜索
    if (!res.length) return dataSource.length ? dfs(dataSource.shift()) : res
    // 取得最后一个节点，待做再次匹配
    const lastNode = res[res.length - 1]
    // 删除已经匹配失败的节点（即为上面 res.pop() 的内容）
    lastNode.children.shift()
    // 没有 children 时
    if (!lastNode.children.length) {
      // 删除空 children，且此时需要深度搜索的为 res 的最后一个值
      delete lastNode.children
      return dfs(res.pop())
    }
    return dfs(lastNode.children[0])
  }(dataSource.shift()))
}
