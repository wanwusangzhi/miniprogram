// remember every instance
const pageInstances = {}
/**
 * basic page
 */
const createBasePage = function() {
  return {
    onLoad(options = {}) {
      this._id = this.route
      pageInstances[this._id] = this

      this.$store = wx.ct.$store
      this.$api = wx.ct.$api
      this.$t = wx.ct.$t
      this._setData = this.setData
      this.setData = (obj) => {
        this._setData(obj)
        this.caclComputed()
      }
      this.caclComputed()
    },
    onUnload() {
      // delete instance
      delete pageInstances[this._id]
    },
    $changeLanguage(lang) {
      if (!lang) {
        lang = this.$api.getStorageSync('lang') === 'zh' ? 'en' : 'zh'
      }
      this._setCurLang(lang)
    },
    _setCurLang(lang) {
      this.$api.setStorageSync('lang', lang)
      Object.keys(pageInstances).forEach(item => {
        pageInstances[item].caclComputed.call(pageInstances[item])
      })
    },
    /**
     * computed
     */
    caclComputed() {
      const computedKeys = Object.keys(this.computed || {})
      const updateData = {}

      for (let key of computedKeys) {
        updateData[key] = this.computed[key].call(this)
        this._setData(updateData)
      }
    }
  }
}

/**
 * export create page
 */
const initPage = (page) => {
  const basePage = createBasePage()
  const baseKeys = Object.keys(basePage)
  
  for (let key of baseKeys) {
    if (page[key]) {
      if (typeof basePage[key] === 'function') {
        const fun = page[key]
        page[key] = function (args) {
          basePage[key].call(this, args)
          fun.call(this, args)
        }
      }
    } else {
      page[key] = basePage[key]
    }
  }
  return Page(page)
}

export default initPage