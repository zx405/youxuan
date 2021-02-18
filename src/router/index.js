import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import search from '../views/search.vue'
import tab from '../views/tab.vue'
import detail from '../views/detail.vue'
import download from '../views/download.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/tab/1',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '*/search',
    component: search
  },
  {
    path: '*/download',
    component: download
  },
  {
    path: '/tab/:myid',
    name: 'tab',
    component: tab
  },
  {
    path: '/tab/c/:myid',
    component: detail
  },
  {
    path: '/c/:myid',
    redirect: '/tab/c/:myid'
  }

]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
