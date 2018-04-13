export default {
  movie_location_list(state, action) {
    return Object.assign(state, { locationList: action.p })
  },
  movie_list(state, action) {
    return Object.assign(state, action)
  },
  movie_detail(state, action) {
    return Object.assign(state, { detail: action.data })
  },
};