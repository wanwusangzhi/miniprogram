import $api from './api'
import $request from './request'
import $share from './share'
import $page from './basePage'
import $t from './i18n/index.js'
import $router, { $routerMap } from './router/index.js'
import $config from './config/index.js'

wx.ct = {
  $api,
  $request,
  $share,
  $page,
  $router,
  $routerMap,
  $config,
  $t
}