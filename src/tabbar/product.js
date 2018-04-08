import config from '../../config/config.js'
let movieStore = null
let page = {
  onLoad() {
    movieStore = getApp().use({name: 'movie'})
  },
  onShow() {
    getApp().dispatch('getHotMovieList').then(res => {
      this.setData({
        storeList: res.stories
      })
    }, err => {
      console.log(err)
    })
  },
  newsItem: function (e) {
    let _index = e.currentTarget.id
    let _item = movieStore.state.stories[_index]
    getApp().dispatch('getMovieItem', { id: _item.id }).then(res => {
      getApp().kpApi.navigateTo(config.PRODUCT_ITEM);
    })
  }
}

Page(page)
