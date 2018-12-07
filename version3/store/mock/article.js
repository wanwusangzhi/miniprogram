export default {
  fetch_by_id() {
    return new Promise((res, rej) => {
      res({
        article_id: 'article_id',
        article_topic_id: 'article_topic_id',
        article_account_id: 'article_account_id',
        article_title: 'article_title',
        article_image_url: 'article_image_url',
        article_video_url: 'article_video_url',
        article_text_images_url: 'article_text_images_url',
        article_text_videos_url: 'article_text_videos_url',
        article_text: 'article_text',
        article_create_time: Date,
        article_update_time: Date,
        article_read_num: Int8Array,
        article_comment_num: Int8Array,
        article_like_num: Int8Array,
        article_pass: Int8Array,
        article_update_admin_id: 'article_update_admin_id',
      })
    })
  }
}