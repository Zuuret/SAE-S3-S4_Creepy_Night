import Vue from 'vue'
import Vuex from 'vuex'
import controller from "@/datasource/controller";

Vue.use(Vuex)

import ProfilService from '../services/profil.service'
import ConcertService from "../services/concert.service";

export default new Vuex.Store({
  state: {
    utilisateur: null,
    utilisateurs: [],
    concert: null,
    concerts: [],
    places_concert: [],
    coordonneesBancaire: null,
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
    updateConcertById(state, concert){
      state.concert = concert;
    },
    updateListeConcert(state, concerts){
      state.concerts = concerts;
    },
    updateListePlaceConcert(state, places_concert){
      state.places_concert = places_concert;
    },
    updateCoordonneesBancaire(state, coordonneesBancaire){
      state.coordonneesBancaire = coordonneesBancaire;
    }
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
    async getAllConcert({commit}){
      console.log("Récupération des concerts");
      let response = await ConcertService.getAllConcerts();
      if (response.error === 0) {
        commit('updateListeConcert', response.data);
      } else {
        console.log(response.data);
      }
    },
    async getConcertbyId({commit}, concertId){
      console.log("Récupération du concert ID : ", concertId);
      let response = await ConcertService.getConcertbyId(concertId);
      if (response.error === 0) {
        commit('updateConcertById', response.data);
      } else {
        console.log(response.data);
      }
    },
    async getPlacesConcerts({ commit }, concertId) {
      console.log("Récupération des places de concerts pour le concert ID : ", concertId);
      let response = await ConcertService.getPlacesConcerts(concertId);
      if (response.error === 0) {
        commit('updateListePlaceConcert', response.data);
      } else {
        console.log(response.data);
      }
    },
    async validerPaiement({commit}, data){
      console.log("enregistrement de nouvelles données bancaire")
      let response = await controller.validerPaiement(data);
      if(response.error === 0){
        commit('updateCoordonneesBancaire', response.data);
        return true;
      } else {
        console.log(response.data);
      }
    }
  },
  modules: {
  }
})


