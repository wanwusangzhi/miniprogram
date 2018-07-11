// src/movie/item.js
import config from '../../config/config.js'
let movieStore = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    city:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.data.index = options.index
    movieStore = getApp().use({name: 'movie'})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      city: movieStore.state.locationList[this.data.index]
    })
    getApp().dispatch('getMovieList', { id: this.data.id }).then(res => {
      this.setData({
        movieStore: movieStore.state,
        loading: false
      })
    })
  },

  getMovieDetail: function(e){
    let movieId = e.currentTarget.dataset.id
    let _index = e.currentTarget.dataset.index
    let locationId = this.data.city.id
    getApp().dispatch('getMovieDetail', {
      locationId, movieId
    }).then(res=>{
      getApp().kpApi.navigateTo('MOVIE_DETAIL')
    })
  }
})