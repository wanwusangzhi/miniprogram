/**
getApp().$store.dispatch('demo/demoAction', {
  id: 123
})
 */
const actions = {
  demoAction({ commit, dispatch, state }, payload) {
    commit('demo/demoCommit', payload)
    dispatch('demo/demoAction1', {name: 'YeWen'})
  },
  demoAction1({ commit, dispatch, state }, payload) {
    commit('demo/demoCommitName', payload)
  }
}

export default {
  actions
}