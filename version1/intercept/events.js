/**
 * how to use
 * enter page and initialize 
 * 
 * onLoad() { getApp().event.createEventOnPage(this) },
 * events: {
 *  'listen-key': function(args){
 *    console.log(args); // obj or array
 *    console.log(this); // this is this page instance
 *    this.setData({
 *      'key': args
 *    })
 *  }
 * }
 * 
 * tips: when you left this page and events are removed
 */

class Event {
  EventObj = {
    list: {}
  }

  createEventOnPage(that) {
    if (!that || !that.events) return
    let _this = this

    _this._beforeListen(that)

    // 注册并监听事件
    Object.keys(that.events).forEach(key => {
      _this._listen(key, that.events[key], that)
    })
  }

  _beforeListen(that, key) {
    let _this = this

    // 对onUnLoad进行扩展: 页面卸载时 移除 event 监听
    let onUnload = that.onUnload
    that.onUnload = function () {
      if (key) {
        _this.remove(key, that)
      } else {
        Object.keys(that.events).forEach(key => {
          _this.remove(key, that)
        })
      }
      onUnload && onUnload.apply(that, arguments)
    }
  }

  listen(key, callback, instance = getCurrentPages()[getCurrentPages().length - 1]) {
    let _this = this
    _this._beforeListen(instance, key)
    _this._listen(key, callback, instance)
  }

  /**
   * _listen 添加事件监听
   * @param {string} key 事件名称
   * @param {function} callback 事件回调
   * @param {object} instance 页面实例
   */
  _listen(key, callback, instance = getCurrentPages()[getCurrentPages().length - 1]) {
    if (!this.EventObj.list[key]) {
      this.EventObj.list[key] = []
      console.log(`新增事件类型,事件名为：${key}`, instance)
    }

    this.EventObj.list[key].push({
      callback,
      instance,
      key: instance.__wxWebviewId__,
    })

    console.log(`${key}事件监听添加成功，共有${this.EventObj.list[key].length}个。`)
  }

  /**
   * trigger 触发事件
   * @param {string} key 事件名称
   * @param {object} args 参数对象
   */
  trigger(key, ...args) {
    if (!this.EventObj.list[key]) return

    this.EventObj.list[key].forEach(item => {
      console.log(`回调${key}事件`)
      item.callback.apply(item.instance, args)
    })
  }

  /**
   * remove 移除实例页面下 某一事件类型的回调
   * @param {string} key 事件名称
   * @param {object} instance 页面实例
   */
  remove(key, instance) {
    if (!this.EventObj.list[key]) return

    let _instance = instance || getCurrentPages()[getCurrentPages().length - 1]
    let callbackList = this.EventObj.list[key]
    let index = callbackList.findIndex(item => item.key === _instance.__wxWebviewId__)

    callbackList.splice(index, 1)
    if (callbackList.length === 0) delete this.EventObj.list[key]

    console.log(`移除监听${key}`)
  }

  // removeAll 移除某一事件类型的所有回调
  removeAll(key) {
    if (key) {
      delete this.EventObj.list[key]
    } else {
      this.EventObj.list = {}
    }
  }

  // 判断是否存在监听
  hasListen(key) {
    if (this.EventObj.list[key]) return true
    return false
  }

  // 显示所有监听
  showAll(key) {
    console.log(this.EventObj.list)
    return this.EventObj.list
  }

}

export default Event
