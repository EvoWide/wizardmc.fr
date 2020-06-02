/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/Users.vue')
        },
        {
          path: '/shop',
          name: 'shop',
          component: () => import('./views/Shop/index.vue')
        },
        {
          path: '/shop/create',
          name: 'shop-create',
          component: () => import('./views/Shop/create.vue')
        },
        {
          path: '/rewards',
          name: 'rewards',
          component: () => import('./views/Rewards/index.vue')
        },
        {
          path: '/rewards/create',
          name: 'rewards-create',
          component: () => import('./views/Rewards/create.vue')
        },
        {
          path: '/history/purchases',
          name: 'history-purchases',
          component: () => import('./views/Histories/purchases.vue')
        },
        {
          path: '/history/payments',
          name: 'history-payments',
          component: () => import('./views/Histories/payments.vue')
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
