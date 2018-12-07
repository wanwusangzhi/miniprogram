
const ENV = 'pro' // 'dev' or 'pro'
const LANGUAGE = 'lang'
/**
 * 环境/域名等配置
 */
const config = ENV === 'pro' ? require('./pro.config.js').default : require('./dev.config.js').default

/**
 * 国际化
 */
const getCurLang = () => {
  let lang = wx.getStorageSync(LANGUAGE)
  try {
    const res = wx.getSystemInfoSync()
    lang = res.language
  } catch (e) {
    // Do something when catch error
  }
  return lang
}

const setCurLang = (lang) => {
  wx.setStorageSync(LANGUAGE, lang)
}
/**
 * 导出
 */
const exportConfig = Object.assign({}, config, { getCurLang, setCurLang })

export default exportConfig