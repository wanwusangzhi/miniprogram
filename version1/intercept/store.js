import { _split2arr } from '../utils/util.js'
const Store = function ({ name, inst }) {
  return new Store.fn.init({ name, inst })
}
Store.fn = Store.prototype = {
  init: function ({ name, inst }) {
    this.inst = inst
    this.name = name
    this.state = getApp().state[name]
    return this
  }
}
Store.fn.init.prototype.getData = function (key, from) {
  let tmp = getApp().state[this.name][from] || getApp().state[this.name]
  let sp = _split2arr(key)
  let last = sp.pop()
  let retVal = null
  try {
    sp.forEach(i => {
      tmp = tmp[i]
    })
    retVal = tmp[last]
  } catch (e) {
    retVal = null
  }
  return retVal
}

Store.fn.init.prototype.setData = function (data) {
  let keys = Object.keys(data)
  keys.forEach(item => {
    try {
      let tmp = getApp().state[this.name]
      let sp = _split2arr(item)
      let last = sp.pop()
      sp.forEach(i => {
        if (!tmp[i]) {
          tmp[i] = {}
        }
        tmp = tmp[i]
      })
      tmp[last] = data[item]
    } catch (e) {
      console.warn(`设置数据时发现异常, 未找到对相关数据${item}`)
    }
  })
  let name = this.name
  this.inst && this.inst.setData({ [name]: getApp().state[name] })
  this.state = getApp().state[this.name]
  // getApp().state[this.name] = Object.assign(getApp().state[this.name], data)
}

function emit() {
  let pages = getCurrentPages()
  for (let i in pages) {
    pages[i].emit && pages[i].emit()
  }
}

export default Store