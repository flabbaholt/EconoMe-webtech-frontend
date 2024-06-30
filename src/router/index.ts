import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OverviewView from "@/views/OverviewView.vue";
/**
 * @fileoverview This module defines the routes for the Vue application.
 */

/**
 * @name router
 * @description This is the router for the Vue application. It uses the 'history' mode of Vue Router, which eliminates the '#' from URLs.
 * @type {Router}
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  /**
   * @name routes
   * @description This is an array of route objects. Each object defines a route for the Vue application.
   */
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverviewView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
