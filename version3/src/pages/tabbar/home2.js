const {
  $page,
  $share,
  $api,
  $routerMap
} = wx.ct

const page = {
  data: {

  },
  computed: {
    columnList() {
      return [{
        name: '游戏',
        src: '',
        url: $routerMap.articlemain
      }, {
        name: this.$t('home3.my.project'),
        src: '',
        url: $routerMap.articlemain
      }, {
        name: '游戏ssa枯枯顶替',
        src: '',
        url: $routerMap.articlemain
      }, {
        name: 'sdfisdk木大日',
        src: '',
        url: $routerMap.articlemain
      }]
    }
  }
}
$page(page)