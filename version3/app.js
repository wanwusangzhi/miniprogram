//app.js
// import $store from './store/index.js'
// import publicApi from './public/index.js'
let app = {
  onLaunch(options) {
    console.warn('app options', options)
    require('./public/index.js')
    wx.ct.$store = require('./store/index.js').default
  },
  onShow() {
  }
}

App(app)