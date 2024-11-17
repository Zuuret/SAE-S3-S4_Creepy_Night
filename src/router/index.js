import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrgaValidArtisteView from "@/views/OrgaValidArtisteView.vue";
import PageExpo from "@/views/Expo.vue";
import ReservationExpo from "@/views/ReservationExpo.vue";
import ReservationCinepeurConfirmation from "@/views/ReservationCinepeurConfirmation.vue";
import ReservationCinepeurValidation from "@/views/ReservationCinepeurValidation.vue";
import ReservationCinepeur from "@/views/ReservationCinepeur.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/organisateur/validartiste",
    name: "validArtiste",
    component: OrgaValidArtisteView
  },
  {
    path: '/expo',
    name: 'expo',
    component: PageExpo
  },
  {
    path: '/expo/:id',
    name: 'reservationExpo',
    component: ReservationExpo
  },
  {
    path: '/cinepeur',
    name: 'cinepeur',
    component: ReservationCinepeur
  },
  {
    path: '/cinepeur/:id',
    name: 'reservationCinepeur',
    component: ReservationCinepeurConfirmation
  },
  {
    path: '/cinepeur/:id/validate',
    name: 'validationCinepeur',
    component: ReservationCinepeurValidation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
