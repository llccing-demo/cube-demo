<template>
  <div class="list">
    <div class="scroll-wrapper">
      <cube-scroll ref="scroll" :data="items" :options="options" @pulling-up="onPullingUp">
        <div class="scroll-box">
          <div
            class="scroll-box-item"
            data-touch="true"
            v-for="item in items"
            :key="item.id"
            @click="toDetail(item)"
          >
            <div class="item-header">
              <span v-if="item.tab" class="tab" :class="[`tab-${item.tab}`]">{{item.tab}}</span>
              <h3>{{item.title}}</h3>
            </div>

            <div class="item-body">
              <div class="item-body-left">
                <img class="item-body-avatar" :src="item.author.avatar_url" alt="头像" />
                <div class="author-info">
                  <span class="author-name">{{item.author.loginname}}</span>
                  <span class="author-create">{{item.create_at_format}}</span>
                </div>
              </div>

              <div class="item-body-right">
                <div class="body-right-count">
                  <span class="reply-count">{{item.reply_count}}</span>
                  <span class="visit-count">{{item.visit_count}}</span>
                </div>
                <div class="body-right-reply-time">{{item.last_reply_at_format}}</div>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import { moment } from '@/common'
export default {
  data () {
    return {
      type: this.$route.params.type,
      items: [],
      options: {
        pullUpLoad: {
          threshold: 20,
          txt: {
            more: '正在加载...',
            noMore: '没有更多了'
          }
        }
      },

      page: 1,
      limit: 10
    }
  },
  methods: {
    async getList (isRefresh) {
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true,
        time: 300
      })
      toast.show()

      const { page, limit } = this
      let params = {
        page,
        limit,
        tab: this.type,
        mdrender: 'false'
      }
      const res = await this.$axios.get('https://cnodejs.org/api/v1/topics', { params })

      if (!isRefresh) {
        this.items.push(...this.formatData(res.data.data))
      }
    },

    // 下拉加载
    onPullingUp () {
      this.page++
      this.getList()
    },

    // 格式化数据
    // 时间转换
    formatData (data = []) {
      data.forEach(item => {
        item.create_at_format = moment(item.create_at).fromNow()
        item.last_reply_at_format = moment(item.last_reply_at).fromNow()
      })
      return data
    },

    toDetail (item) {
      this.$router.push({
        name: 'detail',
        params: { id: item.id }
      })
    }
  },
  mounted () {

    // 这里的效果实现的前提是需要能够点击到 scroll-box-item元素，如果上面有元素则不能直接点到

    // // 点击时添加 .active 效果
    // document.body.addEventListener('touchstart', function (e) {
    //   const target = e.target
    //   console.log('touchstart event', e)
    //   if (target.dataset.touch === 'true') {
    //     target.classList.add('active')
    //   }
    // })

    // // 移动时判断触点是否在元素范围内
    // document.body.addEventListener('touchmove', function (e) {
    //   console.log('touchmove event', e)
    //   const target = e.target
    //   const rect = target.getBoundingClientRect()
    //   if (target.dataset.touch === 'true') {
    //     if (e.changedTouches[0].pageX < rect.left
    //       || e.changedTouches[0].pageX > rect.right
    //       || e.changedTouches[0].pageY < rect.top
    //       || e.changedTouches[0].pageY > rect.bottom) {
    //         target.classList.remove('active')
    //     }
    //   }
    // })

    // // 触摸结束时或取消时，去掉效果
    // document.body.addEventListener('touchcancel', function(e){
    //   console.log('touchcancel event', e)
    //   const target = e.target
    //   if(target.dataset.touch === 'true'){
    //     target.classList.remove('active')
    //   }
    // })
    // document.body.addEventListener('touchend', function(e){
    //   console.log('touchend event', e)
    //   const target = e.target
    //   if(target.dataset.touch === 'true'){
    //     target.classList.remove('active')
    //   }
    // })
  },
  watch: {
    '$route.params.type': {
      handler () {
        this.getList()
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
.list
  .scroll-wrapper
    height calc(100vh - 54px)
    width 100vw
    .cube-scroll-item
      font-size 12px
    .scroll-box
      .scroll-box-item
        // display block
        padding 8px 16px
        border-bottom 1px solid rgba(0,0,0,0.08)
        
        // -webkit-tap-highlight-color #ccc

        .item-header
          display flex
          align-items center
          .tab
            padding: 4px 8px
            border-radius 4px
            background-color #E5E5E5
            color #333
            margin-right 5px
          .tab-top
            background-color #E74C3C
            color #fff
          h3
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
        .item-body
          margin-top 10px
          display flex
          justify-content space-between
          align-items center
          color #34495e
          .item-body-left
            display flex
            align-items center
            .author-info
              margin-left 10px
              span
                display block
              .author-name
                margin-bottom 5px
              .author-create
                font-size 12px
            .item-body-avatar
              border-radius 50%
              width 40px
              border 1px solid #f3f3f3
          .item-body-right
            .body-right-count
              margin-bottom 5px
              .reply-count
                color #42b983
                margin-right -5px
              .visit-count::before
                content '/'
            .body-right-reply-time
              font-size 12px
              text-align right
      // 通过这样的方式，模拟点击效果不生效
      // .scroll-box-item.active
      //   background-color #ccc
</style>