import config from '../config/config.js'
import { _obj2url } from '../utils/util.js'

export default {
  shareApp(params = {}) {
    console.log('-----params', params)
    /**
     * config default params
     */
    let shareConfig = (_opt) => {
      //filter useless data
      delete _opt.title
      // delete _opt.path
      delete _opt.imageUrl
      delete _opt.success
      delete _opt.fail
      delete _opt.complete

      /**
       * path: target path, this level is higher than actionName
       * pathParams: the prams of path
       * actionName: method name for processing
       */
      // let defaultParams = { id: corpId, staff_id, appShare: true, actionName: null, path: null, pathParams: null }
      let defaultParams = { appShare: true }
      return Object.assign({}, defaultParams, _opt)
    }

    let _retVal = Object.assign({}, params)

    if (!_retVal.title) {
      //set title
      _retVal.title = config.APP_NAME
    }

    // combine params
    params = shareConfig(params)
    _retVal.path = config.ROUTE_PATH.url + '?' + _obj2url(params)
    console.log('-----share', _retVal)
    return _retVal
  }
}