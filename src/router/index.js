import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import { userSession } from '../services/authServices'
import { supabase } from '../services/supabaseClient'

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

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  userSession.value = data.session
  if (to.meta.requiresAuth && !userSession.value) {
    next('/auth')
  } else {
    next()
  }
})
export default router
