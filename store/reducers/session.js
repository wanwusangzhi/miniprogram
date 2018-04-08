import {
  WX_INFO,
} from '../types/index';

export default {
  [WX_INFO](state, action) {
    return {
      ...state,
      wxInfo: action
    };
  },
};
