import Router from './router/index.js'
import {
  _obj2url
} from './utils/index.js'

const defaultValue = () => {
  return {
    title: 'YouNi',
    path: Router.routeindex.url + '?share=true'
  }
}

class Share {
  constructor() {}
  /**
   * create share action
   * wx.ct.$share({})
   * wx.ct.$share({
   *  path: 'routeindex',
   *  params1: '',
   *  params2: {}
   * })
   * wx.ct.$share({
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
      wx.ct.$api.reLaunch(path, rest)
    } else if (action) {
      wx.ct.$store.dispatch(action, rest)
    } else {
      wx.ct.$api.reLaunch('routeindex', rest)
    }
  }
  
}

const share = new Share()

export default share