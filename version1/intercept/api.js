import {
  _obj2url
} from '../utils/util.js'
import config from '../config/config.js'

const IMAGE = {
  alarm: '/assets/alarm.png'
}

/**
 * @param {object} obj
 * @param {string} obj.url
 * @param {boolean} obj.isNeedLogin
 * @param {object} data 描述url需要的query
 * @param {function} cb callback
 */
function filter(key, data, cb) {
  if (!config[key]) {
    console.warn('找不到路径', key)
    return
  }

  let obj = Object.assign({}, config[key])
  // 不需要登陆或已存在登陆态 则可以调用 cb 进行相关跳转
  if (!obj.isNeedLogin || getApp().state.session.account && getApp().state.session.token) {
    cb && cb()
  } else {
    getApp().kpApi.showModal({
      title: config.login.title,
      content: config.login.toast_tips,
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          let _tmpPageLength = getCurrentPages().length; // 当前页面长度
          getApp().event.removeAll('afterLoginListener')
          getApp().event.listen('afterLoginListener', function () {
            getApp().kpApi.navigateBack({ delta: getCurrentPages().length - _tmpPageLength }); //返回当前面, 再进行后续操作
            console.log('-----登录成功后跳转目标地址')
            getApp().kpApi.navigateTo(key, data)
          })
          // wx.navigateTo(Object.assign({}, config.LOGIN_SELECT));// 通过Object.assign重写
        }
      }
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
  let obj = Object.assign({}, config[key])
  return {
    url: data ? `${obj.url}?${_obj2url(data)}` : obj.url,
    fail: err => {
      if (err.errMsg) wx.reLaunch(Object.assign({}, config.PAGE_NOT_FOUND))
    }
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
      wx.switchTab(Object.assign({}, config.INDEX_PATH)) //wx进行跳转时, 对config要进行复制
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
      getApp().kpApi.showModal({
        content: '当前微信版本过低，无法使用最新功能，请升级到最新微信版本后重试。'
      })
    }
  },

  /**
   * 兼容用户拒绝授权的场景。(因为部分接口需要获得用户授权同意后才能调用)
   * @param {string} key wx api name
   * @param {object} params wx api params
   * @param {boolean} isNotDeal 如果为true 回调用户自定义的fail方法
   */
  kpAuth(key, params, isNotDeal) {
    getApp().event.removeAll('authCallback')
    let tmp = Object.assign({})
    tmp.success = function (res) {
      params.success && params.success(res)
    }
    tmp.fail = function (res) {
      wx.getSetting({
        success(authRes) {
          if (authRes.authSetting[SCOPE_LIST[key]] || isNotDeal) {
            params.fail && params.fail(res)
          } else {
            // 未授权
            function handleSetting(res) {
              if (!res.confirm) return
              getApp().kpApi.navigateTo('INTERCEPT_INDEX', {
                key: key == "getUserInfo" ? '' : SCOPE_LIST[key]
              })
              getApp().event.listen('authCallback', function () {
                getApp().kpApi.navigateBack()
                if (key == "getUserInfo") { } else {
                  wx[key](tmp)
                }
              })
            }
            getApp().kpApi.showModal({
              content: '您当前未授权该操作,授权后即可使用',
              confirmText: '立即前往',
              cancelText: '稍后',
              success: handleSetting,
            })
          }
        }
      })
    }

    try {
      wx[key](tmp)
    } catch (e) {
      console.warn(`调取微信Api中的${key}出错`)
    }
  },

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