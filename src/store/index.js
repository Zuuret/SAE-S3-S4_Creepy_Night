import Vue from 'vue'
import Vuex from 'vuex'
import controller from "@/datasource/controller";

Vue.use(Vuex)

import ProfilService from '../services/profil.service'

export default new Vuex.Store({
  state: {
    utilisateur: null,
    utilisateurs: [],
  },
  getters: {
  },
  mutations: {
    updateUtilisateur(state, utilisateur){
      state.utilisateur = utilisateur;
    },
    updateListeUtilisateur(state, utilisateurs){
      state.utilisateurs = utilisateurs;
    },
  },
  actions: {
    async enregistrementUtilisateur({commit}, data){
      console.log("enregistrement d'un nouvel utilisateur")
      let response = await controller.ajoutUtilisateur(data);
      if(response.error === 0){
        commit('updateUtilisateur', response.data);
        return true;
      } else {
        console.log(response.data);
        return false;
      }
    },
    async getAllUser({ commit }) {
      console.log("Récupération des utilisateurs");
      let response = await ProfilService.getAllUsers();
      if (response.error === 0) {
        commit('updateListeUtilisateur', response.data);
      } else {
        console.log(response.data);
      }
    },
    async getArtistes({ commit }) {
      console.log("Récupération des artistes");
      let response = await ProfilService.getAllUsers();
      if (response.error === 0) {
        commit('updateListeUtilisateur', response.data);
      } else {
        console.log(response.data);
      }
    },
  },
  modules: {
  }
})
