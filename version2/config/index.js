import Router from './router'
import ZH from './zh'

/**
 * 环境/域名等配置
 */
const defaultConfig = {
  isProduction() {
    return true
  },
  isDevelop() {
    return true
  },
  httpUrl() {
    if (isProduction()) {
      return 'https://www.moschat.com'
    }
    return 'https://test.moschat.com'
  },
}

/**
 * 国际化
 */
const getCurLang = () => {
  return ZH
}
/**
 * 导出
 */
const exportConfig = Object.assign({}, defaultConfig, {
  Router,
  Lang: getCurLang()
})

export default exportConfig