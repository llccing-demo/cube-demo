<template>
  <div id="app">
    <Drawer class="drawer" :class="{ active: drawerOpen }"></Drawer>
    <router-view class="content-box" :class="{ 'hide-drawer': !drawerOpen }" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Drawer from './components/Drawer'
export default {
  name: 'app',
  components: {
    Drawer
  },
  computed: {
    ...mapState(['drawerOpen'])
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
