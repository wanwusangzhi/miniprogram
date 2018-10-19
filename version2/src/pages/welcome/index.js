// src/pages/welcome/index.js
let app = {
  $store: getApp().$store,

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().$store.commit('demo/demoCommit', {
      name: 'Wanwu'
    })
    console.warn(this.$store)
    this.setData({
      userInfo: this.$store.state.demo.userInfo
    })
  },

}
Page(app)