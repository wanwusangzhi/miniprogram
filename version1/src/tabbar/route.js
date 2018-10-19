import config from '../../config/config.js'
Page({
  data: {
    corporationId: ''
  },
  onLoad(options) {
    wx.showNavigationBarLoading()
    getApp().createStore(); //创建数据
    if (options.appShare) {
      // 用户小程序分享处理 区别参数为appShare
      this.handleFromShare(options)
    } else {
      this.handleFromNormal(options)
    }
    console.log('deal options result', options)
  },
  // 自定义分享
  handleFromShare(options) {
    console.log('------通过点击用户分享的程序进来的, ^_^')
    getApp().sharesDeal(options)
    this.dealOptions(options)
  },

  handleFromNormal(options) {
    console.log('------通过其它渠道进来的, ^_^')
    this.dealOptions(options)
  },
  dealOptions(options) {
    /**
     * 监听是否是分享进来的
     */
    if (getApp().event.hasListen('shareAppListener')) {
      getApp().event.trigger('shareAppListener')
    } else {
      //正常访问
      this.wxSsoLogin()
    }
  },
  /**
   * 微信统一登录, unionId绑定
   */
  wxSsoLogin: function() {
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