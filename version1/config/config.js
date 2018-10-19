/**
 * 公共提示用语
 */
import zh from './zh-cn.js'
/**
 * 登录权限控制
 */
import rules from './login-rules.js'

const config = {
  isDev: true,
  target: '',
  appid: '',

  STAY_TIME: 500, //页面跳转停留时间
  APP_NAME: '小程序示例',
  /**
   * 返回地址
   */
  getHttpLocation(){
    if(config.isDev){
      return 'http://localhost:8080';
    }
    return 'https://api.douban.com';
  },
};
Object.assign(config, zh, rules)
export default config;
