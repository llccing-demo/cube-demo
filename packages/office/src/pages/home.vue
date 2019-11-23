<template>
  <div class="home">
    <div class="header">{{title}}</div>
    <cube-button style="height: 40px" inline @click="toggleDrawer">show nav</cube-button>
    <router-view/>
  </div>
</template>

<script>
import Bus from '../Bus'
export default {
  data () {
    return {
      title: '顶部栏',
      showDrawer: false
    }
  },
  methods: {
    toggleDrawer () {
      Bus.$emit('toggle-drawer', this.showDrawer = !this.showDrawer)
    }
  }
}
</script>