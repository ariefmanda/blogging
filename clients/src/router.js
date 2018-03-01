import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Blogs from './views/Blogs.vue'
import Dashboard from './views/Dashboard.vue'
import BlogDetail from './views/BlogDetail.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blogs
    },
    {
      path: '/blog/:id',
      name: 'blogDetail',
      component: BlogDetail,
      props: true,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
  ]
})

export default router