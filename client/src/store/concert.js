import Vue from 'vue'
import Vuex from 'vuex'
import ConcertService from "../services/concert.service";
import ValidArtiste from "../services/validArtiste.service";
import { getAllConcerts, getReservConcertByUserId, getConcertById, getAllReservConcert, getReservConcertById,insertReservConcert,deleteReservConcert } from "@/services/concert.service"

Vue.use(Vuex)



export default ({
    namespaced: true,
    state: {
        concerts: [],
        concert: null,
        reservsconcert: [],
        reservconcert: null,
        artistes: [],
        artiste: [],
        place_concert: null,
        places_concert: [],
        panier: [],
        reservations: [],
        reservationsId: [],
        utilisateurConnecte: JSON.parse(localStorage.getItem("utilisateurConnecte")) || null,
    },
    mutations: {
        SET_CONCERTS(state, concerts) {
            state.concerts = concerts;
        },
        SET_CONCERT(state, concert) {
            console.log('Mutation SET_CONCERT appelée avec:', concert); // Debug
            state.concert = concert;
          },
        SET_RESERVSCONCERT(state, reservsconcert) {
            state.reservsconcert = reservsconcert;
        },
        SET_RESERVCONCERT(state, reservConcert) {
            state.reservConcert = reservConcert;
        },
        ADD_RESERVATION(state, newReservation) {
            state.reservsconcert.push(newReservation);
        },
        UPDATE_CONCERT_STOCK(state, { concertId, nbPlaces }) {
            const concert = state.concerts.find(c => c.id === concertId) || state.concert;
            if (concert) {
                concert.nb_places += nbPlaces;
            }
        },
        updateReservationConcertId(state, reservationsId){
            state.reservationsId = reservationsId
            console.log(reservationsId)
        },
        updateConcertById(state, concert){
            state.concert = concert;
        },
        updateListePlaceConcert(state, places_concert){
            state.places_concert = places_concert;
        },
        updatePlaceConcertById(state, place_concert){
            state.place_concert = place_concert
        },
        updatePanier(state, panier) {
            state.panier = panier;
        },
        ajouterAuPanier(state, { placeId, nbPlaces, concert, place }) {
            let placeDansPanier = state.panier.find(item => item.placeId === placeId);
            if (placeDansPanier) {
                placeDansPanier.nbPlaces = nbPlaces
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * place.prix_place;
            } else {
                state.panier.push({
                    placeId: placeId,
                    nbPlaces: nbPlaces,
                    prixTotal: nbPlaces * place.prix_place,
                    concert: concert,
                    place: place,
                });
            }
        },
        retirerDuPanier(state, { placeId }) {
            const placeDansPanier = state.panier.find(item => item.placeId === placeId);
            const placesConcert = state.places_concert.find(place => place.id_concert === placeId);
            if (placeDansPanier && placesConcert) {
                placeDansPanier.nbPlaces -= 1;
                placesConcert.nb_places += 1;
                placeDansPanier.prixTotal = placeDansPanier.nbPlaces * placeDansPanier.place.prix_place;
                if (placeDansPanier.nbPlaces <= 0) {
                    state.panier = state.panier.filter(item => item.placeId !== placeId);
                }
            }
        },
        viderPlace(state, { placeId }) {
            const placeDansPanier = state.panier.find(item => item.placeId === placeId);
            const placesConcert = state.places_concert.find(place => place.id_concert === placeId);
            if (placeDansPanier && placesConcert) {
                placesConcert.nb_places += placeDansPanier.nbPlaces;
                placeDansPanier.nbPlaces = 0;
                placeDansPanier.prixTotal = 0;
                state.panier = state.panier.filter(item => item.placeId !== placeId);
            } else {
                console.log("Concert non trouvé dans le panier.");
            }
        },
        reserverConcert(state, reservation) {
            state.reservations.push(reservation);
            state.reservationsId.push(reservation.id_reservation);
            state.panier = [];
        },
        
        updateListeArtistes(state, artistes){
            state.artistes = artistes;
        },
        updateArtiste(state, artiste){
            state.artiste = artiste;
        },
    },
    actions: {
        async getAllConcert({ commit }) {
            const response = await getAllConcerts();
            if (response.error === 0) {
                commit('SET_CONCERTS', response.data);
            }
        },
        async getConcertById({ commit }, id) {
            try {
              const response = await getConcertById(id);
              console.log('Réponse de l\'API pour getConcertById:', response); // Debug
              if (response.error === 0) {
                commit('SET_CONCERT', response.data);
                console.log('Concert mis à jour dans l\'état Vuex:', response.data); // Debug
              } else {
                console.error('Concert non trouvé:', id);
                throw new Error('Concert non trouvé');
              }
            } catch (error) {
              console.error('Erreur API:', error);
              throw error;
            }
          },
        async getAllReservConcert({ commit }) {
            const response = await getAllReservConcert();
            if (response.error === 0) {
                commit('SET_RESERVSCONCERT', response.data);
            }
        },
        async getReservConcertById({ commit }, uuid) {
            const response = await getReservConcertById(uuid);
            if (response.error === 0) {
                commit('SET_RESERVCONCERT', response.data);
            }
        },
        async reserveConcert({ commit }, { concertId, nbPlaces }) {
            try {
                const response = await insertReservConcert({
                    concert_id: concertId,
                    nb_places: nbPlaces,
                    utilisateur_id: this.state.utilisateurConnecte.id,
                    date_reservation: new Date().toISOString()
                });
    
                if (response.error === 0) {
                    commit('ADD_RESERVATION', response.data);
                    return { success: true };
                }
                throw new Error(response.data);
            } catch (error) {
                console.error("Erreur réservation:", error);
                throw error;
            }
        },

        async fetchUserReservations({ commit, state }) {
            try {
              const allReservs = await getAllReservConcert();
              const userReservs = allReservs.data.filter(reserv => 
                reserv.userId === state.utilisateurConnecte?.id
              );
        
              commit('SET_RESERVSCONCERT', userReservs);
              
            } catch (error) {
              console.error("Erreur de chargement:", error);
            }
          },
        async getReservationConcertById({ commit }, userId) {
            try {
              const response = await getReservConcertByUserId(userId); 
              if (response.error === 0) {
                commit('updateReservationConcertId', response.data);
              }
            } catch (error) {
              console.error("Erreur de chargement des réservations", error);
            }
          },
        async insertReservConcert({ dispatch }, payload) {
            const response = await insertReservConcert(payload);
            if (response.error === 0) {
                await dispatch('getAllReservConcert');
            }
            return response;
        },
        
        async deleteReservConcert({ dispatch }, id) {
            const response = await deleteReservConcert(id);
            if (response.error === 0) {
                await dispatch('getAllReservConcert');
            }
            return response;
        },
        async getAllPlacesConcert({commit}){
            console.log("Récupération des places de concert");
            let response = await ConcertService.getAllPlaceConcert();
            if (response.error === 0) {
                commit('updateListePlaceConcert', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getPlacesConcertsbyId({ commit }, placeId) {
            console.log("Récupération des places de concerts pour le concert ID : ", placeId);
            let response = await ConcertService.getPlacesConcertsbyId(placeId);
            if (response.error === 0) {
                commit('updatePlaceConcertById', response.data);
            } else {
                console.log(response.data);
            }
        },
        async ajouterAuPanier({ commit }, { placeId, nbPlaces }) {
            console.log("Ajout dans le panier")
            let response = await ConcertService.ajouterAuPanier(placeId, nbPlaces)
            if (response.error === 0) {
                commit("ajouterAuPanier", response.data);
            } else {
                console.log(response.data);
            }
        },
        async retirerDuPanier({ commit }, { placeId }) {
            console.log("Retrait dans le panier");
            let response = await ConcertService.retirerDuPanier(placeId)
            if (response.error === 0){
                commit("retirerDuPanier", response.data);
            } else {
                console.log(response.data)
            }
        },
        async viderPlace({ commit }, { placeId }) {
            console.log("Supression dans le panier");
            let response = await ConcertService.viderPlace(placeId)
            if (response.error === 0) {
                commit("viderPlace", response.data);
            } else {
                console.log(response.data)
            }
        },
        async reserverConcert({ commit }, idUser) {
            console.log("Ajout d'une reservation pour ID :", idUser);
            let response = await ConcertService.addReservationConcert(idUser);
            if (response.error === 0) {
                commit('reserverConcert', response.data.newRes);
                commit('ProfilStore/updateSoldeUtilisateur', response.data.solde, { root: true });
            } else {
                console.error(response.data);
            }
        },
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
    }
})