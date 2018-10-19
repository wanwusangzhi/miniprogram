import store from '../intercept/store.js'
const MODULE_ACTIONS = {}
const REDUCERS = {}
const SHARES = {}

// 初始化action
function _setAction(actions) {
  Object.assign(MODULE_ACTIONS, actions)
}

// 初始化state
function _setState(state) {
  this.state = Object.assign({}, state)
}

// 初始化reducers
function _setReducers(reducers) {
  Object.assign(REDUCERS, reducers);
}

// 分发直接请求数据
export function dispatch(key) {
  let arg = arguments && arguments[1]
  return MODULE_ACTIONS[key].call(this, arg)
}

// 修改数据
export function commit(key, val) {
  let moduleName = Object.keys(REDUCERS).find(moduleName =>
    REDUCERS[moduleName].hasOwnProperty(key))

  if (!moduleName) {
    console.warn(`未找到对应${key}的纯函数`)
    return
  }
  getApp().state[moduleName] =
    REDUCERS[moduleName][key].call(null, getApp().state[moduleName], val)

  return getApp().state[moduleName]
}

/**
 * store/*.js文件中注入函数，统一管理数据入口
 * obj: {name: 'reducers的key值', inst: '当前页面this对象'}
 */
export function use(obj) {
  return new store(obj)
}

// 初始化 state actions reducers
export function createStore() {
  let actions = require('./actions/index.js')
  let reducers = require('./reducers/index.js')

  // 初始化action 和 state (模块的action state维护在同份文件中)
  // state reducers 是按照module被划分(即存在namespace)
  // actions 注册在全局 即不同模块都可以对actions做出响应
  if (actions) {
    let _state = {}
    let _actions = {}

    Object.keys(actions).forEach(moduleName => {
      _state[moduleName] = JSON.parse(JSON.stringify(actions[moduleName].state))
      _actions = Object.assign({}, _actions, actions[moduleName].actions)
    })

    _setState.call(this, _state)
    _setAction.call(this, _actions)
  }

  if (reducers) {
    _setReducers(reducers)
  }
  getApp().appShare = false
}

/**
 * after app shared and deal sharing data
 */
export function sharesDeal(options) {

  options = JSON.parse(JSON.stringify(options))
  delete options.appShare

  let _name = options.actionName

  function _init(params) {
    console.log('params', params, SHARES)
    Object.keys(params).forEach(item => {
      params[item] = params[item] ? decodeURIComponent(params[item]) : params[item]
    })
    let tmpParams = Object.assign({}, params)

    if (params.path) {
      getApp().event.listen('shareAppListener', () => {
        getApp().appShare = true
        delete params.path
        delete params.actionName

        console.log('decode params', params)
        getApp().kpApi.reLaunch({ url: tmpParams.path }, params)
      })
    } else if (SHARES[params.actionName]) {
      getApp().event.listen('shareAppListener', () => {
        getApp().appShare = true
        delete params.path
        delete params.actionName
        delete params.pathParams

        console.log('decode params', params)
        SHARES[tmpParams.actionName].call(null, params)
      })
    } else if (params.actionName) {
      getApp().event.listen('shareAppListener', () => {
        getApp().dispatch('commonException')
      })
    } else {
      getApp().event.removeAll('shareAppListener')
    }
  }

  if (Object.keys(SHARES).length == 0) {
    let shares = require('./shares/index.js')
    let tmpShares = {}
    if (shares) {
      let keys = Object.keys(shares)
      keys.forEach(item => {
        tmpShares = Object.assign({}, tmpShares, shares[item])
      })
      Object.assign(SHARES, tmpShares)
    }
  }
  _init(options)
}
