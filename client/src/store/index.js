import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ProfilStore from '../store/profil'
import ConcertStore from '../store/concert'
import CashLessStore from '../store/cashless'
import ExpositionStore from '../store/exposition'
import CinemaStore from "../store/cinema";
import SecuFlippeStore from '../store/secuflippe'
import BaltrouilleStore from "../store/baltrouille";
import UberFlippeStore from "../store/uberflippe";
import PrestataireStore from "../store/prestataire"
import CarihorreurStore from "@/store/carihorreur";
import organisateur from '../store/organisateur'; 
import profil from '../store/profil';
import transactions from '../store/transactions';
import texte_accueil from '../store/texte_accueil';
import carte from '../store/carte';
import i18n from '../store/i18n';

export default new Vuex.Store({
  modules: {
    ProfilStore,
    ConcertStore,
    CashLessStore,
    ExpositionStore,
    CinemaStore,
    SecuFlippeStore,
    BaltrouilleStore,
    CarihorreurStore,
    UberFlippeStore,
    PrestataireStore,
    organisateur,
    profil,
    transactions,
    texte_accueil,
    carte,
    i18n,
  }
})
