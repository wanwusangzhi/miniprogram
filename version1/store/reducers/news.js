export default {
  news_list(state, action) {
    return Object.assign(state, action)
  },
  news_detail(state, action) {
    return Object.assign(state, { item: action })
  },
};