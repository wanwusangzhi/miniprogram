// src/tabbar/movie.js
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
    movieStore = getApp().use({name: 'movie'})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getApp().dispatch('getLocationList').then(res => {
      this.setData({
        locationList: movieStore.state.locationList
      })
    }, err => {
      console.log(err)
    })
  },
})