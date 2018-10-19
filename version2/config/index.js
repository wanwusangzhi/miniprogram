import route from './route'
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

const exportConfig = Object.assign({}, defaultConfig, route)

export default exportConfig