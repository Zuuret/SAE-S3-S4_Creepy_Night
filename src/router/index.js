import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreationProfil from '../views/CreationProfil.vue';
import ReservationConcert from '../views/ReservationConcert.vue';
import ReservationConcertConfirmation from '../views/ReservationConcertConfirmation.vue';
import ValidationReservation from '../views/ValidationReservation.vue';
import CalendrierConcert from '../views/CalendrierConcert.vue';
import ConcertPlanner from "@/views/ConcertPlanner.vue";
import OrgaValidArtisteView from "@/views/OrgaValidArtisteView.vue";
import Esteban from "@/views/Esteban.vue"

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/profil', name: 'profil', component: CreationProfil },
  { path: '/concert', name: 'concert', component: ReservationConcert },
  { path: '/concert/:id', name: 'reservationConcert', component: ReservationConcertConfirmation },
  { path: '/concert/:id/validate', name: 'validationConcert', component: ValidationReservation },
  { path: '/planning', name: 'Planning', component: ConcertPlanner},
  { path: '/concert-schedule', name: 'calendrierConcert', component: CalendrierConcert },
  { path: "/organisateur/validartiste", name: "validArtiste", component: OrgaValidArtisteView},
  {path: "/estebanGay", name: "Esteban", component: Esteban}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
