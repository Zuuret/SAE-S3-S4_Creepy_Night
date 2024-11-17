import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ValidArtiste from '../services/validArtiste.service'
import ExpoOeuvres from '../services/expoOeuvres.services'

export default new Vuex.Store({
  state: {
    artistes: [],
    artiste: [],
    oeuvres: [],
  },
  getters: {
  },
  mutations: {
    updateListeArtistes(state, artistes){
      state.artistes = artistes;
    },
    updateArtiste(state, artiste){
      state.artiste = artiste;
    },
    updateListeOeuvres(state, oeuvres){
      state.oeuvres = oeuvres;
    },
  },
  actions: {
    async getArtistes({ commit }) {
      console.log("Récupération des artistes");
      let response = await ValidArtiste.getArtistes();
      if (response.error === 0) {
        commit('updateListeArtistes', response.data);
      } else {
        console.log(response.data);
      }
    },
    async setDecision({commit}, artiste) {
      console.log("Récupération des artistes");
      let response = await ValidArtiste.setDecision(artiste);
      if (response.error === 0) {
        commit('updateArtiste', response.data);
      } else {
        console.log(response.data);
      }
    },
    async getOeuvres({ commit }) {
      console.log("Récupération des oeuvres");
      let response = await ExpoOeuvres.getOeuvres();
      if (response.error === 0) {
        commit('updateListeOeuvres', response.data);
      } else {
        console.log(response.data);
      }
    },
  },
  modules: {
  }
})
