import {
  _obj2url
} from './utils/index.js'
import Router from './router/index.js'
import Lang from './i18n/index.js'

/**
 * @param {object} obj
 * @param {string} obj.url
 * @param {boolean} obj.isNeedLogin
 * @param {object} data 描述url需要的query
 * @param {function} cb callback
 */
function filter(key, data, cb) {
  if (!Router[key]) {
    console.warn('找不到路径', key)
    return
  }
  /**
   * 增加登录判断
   */
  let obj = Object.assign({}, Router[key])
  // 不需要登陆或已存在登陆态 则可以调用 cb 进行相关跳转
  if (!obj.isNeedLogin) {
    cb && cb()
  } else {
    let success = data.success || (err => {
      if (err.errMsg) wx.reLaunch(Object.assign({}, Router.pageNotFound))
    })
    delete data.success
    delete data.fail
    getApp().$api.showModal({
      title: Lang.dialog.title,
      content: Lang.dialog.content,
      showCancel: true,
      success
    })
  }
}

/**
 * 返回 url
 * @param {object} obj
 * @param {string} obj.url
 * @param {boolean} obj.isNeedLogin
 * @param {object} data 描述url需要的query
 * @returns {object} { url, success, fail, complete }
 */
function getUrlObj(key, data) {
  let obj = Object.assign({}, Router[key])
  let success = data.success || (() => {})
  let fail = data.fail || (err => {
    if (err.errMsg) wx.reLaunch(Object.assign({}, Router.pageNotFound))
  })
  delete data.success
  delete data.fail

  return {
    url: data ? `${obj.url}?${_obj2url(data)}` : obj.url,
    success,
    fail 
  }
}

export default {
  setStorageSync: wx.setStorageSync,
  getStorageSync: wx.getStorageSync,
  getStorage: wx.getStorage,
  setStorage: wx.setStorage,
  removeStorage: wx.removeStorage,
  removeStorageSync: wx.removeStorageSync,
  getUserInfo: wx.getUserInfo,
  getSystemInfo: wx.getSystemInfo,
  getSystemInfoSync: wx.getSystemInfoSync,
  getLocation: wx.getLocation,
  chooseLocation: wx.chooseLocation,
  openLocation: wx.openLocation,
  createMapContext: wx.createMapContext,
  createSelectorQuery: wx.createSelectorQuery,
  hideLoading: wx.hideLoading,
  hideToast: wx.hideToast,
  login: wx.login,
  checkSession: wx.checkSession,
  navigateBack: () => {
    // 处理返回时, 没有页面则直接跳转到首页
    if (getCurrentPages().length == 1) {
      wx.switchTab(Object.assign({}, Router.routeIndex)) //wx进行跳转时, 对config要进行复制
    } else {
      wx.navigateBack()
    }
  },
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
  getUpdateManager: wx.getUpdateManager,
  chooseAddress: wx.chooseAddress,

  /**
   * @param {object} obj
   * @param {string} obj.url
   * @param {boolean} obj.isNeedLogin
   * @param {object} data 描述url需要的query
   */
  navigateTo: function (key, data) {
    filter(key, data, () => {
      wx.navigateTo(getUrlObj(key, data))
    })
  },
  redirectTo: function (key, data) {
    filter(key, data, () => {
      wx.redirectTo(getUrlObj(key, data))
    })
  },
  switchTab: function (key, data) {
    filter(key, data, () => {
      wx.switchTab(getUrlObj(key, data))
    })
  },
  reLaunch: function (key, data) {
    filter(key, data, () => {
      wx.reLaunch(getUrlObj(key, data))
    })
  },
  showLoading(opt = {}) {
    wx.showLoading(Object.assign({
      title: '加载中',
      mask: 'true',
    }, opt))
  },
  showToast(opt = {}) {
    let config = Object.assign({
      title: '成功',
      mask: 'true',
      icon: 'success',
      duration: 2000
    }, opt)
    config.image = IMAGE[config.image] || ''

    wx.showToast(config)
  },
  showModal(opt = {}) {
    wx.showModal(Object.assign({
      title: '提示',
      mask: 'true',
      content: '',
      showCancel: true,
      cancelColor: '#000000',
      confirmColor: '#ff9f00',
    }, opt))
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
      args: Object.assign({}, {
        data: data
      }, {
          complete: cb || function () { }
        }),
      webviewIds: targetArr
    })
  },

  /**
   * 处理api兼容问题
   * @param {string} key wx api name
   * @param {object} params wx api params
   */
  kpCheckCanIuse(key, params) {
    if (wx[key]) {
      wx[key](params)
    } else {
      getApp().$api.showModal({
        content: '当前微信版本过低，无法使用最新功能，请升级到最新微信版本后重试。'
      })
    }
  },

  /**
   * 兼容用户拒绝授权的场景。(因为部分接口需要获得用户授权同意后才能调用)
   */
  kpAuth(key, params, isNotDeal) {
  }
}
const SCOPE_LIST = {
  getUserInfo: 'scope.userInfo', //用户信息
  chooseLocation: 'scope.userLocation', //地理位置
  getLocation: 'scope.userLocation', //地理位置
  chooseAddress: 'scope.address', //	通讯地址
  chooseInvoiceTitle: 'scope.invoiceTitle', //发票抬头
  getWeRunData: 'scope.werun', //微信运动步数
  startRecord: 'scope.record', //录音功能
  saveImageToPhotosAlbum: 'scope.writePhotosAlbum', //保存到相册
  saveVideoToPhotosAlbum: 'scope.writePhotosAlbum', //保存到相册
  camera: 'scope.camera'
}