/**
 * how to use
 * enter page and initialize 
 * 
 * onLoad() { getApp().event(this) },
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
const EventObj = {
  list: {}
}

class Event {}

function createEvent(that){
  if (!that || !that.events) {
    return
  }
  /**
   * 重写onUnload
   */
  let onUnload = that.onUnload
  that.onUnload = function () {
    Object.keys(that.events).forEach(item => {
      new Event().remove(item, that)
    })
    onUnload && onUnload.apply(that, arguments)
  }

  Object.keys(that.events).forEach(item => {
    new Event().listen(item, that.events[item], that )
  })

  return
}
Event.prototype.listen = function (key, fn, inst) {

  inst = inst || getCurrentPages()[getCurrentPages().length - 1]

  if (!EventObj.list[key]) {
    EventObj.list[key] = []
    console.log(`新增事件类型,事件名为：${key}`)
  }

  EventObj.list[key].push({ fn, key: inst.__wxWebviewId__, inst })
  console.log(`${key}事件监听添加成功，共有${EventObj.list[key].length}个。`)
}

Event.prototype.trigger = function (key, ...args) {
  if (!EventObj.list[key] || !EventObj.list[key].length) {
    return
  }

  let fns = EventObj.list[key]
  fns.forEach(item => {
    console.log(`回调${key}事件`)
    item.fn.apply(item.inst, args)
  })
}

Event.prototype.remove = function (key, inst) {

  inst = inst || getCurrentPages()[getCurrentPages().length - 1]
  if (!EventObj.list[key]) {
    return
  }
  let fns = EventObj.list[key]
  fns.forEach((item, index) => {
    if (item.key === inst.__wxWebviewId__) {
      fns.splice(index, 1)
      console.log(`移除监听${key}--->${item.key}`)
      if (fns.length === 0) {
        delete EventObj.list[key]
      }
      return
    }
  })
}
/**
 * 判断是否存在监听
 */
Event.prototype.hasListen = function (key) {
  if (EventObj.list[key]) {
    return true
  }
  return false
}
/**
 * 显示所有监听
 */
Event.prototype.showAll = function (key) {
  console.log(EventObj.list)
  return EventObj.list
}
/**
 * 移除所有监听
 */
Event.prototype.removeAll = function (key) {
  EventObj.list = {}
}
export default {
  event: createEvent,
  listen: Event.prototype.listen,
  remove: Event.prototype.remove,
  trigger: Event.prototype.trigger,
  hasListen: Event.prototype.hasListen,
  showAll: Event.prototype.showAll,
  removeAll: Event.prototype.removeAll
}
