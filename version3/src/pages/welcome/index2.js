const { $page } = wx.ct
$page({

  /**
   * 页面的初始数据
   */
  data: {
    arrList: [1,2,3]
  },
  computed: {
    num() {
      return this.data.arrList.length
    }
  },
  onLoad() {
    console.warn('index2', this.data)
  },
  add() {
    const num = Math.random() * 10
    const arrList = this.data.arrList
    arrList.unshift(+num.toFixed(0))
    console.warn('arrList', arrList)
    this.setData({ arrList })
  },
  remove() {
    const arrList = this.data.arrList
    arrList.pop()
    this.setData({ arrList })
  }
})