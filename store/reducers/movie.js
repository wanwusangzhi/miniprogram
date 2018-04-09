import {
  SET_LOCATION_LIST,
  SET_MOVIE_LIST,
  SET_MOVIE_DETAIL
} from '../types/index';

export default {
  [SET_LOCATION_LIST](state, action) {
    return Object.assign(state, { locationList: action.p })
  },
  [SET_MOVIE_LIST](state, action) {
    return Object.assign(state, action)
  },
  [SET_MOVIE_DETAIL](state, action) {
    return Object.assign(state, { detail: action.data })
  },
};