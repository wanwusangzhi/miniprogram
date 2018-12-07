const state = {
  curItem: {
    article_id: String,
    article_topic_id: String,
    article_account_id: String,
    article_title: String,
    article_image_url: String,
    article_video_url: String,
    article_text_images_url: Array[String],
    article_text_videos_url: Array[String],
    article_text: String,
    article_create_time: Date,
    article_update_time: Date,
    article_read_num: Int8Array,
    article_comment_num: Int8Array,
    article_like_num: Int8Array,
    article_pass: Int8Array,
    article_update_admin_id: String
  }
}
const reducers = {
  merge_fetch_by_id({ state }, payload) {
    state.curItem = payload
  }
}
export default {
  state,
  reducers
}