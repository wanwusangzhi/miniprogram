// src/components/comment/index.js
const {
  $t
} = wx.ct
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
    },
    textarea_showConfirmBar: false,
    textarea_fixed: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      let id = e.target.id
      if (id === undefined || id === '') return
      id -= 0
      switch (id) {
        case 0:
          this.changeModalStatus(1)
          break;
        case 1:
        case 2:
          {
            this.triggerEvent('callback', {
              index: id
            })
          }
          break;
      }
    },
    closeModal(e) {
      this.changeModalStatus(0)
    },
    changeModalStatus(flag) {
      this.setData({
        modalStatus: flag
      })
    },
    touchmove(){}
  }
})