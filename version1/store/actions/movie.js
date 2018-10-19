import config from '../../config/config';

const URL = {
  GET_LOCATION_LIST: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api',
  GET_MOVIE_LIST: 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api',
  GET_MOVIE_DETAIL: 'https://ticket-api-m.mtime.cn/movie/detail.api',

}
const actions = {
  getLocationList() {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_LOCATION_LIST
      }).then(res => {
        getApp().commit('movie_location_list', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  getMovieList(params) {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_MOVIE_LIST,
        params: {
          locationId: params.id
        }
      }).then(res => {
        getApp().commit('movie_list', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },
  getMovieDetail(params) {
    return new Promise((resolve, reject) => {
      getApp().request({
        method: 'GET',
        url: URL.GET_MOVIE_DETAIL,
        params
      }).then(res => {
        getApp().commit('movie_detail', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}
const state = {
  locationList: [],
  movies: [],
  totalCinemaCount: 0, //同城影院数量
  totalComingMovie: 0,//即将上映影片数量
  totalHotMovie: 0, //实际正在售票电影数量
  count: 0
}
// count：movies 链表的长度
// movies：热映电影信息
// actorName1：主演1
// actorName2：主演2
// commenSpecial：一句话总结该电影
// directorName：导演名
// img：图片链接
// is3D：是否是 3D 电影
// isDMAX：是否是 DMAX 电影
// isFilter：???
// isHot：是否是热映电影
// isIMAX：是否是 IMAX 电影
// isIMAX3D：是否是 IMAX3D 电影
// isNew：???
// length：影片时长
// movieId：影片 id，需要提供给影片详情
// isTicket：是否有票
// nearestCinemaCount：今日上映该电影的影院数量
// rDay、rMonth、rYear：影片上映年月日
// ratingFinal：评分
// titleCn：影片中文名
// titleEn：影片英文名
// type：影片类型
// wantedCount：多少人想看
// totalCinemacount：同城影院数量
// totalComingMovie：即将上映影片数量
// totalHotMovie：实际正在售票电影数量
const shareApps = {}

const kpStoreX = {
  URL,
  state,
  actions,
  shareApps
};

export default kpStoreX;