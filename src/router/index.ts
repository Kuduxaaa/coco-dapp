/**
 * Vue Router configuration and route definitions.
 * Routes with `showNav: true` display the bottom navigation bar.
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import LabView from '../views/LabView.vue'
import AssetsView from '../views/AssetsView.vue'
import FriendsView from '../views/FriendsView.vue'
import GameView from '../views/GameView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { showNav: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { showNav: true, requiresInit: true }
    },
    {
      path: '/lab',
      name: 'lab',
      component: LabView,
      meta: { showNav: true, requiresInit: true }
    },
    {
      path: '/assets',
      name: 'assets',
      component: AssetsView,
      meta: { showNav: true, requiresInit: true }
    },
    {
      path: '/network',
      name: 'network',
      component: FriendsView,
      meta: { showNav: true, requiresInit: true }
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      meta: { showNav: true, requiresInit: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { showNav: false, requiresInit: true }
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresInit && !sessionStorage.getItem('node_initialized')) {
    return { name: 'home' }
  }
})

export default router
