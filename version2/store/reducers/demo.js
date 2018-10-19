/**
getApp().$store.commit('demo/demoAction', {
  id: 123
})
 */
const state = {
  userInfo: null
}

const reducers = {
  demoCommit(state, payload) {
    state.userInfo = payload
    return state
  },
  demoCommitName(state, payload) {
    state.userInfo.name = payload
    return state
  }
}

export default {
  state,
  reducers
}