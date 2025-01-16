import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CineFilms from "../services/cineFilms.services";

export default ({
    namespaced: true,
    state: () => ({
        films: [],
        filmById: null,
        film: [],
        places_film: [],
    }),
    mutations: {
        updateListeFilms(state, films){
            state.films = films;
        },
        updateFilmById(state, filmById){
            state.filmById = filmById;
        },
        updateFilm(state, film){
            state.film = film;
        },
        updateListePlaceFilm(state, places_film){
            state.places_film = places_film;
        },
    },

    actions: {
        async getFilms({ commit }) {
            console.log("Récupération des films");
            let response = await CineFilms.getFilms();
            if (response.error === 0) {
                commit('updateListeFilms', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getFilmById({commit}, filmById){
            console.log("Récupération du film par id : ", filmById);
            let response = await CineFilms.getFilmById(filmById);
            if (response.error === 0) {
                commit('updateFilmById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async setFilm({commit}, film) {
            console.log("Injection de film envoyée");
            let response = await CineFilms.setFilm(film);
            if (response.error === 0) {
                commit('updateFilm', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getPlacesFilms({ commit }, places_film) {
            console.log("Récupération des places pour le film : ", places_film);
            let response = await CineFilms.getPlacesFilm(places_film);
            if (response.error === 0) {
                commit('updateListePlaceFilm', response.data);
            } else {
                console.log(response.data);
            }
        },
        async setPlaceFilm({ commit }, film) {
            console.log("Création du billet pour le film : ", film);
            let response = await CineFilms.setPlaceFilm(film);
            if (response.error === 0) {
                commit('ProfilStore/updateSoldeUtilisateur', response.data, { root : true });
                console.log(response.data);
            } else {
                console.log(response.data);
            }
        },
    }
})