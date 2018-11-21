const { $page, $share, $api } = wx.ct

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
    }
  },
  add() {
    this.setData({
      a: ++this.data.a
    })
  }
}
$page(page)