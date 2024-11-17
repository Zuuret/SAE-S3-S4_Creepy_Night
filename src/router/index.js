import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CreationProfil from '../views/CreationProfil.vue';
import ReservationConcertConfirmation from '../views/ReservationConcertConfirmation.vue';
import ValidationReservation from '../views/ValidationReservation.vue';
import CalendrierConcert from '../views/CalendrierConcert.vue';
import ConcertPlanner from "@/views/ConcertPlanner.vue";
import OrgaValidArtisteView from "@/views/OrgaValidArtisteView.vue";
import BilletAchat from "@/views/BilletAchat.vue";
import SecuFlippe from "@/views/SecuFlippe.vue";
import CaucheMarathon from "@/views/CaucheMarathon.vue";
import BalTrouille from "@/views/BalTrouille.vue";
import CariHorreur from "@/views/CariHorreur.vue";
import CashLess from "@/views/CashLess.vue";

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/profil', name: 'profil', component: CreationProfil },
  { path: '/concert/:id', name: 'reservationConcert', component: ReservationConcertConfirmation },
  { path: '/concert/:id/validate', name: 'validationConcert', component: ValidationReservation },
  { path: '/planning', name: 'Planning', component: ConcertPlanner},
  { path: '/concert-schedule', name: 'calendrierConcert', component: CalendrierConcert },
  { path: "/organisateur/validartiste", name: "validArtiste", component: OrgaValidArtisteView},
  { path: '/billet', name: 'billet', component: BilletAchat },
  { path: '/secuflippe', name: 'secuFlippe', component: SecuFlippe},
  { path: '/cauchemarathon', name: 'caucheMarathon', component: CaucheMarathon},
  { path: '/baltrouille', name: 'baltrouille', component: BalTrouille},
  { path: '/carihorreur', name: 'carihorreur', component: CariHorreur},
  { path: '/cashless', name: 'cashless', component: CashLess}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.body.style.overflow = 'auto';
  next();
});

export default router
