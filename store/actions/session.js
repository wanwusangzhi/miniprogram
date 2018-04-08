import config from '../../config/config';
import {
  WX_INFO,
} from '../types/index';

const URL = {
  // 微信绑定
  WX_CONNECT: '/gw/accountlogic/connect_wechat',
};

const LIMIT_TIME = 60 * 4 * 1000;

const actions = {
  /**
   * 微信统一登录, unionId绑定
   */
  getWXCode: function () {
    return new Promise((resolve, reject) => {
      //微信授权,获取unionId
      getApp().kpApi.login({
        success(response) {
          //获取用户信息
          getApp().kpApi.kpAuth('getUserInfo', {
            withCredentials: true,
            success: function (res) {
              res.code = response.code
              getApp().commit(WX_INFO, res);//存储数据在state中
              resolve(res)
            },
            fail: function (err) {
              reject(err)
            }
          }, true)
        }
      })
    })
  },
  
};

/**
 * set cookie or remove cookie which in storage
 * @param {[type]} response [description]
 */
function setCookie(response) {
  let cookie = getApp().kpApi.getStorageSync('cookie') || {};
  
  wx.setStorageSync('cookie', cookie);
}


const shareApps = {};

const state = {
  userInfo: null,
  wxInfo: null,
  language_id: 'zh_cn'
};

const kpStoreX = {
  URL,
  state,
  actions,
  shareApps
};

export default kpStoreX;
