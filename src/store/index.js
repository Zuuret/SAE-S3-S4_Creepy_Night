import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import ValidArtiste from '../services/validArtiste.service'
import ExpoOeuvres from '../services/expoOeuvres.services'
import CineFilms from '../services/cineFilms.services'
import controller from "@/datasource/controller";

export default new Vuex.Store({
  state: {
    artistes: [],
    artiste: [],
    oeuvres: [],
    oeuvre: [],
    films: [],
    film: [],
    places_concert: [],
    coordonneesBancaire: null,
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
    updateOeuvre(state, oeuvre){
      state.oeuvre = oeuvre;
    },
    updateListeFilms(state, films){
      state.films = films;
    },
    updateFilm(state, film){
      state.film = film;
    },
    updateListePlaceFilm(state, places_film){
      state.places_film = places_film;
    },
    updateCoordonneesBancaire(state, coordonneesBancaire){
      state.coordonneesBancaire = coordonneesBancaire;
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
      console.log("Decision donnée");
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
    async setOeuvre({commit}, oeuvre) {
      console.log("Demande d'emplacement envoyée");
      let response = await ExpoOeuvres.setOeuvre(oeuvre);
      if (response.error === 0) {
        commit('updateOeuvre', response.data);
      } else {
        console.log(response.data);
      }
    },
    async getFilms({ commit }) {
      console.log("Récupération des films");
      let response = await CineFilms.getFilms();
      if (response.error === 0) {
        commit('updateListeFilms', response.data);
      } else {
        console.log(response.data);
      }
    },
    async setFilm({commit}, film) {
      console.log("Demande de film envoyée");
      let response = await CineFilms.setFilm(film);
      if (response.error === 0) {
        commit('updateFilm', response.data);
      } else {
        console.log(response.data);
      }
    },
    async getPlacesFilms({ commit }, concertId) {
      console.log("Récupération des places de concerts pour le concert ID : ", concertId);
      let response = await CineFilms.getPlacesFilms(concertId);
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
      } else {
        console.log(response.data);
      }
    },
  },
  modules: {
  }
})
