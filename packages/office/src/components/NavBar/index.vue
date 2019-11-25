<template>
  <div class="navbar">
    <slot name="left">
      <div class="navbar-left">
        <span class="navbar-back-wrap">
          <i class="cubeic-back"></i>
          <span>返回</span>
        </span>
      </div>
    </slot>
    <div class="navbar-title">
      <slot name="title">
        <span>{{title}}</span>
      </slot>
    </div>
    <div class="navbar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="stylus">
.navbar
  display flex
  justify-content space-between
  align-items center
  height 46px
  box-sizing border-box
  line-height 46px
  box-shadow 4px 0 16px 0 rgba(0,0,0,0.12)
  &-left
    width 60px
    .navbar-back-wrap
      display block
      padding 0 5px
    .navbar-back-wrap:active
      background-color #f2f3f5
  &-title
    flex 1
    text-align center
    span 
      font-weight 600
  &-right
    width 60px
  

</style>