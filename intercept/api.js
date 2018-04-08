import { _obj2url } from '../utils/util.js'

const IMAGE = {
  alarm: '/assets/alarm.png'
}

const filter = (obj, cb) => {
  if (!obj.isNeedLogin || getApp().state.session.account && getApp().state.session.token) {
    cb && cb()
  } else {
    getApp().kpApi.showModal({
      title: '信息提示',
      content: '当前为游客身份,请先登录',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          // getApp().cb = cb
          getApp().listen('api_login_success', cb)
          wx.navigateTo({
            url: '/src/common/login/index',
          })
        }
      }
    })
  }
}
/**
 * 微信原生API封装
 * 建议所有可设置多个参数的API都进行封装
 * 1. 处理兼容性问题
 * 2. 设置默认参数
 * 为了避免代码混乱（一部分调用封装函数，一部分调用wx函数），保证一致性，所有原生API都做封装
 */
export default {
  setStorageSync: wx.setStorageSync,
  getStorageSync: wx.getStorageSync,
  getStorage: wx.getStorage,
  setStorage: wx.setStorage,
  removeStorage: wx.removeStorage,
  removeStorageSync: wx.removeStorageSync,
  getUserInfo: wx.getUserInfo,
  getLocation: wx.getLocation,
  chooseLocation: wx.chooseLocation,
  openLocation: wx.openLocation,
  createMapContext: wx.createMapContext,
  createSelectorQuery: wx.createSelectorQuery,
  hideLoading: wx.hideLoading ? wx.hideLoading : wx.hideToast,
  login: wx.login,
  checkSession: wx.checkSession,
  navigateBack: wx.navigateBack,
  chooseImage: wx.chooseImage,
  previewImage: wx.previewImage,
  saveImageToPhotosAlbum: wx.saveImageToPhotosAlbum,
  getImageInfo: wx.getImageInfo,
  request: wx.request,
  scanCode: wx.scanCode,
  setNavigationBarTitle: wx.setNavigationBarTitle,
  setTabBarBadge: wx.setTabBarBadge,
  removeTabBarBadge: wx.removeTabBarBadge,
  showTabBarRedDot: wx.showTabBarRedDot,
  hideTabBarRedDot: wx.hideTabBarRedDot,
  setTabBarStyle: wx.setTabBarStyle,
  setTabBarItem: wx.setTabBarItem,
  showTabBar: wx.showTabBar,
  hideTabBar: wx.hideTabBar,
  showNavigationBarLoading: wx.showNavigationBarLoading,
  stopPullDownRefresh: wx.stopPullDownRefresh,
  getSetting: wx.getSetting,
  authorize: wx.authorize,
  openSetting: wx.openSetting,
  makePhoneCall: wx.makePhoneCall,
  /**
   * example
   * getApp().kpApi.navigateTo(obj, data)
   * obj: {value: '/src/.../path'}
   * data: {id: 'x15132125'}
   * /src/.../path?id=x15132125
   */
  navigateTo: function (obj, data) {
    filter(obj, () => {
      let tmp = Object.assign({}, obj)
      if (tmp.url) {
        tmp.value = tmp.url.value
      }
      if (data) {
        tmp.value = tmp.value + "?" + _obj2url(data)
      }
      wx.navigateTo({
        url: tmp.value
      })
    })
  },
  redirectTo: function (obj, data) {
    filter(obj, () => {
      let tmp = Object.assign({}, obj)
      if (tmp.url) {
        tmp.value = tmp.url.value
      }
      if (data) {
        tmp.value = tmp.value + "?" + _obj2url(data)
      }
      wx.redirectTo({
        url: tmp.value
      })
    })
  },
  switchTab: function (obj, data) {
    filter(obj, () => {
      let tmp = Object.assign({}, obj)
      if (tmp.url) {
        tmp.value = tmp.url.value
      }
      if (data) {
        tmp.value = tmp.value + "?" + _obj2url(data)
      }
      wx.switchTab({
        url: tmp.value
      })
    })
  },
  reLaunch: function (obj, data) {
    filter(obj, () => {
      let tmp = Object.assign({}, obj)
      if (tmp.url) {
        tmp.value = tmp.url.value
      }
      if (data) {
        tmp.value = tmp.value + "?" + _obj2url(data)
      }
      wx.reLaunch({
        url: tmp.value
      })
    })
  },
  showLoading(opt = {}) {
    let config = {
      title: '加载中',
      mask: 'true',
    }
    Object.assign(config, opt)
    wx.showLoading(config)
  },
  showToast(opt = {}) {
    let config = {
      title: '成功',
      mask: 'true',
      icon: 'success', //图标，有效值 "success", "loading", "none"
      duration: 2500
    }
    Object.assign(config, opt)
    config.image = IMAGE[config.image] || ''
    wx.showToast(config)
  },
  showModal(opt = {}) {
    let config = {
      title: '提示',
      mask: 'true',
      content: '',
      showCancel: true,
      cancelColor: '#000000',
      confirmColor: '#ff9b00',
    }
    Object.assign(config, opt)
    wx.showModal(config)
  },
  /**
   * data: 目标更新的数据，object，不为空。
   * targetArr: 空、数据或为布尔， 可空。true: 表示更新当前页面.[29,31]
   * cb: 更新后回调函数，可空
   */
  invokeWebviewMethod(data, targetArr, cb) {
    console.log(data, targetArr, cb)
    if (!targetArr || targetArr === true) {
      let tmp = getCurrentPages()
      targetArr = [tmp[tmp.length - 1].__wxWebviewId__]
    }
    if (Object.prototype.toString.call(targetArr).slice(8, -1).toLowerCase() !== 'array') targetArr = [targetArr]
    wx.invokeWebviewMethod({
      name: "appDataChange",
      args: Object.assign({}, { data: data }, {
        complete: cb || function () { }
      }),
      webviewIds: targetArr
    })
  },
  /**
   * 兼容功能处理与调用
   * getApp().kpApi.kpFixed('setTabBarBadge', {
   *  index:1,
   *  text: '3个字符' 
   * })
   */
  kpFixed: function (key, params) {
    if (wx[key]) {
      wx[key](params)
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用最新功能，请升级到最新微信版本后重试。',
        showCancel: false,
      })
    }
  },
  /**
   * how to use
   * 原来是这样用的
   * wx.getUserInfo({...})
   * 现在是这样用的
   * getApp().kpApi.kpAuth('getUserInfo', {...}[, isNotDeal])
   * 参数格式不变, 同时扩展isNotDeal, 如果为true, 回调fail,否则不回调.
   */
  kpAuth: function (key, params, isNotDeal) {
    let tmp = {}
    tmp.success = function (res) {
      params.success && params.success(res)
    }
    tmp.fail = function (res) {
      if (isNotDeal) {
        params.fail && params.fail(res)
      } else {
        let config = {
          title: '提示',
          mask: 'true',
          content: '您当前未授权该操作,授权后即可使用',
          showCancel: true,
          confirmText: '立即前往',
          cancelText: '稍后',
          cancelColor: '#000000',
          confirmColor: '#ff9b00',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
              })
            }
          },
          fail: function () {

          }
        }
        wx.showModal(config)
      }
    }
    try {
      wx[key](tmp)
    } catch (e) {
      console.warn(`调取微信Api中的${key}出错`)
    }
  }
}
