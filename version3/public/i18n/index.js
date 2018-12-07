import config from '../config/index.js'

import zh from './zh.js'
import en from './en.js'

const langDict = {
  zh,
  en
}
export default (key, lang) => {
  if (!lang) {
    lang = wx.getStorageSync('lang') || config.getCurLang()
  }
  const keys = key.split('.')
  let dict = Object.assign({}, langDict[lang] || langDict['zh'])

  try {
    keys.forEach(item => {
      dict = dict[item]
    })
    if (!dict) {
      throw new Error()
    }
  } catch(e) {
    dict = 'waring!not found :' + key
  }
  return dict
}
// export const zh
