import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '../views/HomeView.vue';
import CreationProfil from '../views/CreationProfil.vue';
import MonProfil from '../views/MonProfil.vue'

import ReservationConcertConfirmation from '../views/ReservationConcertConfirmation.vue';
import ValidationReservation from '../views/ValidationReservation.vue';
import CalendrierConcert from '../views/CalendrierConcert.vue';
import ConcertPlanner from "@/views/ConcertPlanner.vue";
import OrgaValidArtisteView from "@/views/OrgaValidArtisteView.vue";
import reservationConcert from "@/views/ReservationConcert.vue";

import BilletAchat from "@/views/BilletAchat.vue";
import PaymentForm from '@/views/PaymentForm.vue';
import PageConnexion from '@/views/Connexion.vue';
import HomeOrganisateur from '../views/HomeOrganisateur.vue';

import Secuflippe from "@/views/Secuflippe.vue";
import SecuflippeSignalement from "@/views/SecuflippeSignalement.vue";
import SecuflippeMesSignalements from "@/views/SecuflippeMesSignalements.vue";

import BalTrouille from "@/views/BalTrouille.vue";
import BaltrouilleDeguisement from "@/views/BaltrouilleDeguisement.vue"
import LocationDeguisement from "@/views/LocationDeguisement.vue";
import ReservationDeguisement from "@/views/ReservationDeguisement.vue";

import CariHorreur from "@/views/CariHorreur.vue"

import CarteInteractive from "@/views/CarteInteractive.vue";

import CaucheMarathon from "@/views/CaucheMarathon.vue";

import PageExpo from "@/views/Expo.vue";
import ReservationExpo from "@/views/ReservationExpo.vue";

import ReservationCinepeurConfirmation from "@/views/ReservationCinepeurConfirmation.vue";
import ReservationCinepeurValidation from "@/views/ReservationCinepeurValidation.vue";
import ReservationCinepeur from "@/views/ReservationCinepeur.vue";

import CashLess from "@/views/CashLess.vue";
import PaiementCashLess from "@/views/PaymentFormCashLess.vue";

import HomePrestataire from "@/views/HomePrestataire.vue";
import PrestatairePublic from "@/views/PrestatairePublic.vue"
import PrestataireSpecifique from "@/views/PrestataireSpecifique.vue";
import PrestataireArticle from "@/views/PrestataireArticle.vue";
import ArticleSpecifique from "@/views/ArticleSpecifique.vue";

import UberFlippe from "@/views/UberFlippe.vue";
import UserProfile from '@/views/UserProfile.vue';

import OrgaUtilisateurs from '@/views/OrgaUtilisateurs.vue';
import OrgaOrganisateurs from "@/views/OrgaOrganisateurs.vue";
import OrgaPrestataires from "@/views/OrgaPrestataires.vue";
import OrgaDemandes from "@/views/OrgaDemandes.vue"
import OrgaProfil from "@/views/OrgaProfil.vue"

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/creation-profil', name: 'creationProfil', component: CreationProfil },
  { path: '/connexion', name: 'PageConnexion', component: PageConnexion },
  { path: '/profil', name: 'profil', component: MonProfil },
  { path: '/concert', name: 'calendrierConcert', component: CalendrierConcert },
  { path: '/concert/reservations', name: 'Reservation', component: reservationConcert},
  { path: '/concert/:id', name: 'reservationConcert', component: ReservationConcertConfirmation },
  { path: '/concert/:id/validate', name: 'validationConcert', component: ValidationReservation },
  { path: '/planning', name: 'Planning', component: ConcertPlanner},
  { path: '/organisateur/validartiste', name: 'validArtiste', component: OrgaValidArtisteView, meta: { requiresOrganisateur: true } },
  { path: '/billet', name: 'billet', component: BilletAchat },
  { path: '/payment/:ticketId', name: 'PaymentForm', component: PaymentForm },
  { path: '/secuflippe', name: 'secuflippe', component: Secuflippe},
  {path: '/secuflippe/signalement', name: 'secuflippeSignalement', component: SecuflippeSignalement},
  {path: '/secuflippe/mesSignalements', name: "secuflippeMesSignalements", component: SecuflippeMesSignalements},
  { path: '/cauchemarathon', name: 'caucheMarathon', component: CaucheMarathon},
  { path: '/baltrouille', name: 'baltrouille', component: BalTrouille},
  { path: '/baltrouille/:soireeId/deguisements', name: 'BaltrouilleDeguisement', component: BaltrouilleDeguisement},
  { path: '/baltrouille/:soireeId/deguisements/:deguisementId', name: 'locationDeguisement', component: LocationDeguisement},
  { path: '/baltrouille/reservations', name: 'BaltrouilleReservations', component: ReservationDeguisement},
  { path: '/cashless', name: 'cashless', component: CashLess},
  { path: '/carihorreur', name: 'carihorreur', component: CariHorreur},
  { path: '/carte-interactive', name: 'carte-interactive', component: CarteInteractive},
  { path: '/expo', name: 'expo', component: PageExpo },
  { path: '/expo/:id', name: 'reservationExpo', component: ReservationExpo },
  { path: '/cinepeur', name: 'cinepeur', component: ReservationCinepeur },
  { path: '/cinepeur/:id', name: 'reservationCinepeur', component: ReservationCinepeurConfirmation },
  { path: '/cinepeur/:id/validate', name: 'validationCinepeur', component: ReservationCinepeurValidation},
  { path: '/uberflippe', name: 'uberFlippe', component: UberFlippe},
  { path: '/home-organisateur', name: 'HomeOrganisateur', component: HomeOrganisateur },
  { path: '/home-prestataire', name: 'HomePrestataire', component: HomePrestataire },
  { path: '/cashless/paiement/', name: 'PaymentFormCashLess', component: PaiementCashLess },
  { path: '/prestataire', name: 'Prestataire', component: PrestatairePublic },
  { path: '/prestataire/:id', name: 'PrestataireSpecifique', component: PrestataireSpecifique },
  { path: '/prestataire/:id/articles', name: 'PrestataireArticle', component: PrestataireArticle },
  { path: '/prestataire/:id/articles/:idArticle', name: 'ArticleSpecifique', component: ArticleSpecifique },
  { path: '/user/:id', name: 'UserProfile', component: UserProfile },
  { path: '/orga-utilisateurs', name: 'OrgaUtilisateurs', component: OrgaUtilisateurs },
  { path: '/orga-organisateurs', name: 'OrgaOrganisateurs', component: OrgaOrganisateurs },
  { path: '/orga-prestataires', name: 'OrgaPrestataires', component: OrgaPrestataires },
  { path: '/orga-demandes', name: 'OrgaDemandes', component: OrgaDemandes },
  { path: '/orga-profil', name: 'OrgaProfil', component: OrgaProfil },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* eslint-disable */
export default router