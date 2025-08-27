import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
// import { supabase } from '../lib/supabaseClient'
// import { inject } from 'vue'

// const auth = inject('auth')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },

    {
      path: '/watchlist',
      name: 'Watchlist',
      component: () => import('../views/Watchlist.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      name: 'Auth',
      component: AuthView,
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   if (!auth || (auth && !auth.user && to.meta.requiresAuth)) {
//     if (to.path !== '/auth') {
//       next('/auth')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
export default router
