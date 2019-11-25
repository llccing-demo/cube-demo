<template>
  <div class="detail">
    <div class="title">{{detailData.title}}</div>
    <div class="intro">
      <div class="author">
        <img class="author-avatar" :src="detailData.author.avatar_url" alt="头像" />
        <div class="author-info">
          <span class="author-name">{{detailData.author.loginname}}</span>
          <span class="author-create">{{detailData.create_at_format}}</span>
        </div>
      </div>
      <div class="other">
        <div class="tab">{{detailData.tab}}</div>
        <div class="visit-count">{{detailData.visit_count}}次浏览</div>
      </div>
    </div>

    <div class="content-wrap" v-html="detailData.content"></div>
  </div>
</template>

<script>
import { moment } from '@/common'
export default {
  data () {
    return {
      id: this.$route.params.id,
      detailData: {
        author: {}
      }
    }
  },
  methods: {
    async getDetail (id) {
      const res = await this.$axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
      const { data } = res.data
      // 时间格式化
      data.create_at_format = moment(data.create_at).fromNow()

      this.detailData = data
    }
  },
  watch: {
    '$route.params.id': {
      handler (newVal) {
        this.getDetail(newVal)
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
.detail
  box-sizing border-box
  padding 0 10px
  .title
    font-size 24px
    line-height 2
  .intro
    display flex
    justify-content space-between
    align-items center
    .author
      display flex
      align-items center
      .author-avatar
        border-radius 50%
        width 40px
        border 1px solid #f3f3f3
      .author-info
        margin-left 10px
        span
          display block
        .author-name
          margin-bottom 5px
        .author-create
          font-size 12px
    .other
      .tab
        padding: 4px 20px
        border-radius 4px
        background-color #E5E5E5
        color #333
        margin-bottom 5px
      .visit-count
        font-size 12px

  // 内容布局
  .content-wrap
    margin-top 30px
    width calc(100vw - 20px)
    box-sizing border-box
    .markdown-text
      h2
        font-size 22px
        line-height 2
      h3
        font-size 20px
        line-height 2
      p
        line-height 1.5
        text-indent 2em
      img
        width 80%
        display block
        margin 0 auto
      ul
        margin-left 4em
        li
          list-style initial
      a
        color #0288CC
      pre
        box-sizing border-box
        background-color #f7f7f7
        overflow-x auto
        padding 20px 15px
</style>