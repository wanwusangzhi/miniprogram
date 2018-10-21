import config from '../config/index.js'
import {
  _obj2url
} from '../utils/util.js'

const Router = config.Router

const defaultValue = () => {
  return {
    title: 'Yoyi',
    path: Router.routerIndex.url + '?share=true'
  }
}

class Share {
  constructor() {}

  createShare(options = {}) {
    let shareOptions = defaultValue()
    shareOptions.title = options.title ? options.title : shareOptions.title
    delete options.title
    
    shareOptions.path += _obj2url(options) ? '&' + _obj2url(options) : ''
    console.warn('share action', shareOptions)
    return shareOptions
  }
}

const share = new Share()

export default share.createShare