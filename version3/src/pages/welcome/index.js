const { $page } = wx.ct
let page = {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: 123
    }
  },
  computed: {
    user () {
      return this.data.userInfo.name
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.$store.commit('demo/demoCommit', {
      name: 'Wanwu'
    })
    console.warn(this.$store)
    this.setData({
      userInfo: this.$store.state.demo.userInfo
    })
  },
}

$page(page)