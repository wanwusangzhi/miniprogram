// src/common/intercept/index.js
import config from '../../../config/config.js'
Page({
  data: {
    openType: "getUserInfo",
  },
  onLoad(options = {}) {
    if (options.key) {
      this.setData({
        openType: 'openSetting'
      })
    }
    this.data.options = options
  },
  /**
   * 拦截授权, 成功返回则跳转route页面
   */
  openSetting(res) {
    let _that = this
    let key  = this.data.options.key
    getApp().kpApi.getSetting({
      success(res) {
        if (Object.values(res.authSetting).toString().indexOf('false') == -1 && getApp().event.hasListen('authCallback') || res.authSetting[key]) {
          getApp().event.trigger('authCallback')
        } else if (Object.values(res.authSetting).toString().indexOf('false') == -1 && _that.data.openType == "getUserInfo" || res.authSetting[key]) {
          getApp().kpApi.reLaunch('ROUTE_PATH')
        }
      }
    })
  },
  onReady() {
    // 显示企业数据
    this.setData({
      corporation: getApp().kpApi.getStorageSync('corporation')
    })
  },
})