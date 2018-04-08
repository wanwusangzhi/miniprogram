// src/product/item.js
let movieStore = null
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    movieStore = getApp().use({ name: 'movie' })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      movieItem: movieStore.state.item
    })
  },
})