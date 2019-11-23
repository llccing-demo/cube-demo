import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import list from '@/pages/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: 'list/:type',
        name: 'List',
        component: list
      }
      ]
    }
  ]
})
