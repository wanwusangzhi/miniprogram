const { $page, $share, $api, $routerMap } = wx.ct

const page = {
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const self =this
    self.beforeEnter()
  },
  data: {
    a: 123,
    ab: 123
  },
  beforeEnter() {
    // 分享进入
    if (this.options.share) {
      $share.dealShare(this.options)
    } else {
      $api.reLaunch($routerMap.home3)
    }
  },
  add() {
    this.setData({
      a: ++this.data.a
    })
  }
}
$page(page)