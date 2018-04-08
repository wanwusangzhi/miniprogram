import kpApi from './api.js'
import config from '../config/config';
import { kpLoading } from './loading';
import { _obj2url } from '../utils/util';

const STATUS_CODE = {
  OK: 200,
  FAIL_400: 400, //corporation_id 不存在
  FAIL_401: 401, //C16 登录超时或已在别处登录 
  FAIL_500: 500, //绝对是服务器挂机了
  FAIL_TIME_OUT: 'request:fail timeout'
};
const DATA_CODE = {
  C2: 2, //对应服务器500挂机中...
  C3: 3,
  C14: 14, //登录失败错误码, 后台宕机
  C16: 16, //401 登录超时或已在别处登录 
};

const requestConfig = {
  method: 'POST',
  data: {}
};

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

const state = {
  app_type: 0,
  account_id: 0,
  corporation_id: 0,
  staff_id: 0,
  token: ''
};

/**
 * request params
 */
function buildRequestHeader() {
  //TODO
  return {}
}

/**
 * request header
 */
function buildGatewayHeader() {
  //TODO
  return {
    // Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
  }
}

/**
 * 拦截统一请求
 */
function beforeRequest(tmpOpt) {
  let opt = {}
  opt = Object.assign({}, requestConfig, tmpOpt);

  opt.url = buildURL(opt);

  var data = {};
  Object.assign(data, buildRequestHeader(), opt.data.header);
  // opt.data.header = data;

  var header = {};
  Object.assign(header, buildGatewayHeader(), opt.header);
  opt.header = header;

  let success = opt.success;
  let fail = opt.fail;
  let complete = opt.complete;
  delete opt.success;
  delete opt.fail;
  delete opt.complete;

  opt.success = function (res) {
    if (STATUS_CODE.OK === res.statusCode && res.data) {
      (success && success(res.data)) ||
        (opt.resolve && opt.resolve(res.data));
    } else if (STATUS_CODE.FAIL_401 === res.statusCode && DATA_CODE.C16 === res.data.code) {
      // TODO 针对返回值错误进行统一处理或提示
      // kpRequest(tmpOpt)
      getApp().kpApi.showModal({
        title: config.login.title,
        content: config.login.time_out,
        confirmColor: '#FC9F06',
        confirmText: config.login.btn_login,
        showCancel: false,
        success: function(){
          getApp().kpApi.reLaunch({
            url: config.LOGIN_PATH
          })
        }
      })
      opt.fail && opt.fail(res);
    } else if (STATUS_CODE.FAIL_400 === res.statusCode && DATA_CODE.C3 === res.data.code) {
			/**
			 * 云店id不存在或有误
			 */
      kpApi.reLaunch({
        url: config.NOT_FOUND
      })
    } else {
      opt.fail && opt.fail(res);
    }
  };
  opt.fail = function (res) {
    (fail && fail(res)) || (opt.reject && opt.reject(res))
  };
  opt.complete = function (res) {
    kpLoading();
    complete && complete(res);
  };

  console.log('请求参数', opt)
  kpLoading(opt);
  return opt;
}

function kpRequest(opt) {
  return new Promise((resolve, reject) => {
    opt.resolve = resolve;
    opt.reject = reject;
    kpApi.request(opt);
  }).catch(e => {
    if (STATUS_CODE.FAIL_TIME_OUT === e.errMsg) {
      kpApi.showToast({
        title: config.common.server_out,
        icon: 'none'
      })
    } else {
      throw e
    }
  });
}
/**
 * grpcgateway
 */
function request(opt) {
  opt = beforeRequest(opt);
  return kpRequest(opt)
}

module.exports = request;
