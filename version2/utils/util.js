export const _getType = (obj) => {
  if (obj === null) {
    return String(obj)
  }
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * 拷贝对象
 */
export function _clone(val) {
  let type = _getType(val)
  if (type === 'array') {
    var arr = []
    for (var i in val) {
      arr[i] = _clone(val[i])
    }
    return arr
  } else if (type === 'object') {
    var obj = {}
    for (i in val) {
      if (val.hasOwnProperty(i)) {
        obj[i] = _clone(val[i])
      }
    }
    return obj
  }
  return val
}

export function _combine(target, ...source) {
  source.forEach((arg) => {
    for (let p in arg) {
      let type = _getType(arg[p])
      if (type === 'object') {
        target[p] = _combine(target[p], arg[p])
      } else if (type === 'function') {
        let fun = target[p] || function () { }
        delete target[p]
        target[p] = function () {
          let res1 = arg[p].apply(this, arguments)
          let res2 = fun.apply(this, arguments)
          return res1 || res2
        }
        // target[p] = function(){
        //   return arg[p].apply(this, arguments)
        // }
      } else if (type === 'array') {
        target[p] = _clone(arg[p])
      } else if (type === 'number') {
        target[p] = arg[p]
      } else {
        target[p] = arg[p] || target[p] || ''
      }
    }
  })
  return target
}

export const _combinePage = (page) => {
  // let appPage = require('../src/components/pageBase.js').default
  // return _combine(page, appPage)
}

/**
 * 日期格式化, 请使用 _formatDate方法
 */
export const _formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 根据正则格式化日期
 */
const _formatDate = (date, regexp = 'yyyy-MM-dd') => {
  let tmps = {
    'y+': date.getFullYear(),
    'M+': formatNumber(date.getMonth() + 1),
    'd+': formatNumber(date.getDate()),
    'H+': formatNumber(date.getHours()),
    'm+': formatNumber(date.getMinutes()),
    's+': formatNumber(date.getSeconds())
  }
  for (let i in tmps) {
    regexp = regexp.replace(new RegExp(i, 'g'), tmps[i])
  }
  return regexp
}
/**
 * 链接反转对象
 */
export const _url2obj = (url) => {
  let retObj = {}
  url.split('&').forEach(item => {
    let _item = item.split('=')
    retObj[_item[0]] = [_item[1]]
  })
  _debug(retObj)
  return retObj
}

/**
 * 拼接url参数
 * @return key=value&key1=value1
 */
export const _obj2url = (params = {}) => {
  if (Object.keys(params).length) {
    let tmpUrl = [];
    for (let item in params) {
      tmpUrl = [tmpUrl.concat([[encodeURIComponent(item), encodeURIComponent(params[item])].join('=')]).join("&")]
    }
    console.warn('tmpUrl', tmpUrl)
    return tmpUrl
  } else {
    return null
  }
}

//定义空函数
export const _noop = () => { }

/**
 * 切分操作字符串为数组数据
 * keys: 'product.produtList[0].items[1][message][name]
 * @return ['product','productList','0','item','1','message','name']
 */
export const _split2arr = (keys) => {
  return keys.replace(/\]\[|\]\./g, '.').replace(/\[|\]/g, '.').split('\.')
}

module.exports = {
  _formatTime,
  _noop,
  _combine,
  _clone,
  _getType,
  _obj2url,
  _url2obj,
  _split2arr,
  _combinePage,
  _formatDate
}