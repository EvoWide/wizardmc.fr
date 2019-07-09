import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'
import { USER_REQUEST } from '@/store/actions/user'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/admin/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "admin" */ './views/admin/users/Index.vue'),
      meta: {
        requiresAuth: true,
        role: 'Administrateur'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Get role
  if (store.getters.isAuthenticated && store.state.user.profile.role === undefined) {
    store.dispatch(USER_REQUEST)
      .then(() => {
        CheckRoleAndAuth(to, from, next)
      })
  } else {
    CheckRoleAndAuth(to, from, next)
  }
})

function CheckRoleAndAuth (to, from, next) {
  // check if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    if (!store.getters.isAuthenticated) {
      next({ name: 'login' })
    }
    // Check role
    if (to.matched.some(rec => rec.meta.role)) {
      if (store.state.user.profile.role.name !== to.meta.role) {
        next({ name: 'home' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
}

export default router
