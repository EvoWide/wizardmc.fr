/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Dashboard",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/news",
    name: "Articles",
    slug: "news",
    icon: "BookOpenIcon",
  },
  {
    url: "/shop",
    name: "Boutique",
    slug: "shop",
    icon: "ShoppingCartIcon",
  },
  {
    url: "/users",
    name: "Utilisateurs",
    slug: "users",
    icon: "UsersIcon",
  },
]
