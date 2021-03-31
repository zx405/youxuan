import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import search from '../views/search.vue'
import tab from '../views/tab.vue'
import detail from '../views/detail.vue'
import download from '../views/download.vue'
import coursetab from '../views/coursetab.vue'
import category from '../views/category.vue'
import searchword from '../views/searchword.vue'

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
    path: '/search',
    component: search
  },
  {
    path: '/download',
    component: download
  },
  {
    path: '/tab/:myid',
    name: 'tab',
    component: tab
  },
  {
    path: '/c/:myid',
    component: detail
  },
  {
    path: '/category/:myid',
    component: category
  },
  {
    path: '/col/:myid',
    redirect: 'col/:myid/sub/7'
  },
  {
    path: '/col/:myid/sub/:youid',
    component: coursetab
  },
  {
    path: '/sub/c/:myid',
    component: detail
  },
  {
    path: '/searchword/:myid',
    component: searchword
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
