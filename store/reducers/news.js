import {
  SET_NEWS_LIST,
  SET_NEWS_ITEM,
} from '../types/index';

export default {
  [SET_NEWS_LIST](state, action) {
    return Object.assign(state, action)
  },
  [SET_NEWS_ITEM](state, action) {
    return Object.assign(state, { item: action })
  },
};