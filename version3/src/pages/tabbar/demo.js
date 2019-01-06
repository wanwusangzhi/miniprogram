const {
  $page,
  $store,
  $api,
  $routerMap
} = wx.ct

$page({
  data: {
    count: $store.state.demo.count
  },
  computed: {
    watchCount () {
      return $store.state.demo.count * Math.random()
    }
  },
  increment() {
    const res = $store.dispatch('demo/mergeCountAction', ++this.data.count)
    this.setData({
      count: res.count
    })
  },
  decrement() {
    const res = $store.dispatch('demo/mergeCountAction', ++this.data.count)
    this.setData({
      count: res.count
    })
  },
  asyncIncrement() {
    $store.dispatch('demo/mergeCountActionAsync', ++this.data.count)
      .then(res => {
        this.setData({
          count: res.count
        })
      })
  },
  goToNext () {
    $api.navigateTo($routerMap.articlemain)
  }
})