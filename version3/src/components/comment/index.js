// src/components/comment/index.js
const { $t } = wx.ct
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    t: {
      article: {
        commentArea: $t('article.commentArea')
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      if (!e.target.id) return
      const id = e.target.id
      this.triggerEvent('callback', {
        index: id
      })
    }
  }
})
