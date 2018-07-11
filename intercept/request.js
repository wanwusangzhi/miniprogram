import kpApi from './api.js'
import config from '../config/config';
import { _obj2url } from '../utils/util';

// 设置loading动画
const setLoadingStatus = (() => {
  let requestTasks = 0
  let loadingStatus = false

  return params => {
    if (!params) {
      if (!requestTasks) return
      --requestTasks
    } else {
      // 明确设置了不显示loading动画的参数
      if (params.loading === false) return
      ++requestTasks
    }

    if (requestTasks <= 0) {
      kpApi.hideLoading()
      loadingStatus = false
    } else if (requestTasks > 0 && !loadingStatus) {
      kpApi.showLoading()
      loadingStatus = true
    }
  }
})()

function buildURL(opt = { url: '', params: {} }) {
  let url = null;
  if (opt.url && opt.url.indexOf('http') !== -1) {
    url = opt.url;
  } else {
    url = config.getHttpLocation() + opt.url;
  }
  let _o2u = _obj2url(opt.params)
  return _o2u ? url + "?" + _obj2url(opt.params) : url + _obj2url(opt.params);
}

// data.header
function buildRequestHeader() {
  return {
    request_id: new Date().getTime()
  }
}

// HTTP header
function buildGatewayHeader() {
  return {
    'Grpc-Metadata-Requestid': new Date().getTime()
  };
}

const DATA_CODE = {
}

function request(opt) {
  // init params
  let params = Object.assign({
    method: 'POST',
    data: {}
  }, JSON.parse(JSON.stringify(opt)))

  return new Promise((resolve, reject) => {
    // delete loading status
    delete params.data.loading

    Object.assign(params, {
      url: buildURL(params),
      header: Object.assign(buildGatewayHeader(), params.header),
      data: Object.assign({}, params.data, {
        header: Object.assign(buildRequestHeader(), params.data.header),
      }),
      success: function (res) {
        if (res.statusCode === 200 && res.data) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      },
      complete: function (res) {
        setLoadingStatus()
      }
    })
    console.log('请求参数', params)
    setLoadingStatus(opt)
    kpApi.request(params)
  }).catch(err => {
    // wechat server 500
    if (err.errMsg === 'request:fail timeout') {
      kpApi.showToast({
        icon: 'none',
        title: config.common.server_out,
      })
    }
    return Promise.reject(err)
  })
}

module.exports = request
