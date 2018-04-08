import config from '../../config/config';
import {
  SET_MOVIE_LIST,
  SET_MOVIE_ITEM
} from '../types/index';

const URL = {
  GET_HOT_MOVIE_LIST: 'https://news-at.zhihu.com/api/4/news/latest',
  GET_MOVIE_ITEM: 'https://news-at.zhihu.com/api/4/news/',

}
const actions = {
  getHotMovieList() {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_HOT_MOVIE_LIST
      }).then(res => {
        getApp().commit(SET_MOVIE_LIST, res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  getMovieItem(params) {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_MOVIE_ITEM + params.id
      }).then(res => {
        getApp().commit(SET_MOVIE_ITEM, res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}
const state = {
  date:'',
  stories: [],
  top_stories: {},
  item:{}
}
const shareApps = {}

const kpStoreX = {
  URL,
  state,
  actions,
  shareApps
};

export default kpStoreX;