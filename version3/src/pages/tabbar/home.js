const {
  $page,
  $share,
  $api,
  $routerMap
} = wx.ct

const page = {
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'https://www.animalpolitico.com/wp-content/uploads/2016/05/perrito-960x500.jpg',
      'https://avatars.mds.yandex.net/get-pdb/477388/fde0c602-7c8c-4374-945e-bd04dc6a41d1/orig',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'https://www.animalpolitico.com/wp-content/uploads/2016/05/perrito-960x500.jpg',
      'https://avatars.mds.yandex.net/get-pdb/477388/fde0c602-7c8c-4374-945e-bd04dc6a41d1/orig'
    ],
  },
  computed: {
    t() {
      return {
        lang: this.$t('lang')
      }
    },
    columnList() {
      return [{
        name: this.$t('home1.columnList.writing'),
        src: '/assets/article.png',
        url: $routerMap.articlemain
      }, {
        name: this.$t('home1.columnList.shoping'),
        src: '',
        url: $routerMap.articlemain
      }, {
        name: '游戏ssa枯枯顶替',
        src: '',
        url: $routerMap.articlemain
      }, {
        name: '游戏ssa枯枯顶替',
        src: '',
        url: $routerMap.articlemain
      }, {
        name: '游戏ssa枯枯顶替',
        src: '',
        url: $routerMap.articlemain
      }]
    }
  },
  moduleClick(e) {
    const id = e.currentTarget.id
  },
  changeLanguage() {
    this.$changeLanguage()
  }
}
$page(page)