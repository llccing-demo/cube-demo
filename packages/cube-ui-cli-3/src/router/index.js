import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import list from '@/views/list'
import detail from '@/views/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/list/all',
      children: [
        {
          path: 'list/:type',
          name: 'list',
          component: list
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: detail
        }
      ]
    }
  ]
})
