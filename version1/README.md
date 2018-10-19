# 小程序前端框架

## vue结构
dispatch / commit / reducers

### 在store中通过actions/reducers/types进行分级
>* getApp().dispatch('actionsName', params) 触发actions操作, 可发起请求  
>* getApp().commit('reducerName', params) 触发修改reducers操作, 完成数据更新  
>* getApp().kpApi.xxx 触发wx自带的api.
>* getApp().state获取到所有actions名称下的state值.
>* actoins中, promise与callback写法相结合


* 1 操作数据对象均为getApp()中的state, 同步修改,全局共用.主要看intercept中的store
```
onLoad(){
    movie = getApp().use({name: 'movie'});
    //获取数据, 返回数据结构为{inst: this, state: {}} ;其中state中的值为actions中初始化的state
    getApp().commit('xxx', {}); //假设在onShow前修改了movie中的数据,修改后onShow拿到最新修改的数据
}
onShow(){
    this.setData({ outData: store.state }); //直接调用
}
```
* 2 事件管理 主要看intercept中的events
```
onLoad(){
    movie = getApp().use({name: 'movie'}); //获取数据
    getApp().event.createEventOnPage(this);
    // 绑定事件后, 触发操作为 getApp().trigger('refreshMovie'[, {}, {} ,{}]), 其中[{}, {} ,{}]为可携带参数
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
#### 如何使用
##### 1 创建actions
```
在store/actions中创建movie.js, 主要对象包括以下三个 URL, state, actions, 需要暴露出来,在index.js中引入使用.

const kpStoreX = {
  URL,
  state,
  actions
};
export default kpStoreX;
```
--- 
  > URL 对象的用途
  * 统一管理当前模块所用到的请求地址
```
 const URL = {
  GET_LOCATION_LIST: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api',
  GET_MOVIE_LIST: 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api',
  GET_MOVIE_DETAIL: 'https://ticket-api-m.mtime.cn/movie/detail.api',
}
```
--- 
>actions 对象的用途
 * action主要用于各种数据请求的交互
 * 通过getApp().request请求返回结果 , 以promise方式或者callback方式回调

```
  ** promise写法 **
  getLocationList() {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_LOCATION_LIST
      }).then(res => {
        getApp().commit('movie_location_list', res);// 这里跟reducers和state有关, 稍后解释
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  
  ** callback写法 **
  getLocationList(params = {}) {
    getApp().request({
      method: 'GET',
      url: URL.GET_LOCATION_LIST
    }).then(res => {
      getApp().commit('movie_location_list', res);// 这里跟reducers和state有关, 稍后解释
      params.success && params.success(res)
    }, err => {
      params.fail && params.fail(err )
    })
  },
```
> state 对象的用途
* 写明数据结构体, 类似接口文档或者是数据层结构文档
* 初始值, 待提供给store/reducers/对应模块下的state使用

```
** 创建获取到区位地址的数据 ** 
const state = {
  locationList: []
}
```
##### 2 创建reducers

> reducers 对象的用途
* 修改数据, 将新旧数据进行整合处理后返回最新结果
* export default {function_name (state, action) { return state; } }
state: store/actions/xxx.js 对应的state内容, 对应store/actions/movies.js中的state值
action: getApp().commit('function_name', params)中对应params的值
@return: 必须要返回state
```
在store/reducers中创建movie.js, 通过export default 引出所有函数, 且文件在store/reducers/index.js中引入即可
** 直接暴露修改数据的方法 ** 

export default {
  movie_location_list(state, action) {
    return Object.assign(state, { locationList: action.p })
  }
};


结合第一步中actions里面请求了数据, 接口返回
res: { p: [{"count":310,"id":292,"n":"上海","pinyinFull":"Shanghai","pinyinShort":"sh"},, {"count":260,"id":366,"n":"深圳","pinyinFull":"Shenzhen","pinyinShort":"sz"}]}

接口返回后,修改数据源, 即可通过getApp().commit('movie_location_list', res);  
在reducers/movie.js中, 可以直接操作以下两步, 可以返回最后修改的state

state.locationList = action.p; 
return state

在页面中拿数据方式有两种
1 getApp().state.movie.locationList
2 getApp().use({name: 'movie'}).state.loationList
```


##### 3 创建shares
> share是统一封装的, 具体可以看下intercept/share.js内容
> 通过getApp().shareApp()可以返回默认配置好的数据{title: "小程序示例", path: "/src/tabbar/route?appShare=true"}
> onShareAppMessage() { return getApp().shareApp() }
```
getApp().shareApp(params)
  params: {
    title: '',
    path: '', // 这个path不是分享的path, 分享的path是已经配置固定了, 这里的path是?号后的参数, 即分享进来一定是先到/src/tabbar/route再到当前的path, 且有当前path优先级比actionName高
    pathParams: '', // 与path配合使用, 跳转路径后带在path?后的参数, 例如getApp().shareApp({path:'/src/movie/item', pathParams: 123) -> {path: "/src/tabbar/route?appShare=true&path=%2Fsrc%2Fmovie%2Fitem&pathParams=123", pathParams: 123, title: "小程序示例"}, 
    actionName: '', // 优先级比path低, 采用这种扩展性比较强. getApp().shareApp({actionName:'shareOrderDetail', arg1:'id1', arg2: 'id2') -> {actionName: "shareOrderDetail", arg1: "id1", arg2: "id2", title: "小程序示例", path: "/src/tabbar/route?appShare=true&actionName=shareOrderDetail&arg1=id1&arg2=id2"}
    imageUrl: '',
    success: '',
    fail: '',
    complete: '',
  }
```
>扩展性使用, 其实分享就是为了点进来后能处理数据
getApp().shareApp({actionName:'shareOrderDetail', arg1:'id1', arg2: 'id2')
返回
```
{actionName: "shareOrderDetail", arg1: "id1", arg2: "id2", title: "小程序示例", path: "/src/tabbar/route?appShare=true&actionName=shareOrderDetail&arg1=id1&arg2=id2"}
```
>通过分享进来后, 
在src/tabbar/route中会调用store/index.js中的shareDeal处理后, 执行dealOptions
```
dealOptions(options) {
  /**
    * 监听是否是分享进来的
    */
  if (getApp().event.hasListen('shareAppListener')) {
    getApp().event.trigger('shareAppListener')
  } else {
    //正常访问
    this.wxSsoLogin()
  }
},
```
>通过getApp().event.trigger('shareAppListener')触发store/shares/app.js中的shareOrderDetail中的方法, 
同时把剩余参与作为回调方法中的参数带入
store/shares/app.js中
```
// 分享订单逻辑
shareOrderDetail(params = {}) {
  console.log(params); // 拿到{arg1: '',arg2: ''}
  // 这里可以增加各种dispatch操作, 通过getApp().kpApi.navigateTo/reLaunch跳转对应的页面
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

