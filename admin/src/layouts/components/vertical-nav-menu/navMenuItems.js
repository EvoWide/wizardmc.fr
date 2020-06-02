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
    name: 'Accueil',
    slug: 'accueil',
    icon: 'HomeIcon'
  },
  {
    url: '/users',
    name: 'Utilisateurs',
    slug: 'utilisateurs',
    icon: 'UsersIcon'
  },
  {
    url: null,
    name: 'Boutique',
    slug: 'boutique',
    icon: 'ShoppingCartIcon',
    submenu: [
      {
        url: '/shop',
        name: 'Liste',
        slug: 'shopList'
      },
      {
        url: '/shop/create',
        name: 'Créer',
        slug: 'shopCreate'
      }
    ]
  },
  {
    url: null,
    name: 'Récompenses',
    slug: 'recompenses',
    icon: 'GiftIcon',
    submenu: [
      {
        url: '/rewards',
        name: 'Liste',
        slug: 'rewards'
      },
      {
        url: '/rewards/create',
        name: 'Créer',
        slug: 'rewardsCreate'
      }
    ]
  },
  {
    url: null,
    name: 'Historique',
    slug: 'historique',
    icon: 'BarChart2Icon',
    submenu: [
      {
        url: '/history/purchases',
        name: 'Achats',
        slug: 'achats'
      },
      {
        url: '/history/payments',
        name: 'Paiements',
        slug: 'paiements'
      }
    ]
  }
]
