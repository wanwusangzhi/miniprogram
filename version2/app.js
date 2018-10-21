//app.js
import $store from './store/index.js'
import publicApi from './public/index.js'
import config from './config/index.js'
let app = {
  onLaunch(options) {
    console.warn('options', options)
  },
  onShow() {

    wx.navigateTo({
      url: '/src/pages/welcome/index',
    })
    // console.warn('api',this)
  },
  $store,
  ...publicApi
}

App(app)