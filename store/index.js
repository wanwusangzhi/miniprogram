import store from '../intercept/store.js'
const MODULE_ACTIONS = {}
const REDUCERS = {}

/**
 * 注入action
 */
const _setAction = (actions) => {
  Object.assign(MODULE_ACTIONS, actions)
}

/**
 * 初始化数据
 */
function _setState(state) {
  this.state = Object.assign({}, state)
}

/**
 * 初始化reducers
 */
function _setReducers(reducers) {
  Object.assign(REDUCERS, reducers);
}

/**
 * 根据key值返回函数
 */
export function getActions (key) {
  return MODULE_ACTIONS[key] || {}
}

/**
 * 分发直接请求数据
 */
export function dispatch (key) {
  let arg = arguments && arguments[1]
  return MODULE_ACTIONS[key].call(this, arg)
}

/**
 * 修改数据
 */
export function commit (key, val) {
  let keys = Object.keys(REDUCERS);
  let tmpIndex = null;
  keys.forEach(item => {
    if (REDUCERS[item].hasOwnProperty(key)) {
      return (tmpIndex = item);
    }
  });
  if (!tmpIndex) {
    console.warn(`未找到对应${key}的纯函数`);
    return;
  }
  getApp().state[tmpIndex] = REDUCERS[tmpIndex][key].call(
    null,
    getApp().state[tmpIndex],
    val
  );
  return getApp().state[tmpIndex];
}

/**
 * store/*.js文件中注入函数，统一管理数据入口
 * obj: {name: 'reducers的key值', inst: '当前页面this对象'}
 */
export function use(obj) {
  return new store(obj)
}

export function createStore() {
  let actions = require('./actions/index.js')
  let reducers = require('./reducers/index.js')
  let keys;
  if(actions) {
    keys = Object.keys(actions)
    let tmpState = {}, tmpActions = {}
    keys.forEach(item => {
      tmpState[item] = JSON.parse(JSON.stringify(actions[item].state))
      tmpActions = Object.assign({}, tmpActions, actions[item].actions)
    })
    _setState.call(this, tmpState)
    _setAction.call(this, tmpActions)
  }

  if (reducers) {
    _setReducers(reducers)
  }
}
