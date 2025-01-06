import Vue from 'vue';
import Vuex from 'vuex';
import ProfilService from '../services/profil.service';
import CashLessService from '../services/cashless.service';
import { getAllUtilisateurs, getAllOrganisateurs, getAllPrestataires } from "@/services/profil.service";


Vue.use(Vuex);

export default ({
    namespaced: true,
    state: {
        utilisateur: null,
        utilisateurs: [],
        organisateur: null,
        organisateurs: [],
        prestataire: null,
        prestataires: [],
        errorMessage: '',
        utilisateurConnecte: JSON.parse(localStorage.getItem("utilisateurConnecte")) || null,
        logo: null,
    },
    mutations: {
        addUtilisateur(state, utilisateur) {
            state.utilisateurs.push(utilisateur);
        },
        addOrganisateur(state, organisateur) {
            state.organisateurs.push(organisateur);
        },
        addPrestataire(state, prestataire) {
            state.prestataires.push(prestataire);
        },
        updateUtilisateurbyId(state, utilisateur) {
            state.utilisateur = utilisateur;
        },
        updateOrganisateurbyId(state, organisateur) {
            state.organisateur = organisateur;
        },
        updatePrestatairebyId(state, prestataire) {
            state.prestataire = prestataire;
        },
        updateListeUtilisateur(state, utilisateurs) {
            state.utilisateurs = utilisateurs;
        },
        updateListeOrganisateur(state, organisateurs){
            state.organisateurs = organisateurs;
        },
        updateListePrestataire(state, prestataires){
            state.prestataires = prestataires;
        },
        updateErrorMessage(state, errorMessage) {
            state.errorMessage = errorMessage;
        },
        updateUtilisateurConnecte(state, utilisateur) {
            state.utilisateurConnecte = utilisateur;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));
            console.log('Utilisateur connecté:');
        },
        updateSoldeUtilisateur(state, solde) {
            state.utilisateurConnecte.solde = solde;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        clearUtilisateurConnecte(state) {
            state.utilisateurConnecte = null;
            localStorage.removeItem("utilisateurConnecte");
            console.log('Utilisateur déconnecté');
        },
        updateLogo(state, logo) {
            if (state.utilisateurConnecte) {
                state.utilisateurConnecte.logo = logo;
                localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
            }
        },
        SET_UTILISATEURS(state, utilisateurs) {
            state.utilisateurs = utilisateurs;
        },
        SET_ORGANISATEURS(state, organisateurs) {
            state.organisateurs = organisateurs;
        },
        SET_PRESTATAIRES(state, prestataires) {
            state.prestataires = prestataires;
        },
    },

    actions: {
        async updateErrorMessage({ commit }, message) {
            commit('updateErrorMessage', message);
        },
        async enregistrementUtilisateur({ commit }, data) {
            console.log("Enregistrement d'un nouvel utilisateur");
            let response = await ProfilService.ajoutUtilisateur(data);
            if (response.error === 0) {
                commit('addUtilisateur', response.data);
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async enregistrementOrganisateur({ commit }, data) {
            console.log("Enregistrement d'un nouvel organisateur");
            let response = await ProfilService.ajoutOrganisateur(data);
            if (response.error === 0) {
                commit('addOrganisateur', response.data);
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async enregistrementPrestataire({ commit }, data) {
            console.log("Enregistrement d'un nouveau prestataire");
            let response = await ProfilService.ajoutPrestataire(data);
            if (response.error === 0) {
                commit('addPrestataire', response.data);
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async loginUser({ commit }, { data, userType }) {
            let response;
            if (userType === 'utilisateur') {
                response = await ProfilService.loginSiteUtilisateur(data);
            } else if (userType === 'organisateur') {
                response = await ProfilService.loginSiteOrganisateur(data);
            } else if (userType === 'prestataire') {
                response = await ProfilService.loginSitePrestataire(data);
            }

            if (response.error === 0) {
                commit('updateUtilisateurConnecte', response.data);
                if (userType === 'prestataire' && response.data.logo instanceof File) {
                    const logoUrl = URL.createObjectURL(response.data.logo);
                    commit('updateLogo', logoUrl);
                }
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async loginSiteUtilisateur({ commit }, data) {
            const response = await ProfilService.loginSiteUtilisateur(data);
            if (response.error === 0) {
                commit('updateUtilisateurbyId', response.data);
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async loginSiteOrganisateur({ commit }, data) {
            const response = await ProfilService.loginSiteOrganisateur(data);
            if (response.error === 0) {
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async loginSitePrestataire({ commit }, data) {
            const response = await ProfilService.loginSitePrestataire(data);
            if (response.error === 0) {
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async getAllUtilisateur({ commit }) {
            console.log("Récupération des utilisateurs");
            let response = await ProfilService.getAllUtilisateur();
            if (response.error === 0) {
                commit('updateListeUtilisateur', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getAllOrganisateur({ commit }) {
            console.log("Récupération des organisateurs");
            let response = await ProfilService.getAllOrganisateur();
            if (response.error === 0) {
                commit('updateListeOrganisateur', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getAllPrestataire({ commit }) {
            console.log("Récupération des prestataires");
            let response = await ProfilService.getAllPrestataire();
            if (response.error === 0) {
                commit('updateListePrestataire', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getUserbyId({ commit }, idUser) {
            console.log("Récupération de l'id de l'utilisateur");
            let response = await ProfilService.getUserbyId(idUser);
            if (response.error === 0) {
                commit('updateUtilisateurbyId', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getPrestairebyId({ commit }, idPrestataire) {
            console.log("Récupération de l'id du prestataire");
            let response = await ProfilService.getPrestatairebyId(idPrestataire);
            if (response.error === 0) {
                commit('updatePrestatairebyId', response.data);
            } else {
                console.log(response.data);
            }
        },
        async logoutUser({commit}){
            commit('clearUtilisateurConnecte')
        },
        async updateFunds({ commit }, data) {
            console.log("Mise à jour du solde de l'utilisateur");
            let response = await CashLessService.updateFunds(data);
            if (response.error === 0) {
                commit('updateSoldeUtilisateur', response.data);
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },
        async checkBankCard({ commit }, data) {
            console.log("Vérification du compte bancaire de l'utilisateur");
            let response = await CashLessService.checkBankCard(data);
            if (response.error === 0) {
                commit('updateErrorMessage', '');
                return true;
            } else {
                commit('updateErrorMessage', response.data);
                return false;
            }
        },
        async fetchUtilisateurs({ commit }) {
            const response = await getAllUtilisateurs();
            if (response.error === 0) {
                commit('SET_UTILISATEURS', response.data);
            }
        },
        async fetchOrganisateurs({ commit }) {
            const response = await getAllOrganisateurs();
            if (response.error === 0) {
                commit('SET_ORGANISATEURS', response.data);
            }
        },
        async fetchPrestataires({ commit }) {
            const response = await getAllPrestataires();
            if (response.error === 0) {
                commit('SET_PRESTATAIRES', response.data);
            }
        },
    },
    getters: {
        utilisateurConnecte: state => state.utilisateurConnecte,
    },
});
