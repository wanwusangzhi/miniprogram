// src/tabbar/mine.js
import config from '../../config/config.js'
let session = null;

Page({
  onLoad(){
    session = getApp().use({name: 'session'})
  },
  onShow: function(){
    this.setData({
      session:session.state
    })
  }
})