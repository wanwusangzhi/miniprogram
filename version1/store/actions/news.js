import config from '../../config/config';
const URL = {
  GET_HOT_NEWS_LIST: 'https://news-at.zhihu.com/api/4/news/latest',
  GET_NEWS_ITEM: 'https://news-at.zhihu.com/api/4/news/',

}
const actions = {
  getNewsList() {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_HOT_NEWS_LIST
      }).then(res => {
        getApp().commit('news_list', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  getNewsItem(params) {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_NEWS_ITEM + params.id
      }).then(res => {
        getApp().commit('news_detail', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}
const state = {
  date: '',
  stories: [],
  top_stories: {},
  item: {}
}
const shareApps = {}

const kpStoreX = {
  URL,
  state,
  actions,
  shareApps
};

export default kpStoreX;