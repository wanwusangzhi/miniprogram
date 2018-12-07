// src/components/content/index.js
const { $api } = wx.ct
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    listData: {
      default: [],
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemTap(e) {
      console.log(e)
      const id = e.currentTarget.id
      const url = this.data.listData[id].url
      if (url) {
        $api.navigateTo(url)
      }
    }
  }
})