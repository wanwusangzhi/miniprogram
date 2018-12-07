const {
  $page,
  $share,
  $api,
  $t
} = wx.ct

const page = {
  data: {

  },
  computed: {
    t() {
      return {
        name: $t('home3.name'),
        mobile: $t('home3.mobile'),
        core: $t('home3.core'),
        dayClick: $t('home3.dayClick')
      }
    },
    itemList() {
      return [this.$t('home3.my.project'), this.$t('home3.my.score')]
    },
    columnList() {
      return [{
        name: '游戏',
        src: ''
      }, {
        name: this.$t('home3.my.project'),
        src: ''
      }, {
        name: '游戏ssa枯枯顶替',
        src: ''
      }, {
        name: 'sdfisdk木大日',
        src: ''
      }, {
        name: '',
        src: '/assets/default_column.png'
      }]
    }
  },
  clickChange() {
  }
}
$page(page)