/**
wx.ct.$store.commit('demo/demoAction', {
  id: 123
})
 */
const state = {
  userInfo: null,
  count: 0
}

const reducers = {
  mergeCount ({state}, payload) {
    state.count = payload
    return state
  },
  demoCommit({state}, payload) {
    state.userInfo = payload
    return state
  },
  demoCommitName({state}, payload) {
    state.userInfo.name = payload
    return state
  }
}

export default {
  state,
  reducers
}