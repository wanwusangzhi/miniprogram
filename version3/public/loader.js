class Loader {
  constructor () {
    this.loaderCache = {}
  }
  showLoader() {
    if (Object.keys(this.loaderCache).length) {
      wx.ct.$api.showLoading({
        title: '', duration: 60000
      })
    }
  }
  hideLoader() {
    console.warn('this.loaderCache', this.loaderCache)
    if (!Object.keys(this.loaderCache).length) {
      wx.ct.$api.hideLoading()
    }
  }
  created (key) {
    this.loaderCache[key] = true
    console.warn('loaderC', this.loaderCache)
    this.showLoader()
  }
  destroyed (key) {
    delete this.loaderCache[key]
    this.hideLoader()
  }
}

const loader = new Loader()

export default loader