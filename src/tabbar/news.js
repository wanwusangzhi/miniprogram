import config from '../../config/config.js'
let newsStore = null
let page = {
  onLoad() {
    newsStore = getApp().use({ name: 'news' })
  },
  onShow() {
    getApp().dispatch('getNewsList').then(res => {
      this.setData({
        storeList: res.stories
      })
    }, err => {
      console.log(err)
    })
  },
  newsItem: function (e) {
    let _index = e.currentTarget.id
    let _item = newsStore.state.stories[_index]
    getApp().dispatch('getNewsItem', { id: _item.id }).then(res => {
      getApp().kpApi.navigateTo('NEWS_ITEM');
    })
  }
}

Page(page)
