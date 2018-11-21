/**
 * basic page
 */
const createBasePage = function() {
  return {
    onLoad(options = {}) {
      // console.warn('basePage', options, getCurrentPages())
      this.$store = getApp().$store
      this.$api = wx.ct && wx.ct.$api
      this._setData = this.setData
      this.setData = (obj) => {
        this._setData(obj)
        this.caclComputed(this)
      }
      this.caclComputed()
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