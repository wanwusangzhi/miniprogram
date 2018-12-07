# 框架描述

### 结构
|——assets              # 资源
|——public               # 公用文件
  |——config             # 默认配置
  |——i18n               # 国际化文件
  |——router             # 路由配置
  |——utils              # 工具类
  |——aop                # 路由拦截
  |——api                # wxapi封装
  |——basePage           # 初始化page页面
  |——index              # 引用页
  |——loader             # loading
  |——request            # 请求页面
  |——share              # 处理分享后进入页面
  |——
|——src           
  |——components         # 公共组件目录
    |——scrollList       # 组件目录
  |——pages
    |——module1          # 功能目录
    |——module2          # 功能目录
  |——route
    |——index            # 路由页面，空页面
    |——tabbar           # tabbar相关的页面
  |——template           # 模板库
    |——template1        # 模板
    |——template2        # 模板
|——store                # 数据层
  |——actions            # actions层
    modules.js
    index.js
  |——reducers           # reducers层
    modules.js
    index.js
  index.js
|——utils                # 工具类
  utils.js

### 实例
```
wx.ct = {
  $api,
  $request,
  $share,
  $page,
  $router,
  $routerMap,
  $config,
  $t
}
```

### color
#dbdbdb
#fafafa
#d81e06
#0752dd