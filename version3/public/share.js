import Router from './router/index.js'
import {
  _obj2url
} from './utils/index.js'

const defaultValue = () => {
  return {
    title: 'Yoyi',
    path: Router.routerIndex.url + '?share=true'
  }
}

class Share {
  constructor() {}
  /**
   * create share action
   * getApp().$share({})
   * getApp().$share({
   *  path: 'routerIndex',
   *  params1: '',
   *  params2: {}
   * })
   * getApp().$share({
   *  action: 'demo/demoAction',
   *  params1: '',
   *  params2: {}
   * })
   */
  createShare(options = {}) {
    let shareOptions = defaultValue()
    shareOptions.title = options.title ? options.title : shareOptions.title
    delete options.title
    
    shareOptions.path += _obj2url(options) ? '&' + _obj2url(options) : ''
    console.warn('share action', shareOptions)
    return shareOptions
  }
  /**
   * 路由处理分享
   */
  dealShare (options ={}) {
    console.warn('share options', options)
    const { action, path, share, ...rest } = { ...options }
    if (path) {
      getApp().$api.reLaunch(path, rest)
    } else if (action) {
      getApp().$store.dispatch(action, rest)
    } else {
      getApp().$api.reLaunch('routerIndex', rest)
    }
  }
  
}

const share = new Share()

export default share