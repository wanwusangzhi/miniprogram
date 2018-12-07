// src/pages/article/main.js
const { $page, $share, $api, $store, $t } = wx.ct

const page = {
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
  },
  onLoad () {
    $store.dispatch('article.fetch_by_id', { article_id: this.options.article_id }).then(res => {
      this.setData({
        article: res
      })
    })
  },
  computed: {
    t() {
      return {
        like: $t('article.like')
      }
    }
  },
  commentCallback (e) {
    console.log(e.detail.index)
  }
}

$page(page)