import { _obj2url } from './utils/index.js'
export const aopRouter = (urlKey, params, cb) => {
  if (wx.ct) {
    const { $router } = wx.ct
    const hasLogin = wx.ct.$api.getStorageSync('login')

    console.warn('$router', $router, urlKey, params, cb)

    if ($router[urlKey]) {
      if ($router[urlKey].isNeedLogin && Boolean(hasLogin)) {
        console.error('need login')
      } else {
        const tmp = Object.assign({}, $router[urlKey])
        return {
          url: tmp.url + (params ? "?" + _obj2url(Object.assign({}, params)) : '')
        }
      }
    } else {
      console.error('url do not found')
    }
  }
}

export const aopDialog = (key, obj) => {
  if (key === 'showModal') {
    obj.showCancel = obj.showCancel !== undefined ? obj.showCancel : false
    obj.confirmColor = obj.confirmColor ? obj.confirmColor : 'red'
  }

  if (key === 'showToast') {
    obj.duration = obj.duration ? obj.duration : 1500
    obj.mask = obj.mask !== undefined ? obj.mask : true
  }
  return obj
}