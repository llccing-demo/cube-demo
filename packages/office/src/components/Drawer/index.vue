<template>
  <div class="drawer-wrapper">
    <div class="drawer-header" :class="{active: show}">
      <img class="logo" src="../../assets/cnodejs_light.svg" alt />
    </div>
    <div class="drawer-body">
      <div class="menu">
        <div class="menu-item">
          <a href class="menu-item-link">登录</a>
          <i class="cubeic-arrow"></i>
        </div>

        <div class="menu-group">
          <div class="menu-group-title">板块</div>
          <div class="menu-item" v-for="(item) in menuData" :key="item.title">
            <a href="" class="menu-item-link">{{item.title}}</a>
            <router-link :to="{name: 'list', params: {type: item.type}}"></router-link>
            <i class="cubeic-arrow"></i>
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-group-title">其他</div>
          <div class="menu-item">
            <a href class="menu-item-link">给个star吧，亲</a>
            <i class="cubeic-arrow"></i>
          </div>
          <div class="menu-item">
            <a href class="menu-item-link">了解作者</a>
            <i class="cubeic-arrow"></i>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data () {
    return {
      menuData: [
        {type: 'all', title: '全部'},
        {type: 'good', title: '精华'},
        {type: 'share', title: '分享'},
        {type: 'ask', title: '问答'},
        {type: 'job', title: '招聘'},
        {type: 'dev', title: '客户端测试'}
      ]
    }
  }
}
</script>
<style lang="stylus">
.drawer-wrapper
  color #222
  display flex
  flex-direction column
  height 100vh
  background-color #fff
  width 270px
  .drawer-header
    background-color #444
    height 40px
    padding 5px
    box-sizing border-box
    // 此处为了展示上 压在侧边栏上
    // margin-right -1px
    .logo
      height 100%
  .drawer-body
    flex 1
    overflow-y auto 
    .menu
      .menu-group
        .menu-group-title
          padding 8px 16px
          background-color #F5F5F5
          border-bottom 1px solid rgba(0,0,0,0.08)
      .menu-item
        display flex
        align-items center
        justify-content center
        border-bottom 1px solid rgba(0,0,0,0.08)
        .cubeic-arrow
          margin-right 5px
          color #666
        .menu-item-link
          flex 1
          cursor pointer
          display block
          padding 12px 16px
          color #222
.drawer-wrapper.active
  box-shadow 0 4px 16px 0 rgba(0,0,0,0.12)
</style>