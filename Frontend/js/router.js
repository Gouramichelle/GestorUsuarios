/**
 * @file Vue Router — login y dashboard
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import { getStoredToken } from './api/auth-api.js'
import { useAuthStore } from './stores/auth.js'

function getStoredTokenFromStore(auth) {
  return auth.token || getStoredToken()
}
import LoginView from './views/LoginView.js'
import DashboardView from './views/DashboardView.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    { path: '/', redirect: '/login' },
    { path: '/:pathMatch(.*)*', redirect: '/login' },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !getStoredTokenFromStore(auth)) {
    return { name: 'login' }
  }
  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
