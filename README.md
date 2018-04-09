# 小程序前端框架

## vue结构
dispatch / commit / reducers
```
在store中通过actions/reducers/types进行分级
getApp().dispatch('actionsName') 触发actions操作, 可发起请求
getApp().commit('reducerName', params) 触发修改reducers操作, 完成数据更新
getApp().kpApi.xxx 触发wx自带的api.
actoins中, promise与callback写法相结合结合

1 操作数据对象均为getApp()中的state, 同步修改,全局共用.主要看intercept中的store
onLoad(){
  movie = getApp().use({name: 'movie'}); //获取数据, 返回数据结构为{inst: this, state: {}} ;其中state中的值为actions中初始化的state
  getApp().commit('xxx', {}); //假设在onShow前修改了movie中的数据,修改后onShow拿到最新修改的数据
}
onShow(){
  this.setData({ outData: store.state }); //直接调用
}
2 事件管理 主要看intercept中的events
onLoad(){
  movie = getApp().use({name: 'movie'}); //获取数据
  getApp().event(this);// 绑定事件后, 触发操作为 getApp().trigger('refreshMovie'[, {}, {} ,{}]), 其中[{}, {} ,{}]为可携带参数
}
events: {
  'refreshMovie': function(args, args1, args2){
    console.log('拿到回调的参数', args, args1, args2)
    //若有在回调前更新过movie中值, 在此拿到的movie.state的值也是最新的
    this.setData({
       outData: movie.state
    })
  }
}

```
## 数据绑定与数据管理

### 目录结构 
![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/frame.png)
### 电影首页
![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/movie.png)
### 电影列表 
![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/movie-list.png)
### 电影详情 
![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/movie-detail.png)

### 新闻首页 

![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/new.png)
### 新闻详情 
![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/new-detail.png)

### 个人中心 

![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/person.png)
### 修改信息
![框架图片](https://github.com/wanwusangzhi1992/assets/blob/master/miniprogram/person-modify.png)

便捷使用
