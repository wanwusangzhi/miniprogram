
import config from '../../config/config';
import {
  SET_NEWS_LIST,
  SET_NEWS_ITEM
} from '../types/index';

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
        getApp().commit(SET_NEWS_LIST, res)
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
        getApp().commit(SET_NEWS_ITEM, res)
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