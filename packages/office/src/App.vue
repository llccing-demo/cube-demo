<template>
  <div id="app">
    <transition name="bounce">
      <Drawer v-model="show"></Drawer>
    </transition>
    <router-view />
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
  display flex

  .bounce-enter-active
    animation bounce-in 1s
  .bounce-leave-to
    animation bounce-out 1s

  @keyframes bounce-in 
    0% 
      transform translateX(-270px)
    100% 
      transform translateX(0px)
  @keyframes bounce-out
    0% 
      transform translateX(0)
    100% 
      transform translateX(-270px)
</style>