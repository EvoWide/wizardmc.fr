/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/',
    name: 'Home',
    slug: 'home',
    icon: 'HomeIcon'
  },
  {
    url: '/users',
    name: 'Users',
    slug: 'users',
    icon: 'UsersIcon'
  },
  {
    url: null,
    name: 'Shop',
    slug: 'shop',
    icon: 'ShoppingCartIcon',
    submenu: [
      {
        url: '/shop',
        name: 'List',
        slug: 'shopList'
      },
      {
        url: '/shop/create',
        name: 'Create',
        slug: 'shopCreate'
      }
    ]
  }
]
