import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detail from '../views/Details.vue'
import Create from '../views/Create.vue'
import Tag from '@/views/Tag.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:"/posts/:id",
    name : "Detail",
    component: Detail,
    props : true
  },
  {
    path:"/create",
    name : "create",
    component:Create,
  },
  {
    path:'/tags/:tag',
    name : 'tag',
    component:Tag,
    props : true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
