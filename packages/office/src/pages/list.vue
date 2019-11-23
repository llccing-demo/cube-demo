<template>
  <div class="list">
    <div class="scroll-wrapper">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <div slot="pulldown">下拉刷新文案</div>
        <div slot="pullup">上拉加载文案</div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: this.$route.params.type,
      items: ['1', 2, 34, 56, 777, 8888],
      options: {
        observeDOM: true,
        click: true,
        pullDownRefresh: true,
        pullUpLoad: true
      },

      page: 1,
      limit: 40
    }
  },
  computed: {
  },
  methods: {
    async getList (type) {
      const {page, limit} = this
      let params = {
        page,
        limit,
        tab: type,
        mdrender: 'false'
      }
      const res = await this.$axios.get('https://cnodejs.org/api/v1/topics', { params })

      this.items = res.data.data.map(item => {
        item.title = item.title.replace(/' '/ig, '')
        if (item.title.length > 20) {
          return `${item.title.substr(0, 20)}...`
        }
        return item.title
      })
    },
    onPullingDown () {
      console.log('下拉刷新')
    },
    onPullingUp () {
      console.log('上拉加载')
    }
  },
  watch: {
    '$route.params.type': {
      handler (v) {
        this.getList(v)
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
</style>