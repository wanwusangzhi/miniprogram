import {
  WX_INFO,
  SET_WX_INFO
} from '../types/index';

export default {
  [WX_INFO](state, action) {
    return {
      ...state,
      wxInfo: action
    };
  },
  [SET_WX_INFO](state, action) {
    state.wxInfo.userInfo.country = action.region[0]
    state.wxInfo.userInfo.province = action.region[1]
    state.wxInfo.userInfo.city = action.region[2]
    state.wxInfo.userInfo.nickName = action.nickName
    // remember to return the state
    return state
  }
};
