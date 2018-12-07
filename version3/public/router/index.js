const routes = {
  routeindex: {
    url: '/src/route/index',
    isNeedLogin: false
  },
  // tabbar
  home: {
    url: '/src/pages/tabbar/home',
    isNeedLogin: false
  },
  home2: {
    url: '/src/pages/tabbar/home2',
    isNeedLogin: false
  },
  home3: {
    url: '/src/pages/tabbar/home3',
    isNeedLogin: false
  },
  // article
  articlemain: {
    url: '/src/pages/article/main',
    isNeedLogin: false
  },
  // demo
  pageswelcome: {
    url: '/src/pages/welcome/index',
    isNeedLogin: false
  }
}
const _routesMap = {}
Object.keys(routes).map(item => _routesMap[item] = item)
export const $routerMap = _routesMap

export default routes