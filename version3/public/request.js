import Loader from './loader.js'

class Http {
  static cookies  = {}
  static getHttpCookies () {
    return Object.keys(Http.cookies).reduce((a, b) => {
      return a + encodeURIComponent(b) + '=' + encodeURIComponent(Http.cookies[b]) + ';'
    }, '')
  }
  static getCookies() {
    return getApp().$api.getStorageSync('cookies')
  }
  static setCookies(cookieDict = {}) {
    const cookies = getApp().$api.getStorageSync('cookies') || {}
    Object.keys(cookieDict).forEach(cookie => {
      cookies[cookie] = cookieDict[cookie]
    })
    Http.cookies = cookies
    getApp().$api.setStorageSync('cookies', cookies)
  }

  static getConfig() {
    return {
      Cookies: Http.getCookies(),
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      method: 'POST',
      responseType: 'json',
    }
  }
}

class Request {
  constructor(options = {}) {
    this.options = options
    this.requestTask = null
  }

  beforeRequest(options) {
    this.loading = options.loading || true
    if (this.loading !== false) {
      Loader.created(options.url)
    }
    delete options.loading
    return options
  }

  request () {
    return new Promise((resolve, reject) => {
      const options = this.beforeRequest(Object.assign({}, Http.getConfig(), this.options))
      console.warn('options', options)

      options.success = (res) => {
        this.success(res, resolve, reject)
      }
      options.fail = (err) => {
        this.fail(err, resolve, reject)
      }
      options.complete = () => {
        console.warn('complete')
        this.afterRequest()
      }
      this.requestTask = wx.request(options)
    })
  }
  afterRequest() {
    Loader.destroyed(this.options.url)
  }
  success (res, resolve, reject) {
    const retStatus = this.statusCode(res)
    if (retStatus === 'abort') {
      return
    }
    if (retStatus) {
      if (this.options.success) {
        this.options.success(res.data)
      } else {
        resolve(res.data)
      }
    } else {
      this.fail(res, resolve, reject)
    }
  }
  fail(err, resolve, reject) {
    if (this.options.fail) {
      this.options.fail(err) 
    } else {
      reject(err)
    }
  }
  /**
   * check status code 
   * also can redo the request
   */
  statusCode(res) {
    switch(res.statusCode) {
      case 200: {
        return true
      }
      case 400: {
        return false
      }
      case 401: {
        // TODO 登录态无效回调
        this.request(this.options)
        return 'abort'
      }
      default: false
    }
  }
}

const request = (options) => {
  const requestTask = new Request(options)
  return requestTask.request()
}

export default request