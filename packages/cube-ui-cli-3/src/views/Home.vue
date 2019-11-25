<template>
  <div class="home">
    <nav-bar :title="TYPE_NAME[title]">
      <div slot="left" class="navbar-left" @click="toggleDrawer">
        <img class="logo" src="../assets/menu.svg" alt />
      </div>
    </nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { TYPE_NAME } from '@/common'
export default {
  data() {
    return {
      title: '顶部栏',
      showDrawer: false,
      TYPE_NAME
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('toggleDrawer')
    }
  },
  watch: {
    '$route.params.type': {
      handler(v) {
        this.title = v
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="stylus">
.navbar-left
  line-height 46px
  display flex
  justify-content center
  align-items center
  img
    width 30px
.navbar-left:active
  background-color #f2f3f5
</style>
