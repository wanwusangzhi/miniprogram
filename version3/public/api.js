import { toPromise } from './utils/index.js'
import { aopRouter, aopDialog } from './aop.js'

const noPromiseMethods = [
  'stopRecord',
  'pauseVoice',
  'stopVoice',
  'pauseBackgroundAudio',
  'stopBackgroundAudio',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'createAnimation',
  'createContext',
  'createMapContext',
  'canIUse',
  'hideKeyboard',
  'stopPullDownRefresh'
]

const navigatorMethods = [
  'navigateBack',
  'navigateTo',
  'reLaunch',
  'switchTab',
  'redirectTo'
]

const dialogMethods = [
  'showModal',
  'showToast'
]

const wxToPromise = () => {
  const o = {}
  Object.keys(wx).map(key => {
    if (noPromiseMethods.indexOf(key) === -1 && key.substr(0, 2) !== 'on' && !(/\w+Sync$/.test(key))) {
      o[key] = toPromise(key)
    } else {
      o[key] = wx[key]
    }
    // 路由处理
    if (navigatorMethods.indexOf(key) !== -1) {
      const cb = o[key]
      o[key] = (...args) => {
        const res = aopRouter(...args)
        if (res) {
          return cb(res)
        }
      }
    }
    if (dialogMethods.indexOf(key) !== -1) {
      const cb = o[key]
      o[key] = (...args) => {
        return cb(aopDialog(key, ...args))
      }
    }
  })
  return o
}

export default wxToPromise()