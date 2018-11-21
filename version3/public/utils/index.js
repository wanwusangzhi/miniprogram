/**
 * 转化为promise
 */
export const toPromise = (key, object = {}) => {
  return (o = {}) => {
    return new Promise((resolve, reject) => {
      o = Object.assign({}, object, o)
      o.success = function (res) {
        resolve(res)
      }
      o.fail = function (res) {
        reject(res)
      }
      wx[key](o)
    })
  }
}

/**
 * 统一require路径
 */
export const require = (path) => {
  return require(`../../${path}`)
}
export const _getType = (obj) => {
  if (obj === null) {
    return String(obj)
  }
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
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