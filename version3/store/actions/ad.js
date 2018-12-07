const isTesting = true

const URL = {
  LIST: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api'
}

const actions = {
  getAdList({ commit }, payload) {
    const { $request } = wx.ct
    $request(URL.LIST)
  }
}

export default {
  actions
}