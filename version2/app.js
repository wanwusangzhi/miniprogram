//app.js
import $store from './store/index.js'
import adapter from './adapter/index.js'
let app = {
  onLaunch: function() {},
  onShow() {
    console.warn('api',this)
  },
  $store,
  ...adapter
}

App(app)