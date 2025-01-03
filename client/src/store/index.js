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
import CarihorreurStore from "@/store/carihorreur";

export default new Vuex.Store({
  modules: {
    ProfilStore,
    ConcertStore,
    CashLessStore,
    ExpositionStore,
    CinemaStore,
    SecuFlippeStore,
    BaltrouilleStore,
    CarihorreurStore
  }
})
