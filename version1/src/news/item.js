// src/product/item.js
let newsStore = null
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
    newsStore = getApp().use({ name: 'news' })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      newsItem: newsStore.state.item
    })
  },
})