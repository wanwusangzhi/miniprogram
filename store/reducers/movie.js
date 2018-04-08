import {
  SET_MOVIE_LIST,
  SET_MOVIE_ITEM,
} from '../types/index';

export default {
  [SET_MOVIE_LIST](state, action) {
    return Object.assign(state, action)
  },
  [SET_MOVIE_ITEM](state, action) {
    return Object.assign(state, { item: action })
  },
};