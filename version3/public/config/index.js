
const ENV = 'pro' // 'dev' or 'pro'
/**
 * 环境/域名等配置
 */
const config = ENV === 'pro' ? require('./pro.config.js').default : require('./dev.config.js').default

/**
 * 国际化
 */
const getCurLang = () => {
  return ZH
}
/**
 * 导出
 */
const exportConfig = Object.assign({}, config)

export default exportConfig