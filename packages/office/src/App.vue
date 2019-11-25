<template>
  <div id="app">
    <Drawer class="drawer" :show="show" :class="{active: show}"></Drawer>
    <router-view class="content-box" :class="{'hide-drawer': !show}" />
  </div>
</template>

<script>
import Drawer from './components/Drawer'
import Bus from './Bus'
export default {
  name: 'app',
  components: {
    Drawer
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    Bus.$on('toggle-drawer', (v) => {
      this.show = v
    })
  }
}
</script>
<style lang="stylus">
#app
  font-size 14px
  height 100vh
  .drawer
    position fixed
    top 0
    bottom 0
    left -270px
    transition all .3s ease-in-out
  .drawer.active
    left 0
  .content-box
    position absolute
    left 270px
    transition all .3s ease-in-out
  .hide-drawer
    left 0
</style>