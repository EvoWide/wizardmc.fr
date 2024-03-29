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
    name: 'Articles',
    slug: 'articles',
    icon: 'FileTextIcon',
    submenu: [
      {
        url: '/posts',
        name: 'Liste',
        slug: 'listeArticles'
      },
      {
        url: '/posts/create',
        name: 'Créer',
        slug: 'creerArticles'
      }
    ]
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
        slug: 'listeBoutique'
      },
      {
        url: '/shop/create',
        name: 'Créer',
        slug: 'creerBoutique'
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
        slug: 'creerRecompenseVote'
      }
    ]
  },
  {
    url: null,
    name: 'Historiques',
    slug: 'historiques',
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
