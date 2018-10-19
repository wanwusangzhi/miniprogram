export default {
  session_wx(state, action) {
    return {
      ...state,
      wxInfo: action
    };
  },
  session_wx_user_info(state, action) {
    state.wxInfo.userInfo.country = action.region[0]
    state.wxInfo.userInfo.province = action.region[1]
    state.wxInfo.userInfo.city = action.region[2]
    state.wxInfo.userInfo.nickName = action.nickName
    // remember to return the state
    return state
  }
};
