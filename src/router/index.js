import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profil',
    name: 'profil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreationProfil.vue')
  },
  {
    path: '/concert',
    name: 'concert',
    component: () => import('../views/ReservationConcert.vue')
  },
  {
    path : '/concert/:id',
    name: 'reservationConcert',
    component: () => import('../views/ReservationConcertConfirmation.vue')
  },
  {
    path: '/concert/validate',
    name: 'validationConcert',
    component: () => import('../views/ValidationReservation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
