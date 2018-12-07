# 框架描述

### 结构
|——assets              # 资源
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
wx.ct = {
  $api,
  $request,
  $share,
  $page,
  $router,
  $config
}

### color
#dbdbdb
#fafafa
#d81e06
#0752dd