// src/mine/modify.js
let session = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[]
  },

  onLoad() {
    session = getApp().use({ name: 'session' })
  },
  onReady: function () {
    let _userInfo = session.state.wxInfo.userInfo
    this.setData({
      session: session.state,
      region: [_userInfo.country, _userInfo.province, _userInfo.city]

    })
  },
  inputEvent: function(e){
    if(e.detail.value && this.data.nameError) {
      this.setData({
        nameError:false
      })
    }
  },
  bindRegionChange(e){
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function(e){
    let _value = e.detail.value
    if (!_value.nickName) {
      this.setData({
        nameError: true
      })
      return
    }
    if (!_value.region) {
      this.setData({
        regionError: true
      })
      return
    }

    this.setData({
      regionError: false,
      nameError: false
    })
    getApp().dispatch('modifyName', _value).then(res=>{
      getApp().kpApi.navigateBack()
    })
  }
})