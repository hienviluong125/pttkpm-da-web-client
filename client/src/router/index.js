import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign_up',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/workspaces',
    name: 'Workspaces',
    component: () => import('../views/Workspaces.vue')
  },
  {
    path: '/locations',
    name: 'Locations',
    component: () => import('../views/Locations.vue')
  },
  {
    path: '/ideas',
    name: 'Ideas',
    component: () => import('../views/Ideas.vue')
  },
  {
    path: '/Enterprise',
    name: 'Enterprise',
    component: () => import('../views/Enterprise.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
