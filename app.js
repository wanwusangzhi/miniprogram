import request from './intercept/request.js'
import config from './config/config.js'
import * as kpStore from './store/index'
import kpApi from './intercept/api.js'
import Event from './intercept/events.js'
import { _combine } from './utils/util.js'

let app = {
  onLaunch: function (options) {
  },
  request,
  event: new Event,
  kpApi,
  ...kpStore,
  /**
   * 初始化数据
   */
  init() {
  },
}

// _combine(app, kpStore, Event)
App(app)