import config from '../../config/config.js'
Page({
  data: {
    corporationId: ''
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    getApp().createStore(); //创建数据
  },
  onShow() {
    this.wxSsoLogin()
  },
  /**
   * 微信统一登录, unionId绑定
   */
  wxSsoLogin: function () {
    //获得code
    getApp().dispatch('getWXCode').then(res => {
      console.log('------授权成功', res)
      getApp().kpApi.reLaunch('INDEX_PATH')
      //免登开始
    }, err => {
      //授权失败,跳转拦截页面
      getApp().kpApi.reLaunch('INTERCEPT_INDEX')
    })
  },
  
})