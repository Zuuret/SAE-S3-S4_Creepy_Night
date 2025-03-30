
import Vue from 'vue';
import Vuex from 'vuex';
import ProfilService from '../services/profil.service';
import CashLessService from '../services/cashless.service';
import { getAllUtilisateurs, getPrestataireById, getUserById , getAllOrganisateurs, getAllPrestataires, getDemandesOrganisateurs, getDemandesPrestataires, deleteDemandePrestataire, deleteDemandeOrganisateur, insertOrganisateur, insertPrestataire } from "@/services/profil.service";
import {demandesPrestataires as initialDemandesPrestataires} from '../datasource/data';
import { demandesOrganisateurs as initialDemandesOrganisateurs } from '../datasource/data';

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
        demandesPrestataires: initialDemandesPrestataires,
        demandesOrganisateurs: initialDemandesOrganisateurs,
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
            console.log(prestataire)
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
        SET_UTILISATEURS(state, utilisateurs) {
            state.utilisateurs = utilisateurs;
        },
        SET_UTILISATEUR(state, utilisateur) {
            state.utilisateur = utilisateur;
        },
        SET_PRESTATAIRE(state, prestataire) {
            state.prestataire = prestataire;
        },
        SET_ORGANISATEURS(state, organisateurs) {
            state.organisateurs = organisateurs;
        },
        SET_PRESTATAIRES(state, prestataires) {
            state.prestataires = prestataires;
        },
        addDemandePrestataire(state, demande) {
            state.demandesPrestataires.push(demande);
        },
        addDemandeOrganisateur(state, demande) {
            state.demandesOrganisateurs.push(demande);
        },
        SET_DEMANDES_PRESTATAIRES(state, demandes) {
            state.demandesPrestataires = demandes;
        },
        SET_DEMANDES_ORGANISATEURS(state, demandes) {
            state.demandesOrganisateurs = demandes;
        },
        DELETE_DEMANDE_PRESTATAIRE(state, demandeId) {
            state.demandesPrestataires = state.demandesPrestataires.filter(d => d.id !== demandeId);
        },
        DELETE_DEMANDE_ORGANISATEUR(state, demandeId) {
            state.demandesOrganisateurs = state.demandesOrganisateurs.filter(d => d.id !== demandeId);
        },
        removeDemandePrestataire(state, demandeId) {
            state.demandesPrestataires = state.demandesPrestataires.filter(d => d.id !== demandeId);
        },
        removeDemandeOrganisateur(state, demandeId) {
            state.demandesOrganisateurs = state.demandesOrganisateurs.filter(d => d.id !== demandeId);
        },
        updateDescription(state, nouvelleDescription) {
            state.utilisateurConnecte.description = nouvelleDescription;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        updateSociete(state, nouvelleSociete) {
            state.utilisateurConnecte.societe = nouvelleSociete;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        updateTheme(state, nouveauTheme) {
            state.utilisateurConnecte.theme = nouveauTheme;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        updateAdresse(state, nouvelleAdresse) {
            state.utilisateurConnecte.adresse = nouvelleAdresse;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        updateImage(state, nouvelleImage) {
            state.utilisateurConnecte.background = nouvelleImage;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        updateImage2(state, nouvelleImage2) {
            state.utilisateurConnecte.background2 = nouvelleImage2;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
        updateLogo(state, nouveauLogo) {
            state.utilisateurConnecte.logo = nouveauLogo;
            localStorage.setItem("utilisateurConnecte", JSON.stringify(state.utilisateurConnecte));
        },
    },

    actions: {
        async updateErrorMessage({ commit }, message) {
            commit('updateErrorMessage', message);
        },
        async enregistrementUtilisateur({ commit }, data) {
            console.log("Enregistrement d'un nouvel utilisateur");
            let response = await ProfilService.ajoutUtilisateur(data);
            console.log(response)
            if (response.error === 0) {
                commit('updateListeUtilisateur', response.data);
                commit('updateErrorMessage', '');
                return { success: true };
            } else {
                commit('updateErrorMessage', response.data);
                return { success: false };
            }
        },

        async enregistrementPrestataire({ commit, state }, data) {
            console.log("Enregistrement d'un nouveau prestataire");
            const dernierId = state.demandesPrestataires.length > 0
                ? Math.max(...state.demandesPrestataires.map(d => d.id))
                : 0;
            const nouvelleDemandePrestataire = {
                id: dernierId + 1,
                societe: data.societe,
                adresse: data.adresse,
                email: data.email,
                password: data.password,
            };
            commit('addDemandePrestataire', nouvelleDemandePrestataire);
            return { success: true };
        },

        async enregistrementOrganisateur({ commit, state }, data) {
            console.log("Enregistrement d'un nouvel Organisateur");

            const dernierId = state.demandesOrganisateurs.length > 0
                ? Math.max(...state.demandesOrganisateurs.map(d => d.id))
                : 0;

            const nouvelleDemandeOrganisateur = {
                id: dernierId + 1,
                nom: data.nom,
                prenom: data.prenom,
                email: data.email,
                telephone: data.telephone,
                password: data.password,
            };

            commit('addDemandeOrganisateur', nouvelleDemandeOrganisateur);
            return { success: true };
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
                response.data.role = userType;
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
        async getUserById({ commit }, uuid) {
            const response = await getUserById(uuid);
            if (response.error === 0) {
                commit('SET_UTILISATEUR', response.data);
            }
        },
        async getPrestataireById({ commit }, uuid) {
            const response = await getPrestataireById(uuid);
            if (response.error === 0) {
                commit('SET_PRESTATAIRE', response.data);
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
            } else {
                console.error("Erreur fetchPrestataires:", response.message);
                // Optionnel: commit une mutation pour stocker l'erreur
                commit('SET_PRESTATAIRES_ERROR', response.message);
            }
        },
        async fetchDemandesPrestataires({ commit }) {
            const response = await getDemandesPrestataires();
            if (response.error === 0) {
                commit('SET_DEMANDES_PRESTATAIRES', response.data);
            }
        },

        async fetchDemandesOrganisateurs({ commit }) {
            const response = await getDemandesOrganisateurs();
            if (response.error === 0) {
                commit('SET_DEMANDES_ORGANISATEURS', response.data);
            }
        },

        async deleteDemandePrestataire({ commit }, demandeId) {
            try {
                const response = await deleteDemandePrestataire(demandeId);
                if (response.error === 0) {
                    commit('DELETE_DEMANDE_PRESTATAIRE', demandeId);
                }
            } catch (error) {
                console.error("Erreur suppression demande prestataire", error);
            }
        },

        async deleteDemandeOrganisateur({ commit }, demandeId) {
            try {
                const response = await deleteDemandeOrganisateur(demandeId);
                if (response.error === 0) {
                    commit('DELETE_DEMANDE_ORGANISATEUR', demandeId);
                }
            } catch (error) {
                console.error("Erreur suppression demande organisateur", error);
            }
        },

        async accepterDemandeOrganisateur({ commit }, demande) {
            try {
              const insertResponse = await insertOrganisateur({
                id: demande.id,
                nom: demande.nom,
                prenom: demande.prenom,
                email: demande.email,
                tel: demande.tel,
                password: demande.password || "defaultpassword"
              });
        
              if (insertResponse.error === 0) {
                const deleteResponse = await deleteDemandeOrganisateur(demande.id);
                if (deleteResponse.error === 0) {
                  commit("DELETE_DEMANDE_ORGANISATEUR", demande.id);
                } else {
                  console.error("Erreur lors de la suppression de la demande.");
                }
              } else {
                console.error("Erreur lors de l'insertion de l'organisateur.");
              }
            } catch (error) {
              console.error("Erreur dans accepterDemandeOrganisateur :", error);
            }
        },

        async accepterDemandePrestataire({ commit }, demande) {
            try {
                const insertResponse = await insertPrestataire({
                    id: demande.id,
                    societe: demande.societe,
                    adresse: demande.adresse,
                    email: demande.email,
                    password: demande.password || "defaultpassword", 
                  });
        
              if (insertResponse.error === 0) {
                const deleteResponse = await deleteDemandePrestataire(demande.id);
                if (deleteResponse.error === 0) {
                  commit("DELETE_DEMANDE_PRESTATAIRE", demande.id);
                } else {
                  console.error("Erreur lors de la suppression de la demande.");
                }
              } else {
                console.error("Erreur lors de l'insertion du prestataire.");
              }
            } catch (error) {
              console.error("Erreur dans accepterDemandePrestataire :", error);
            }
        },

        async updateDescriptionPrestataire({ commit }, { id, nouvelleDescription }) {
            console.log("Mis a jour de la description pour : ", nouvelleDescription, "de l'id : ", id);
            let response = await ProfilService.updateDescriptionPrestataire(id, nouvelleDescription);
            if (response.error === 0) {
                commit('updateDescription', nouvelleDescription);
            } else {
                console.error(response.data);
            }
        },

        async updateSocietePrestataire({ commit }, { id, nouvelleSociete }) {
            console.log("Mis a jour du nom de societe pour : ", nouvelleSociete, "de l'id : ", id);
            let response = await ProfilService.updateSocietePrestataire(id, nouvelleSociete);
            if (response.error === 0) {
                commit('updateSociete', nouvelleSociete);
            } else {
                console.error(response.data);
            }
        },

        async updateThemePrestataire({ commit }, { id, nouveauTheme }) {
            console.log("Mis a jour du theme pour : ", nouveauTheme, "de l'id : ", id);
            let response = await ProfilService.updateThemePrestataire(id, nouveauTheme);
            if (response.error === 0) {
                commit('updateTheme', nouveauTheme);
            } else {
                console.error(response.data);
            }
        },

        async updateAdressePrestataire({ commit }, { id, nouvelleAdresse }) {
            console.log("Mis a jour de l'adresse pour : ", nouvelleAdresse, "de l'id : ", id);
            let response = await ProfilService.updateAdressePrestataire(id, nouvelleAdresse);
            if (response.error === 0) {
                commit('updateAdresse', nouvelleAdresse);
            } else {
                console.error(response.data);
            }
        },

        async updateImagePrestataire({ commit }, { id, nouvelleImage }) {
            console.log("Mis a jour de l'image pour : ", nouvelleImage, "de l'id : ", id);
            let response = await ProfilService.updateImagePrestataire(id, nouvelleImage);
            if (response.error === 0) {
                commit('updateImage', nouvelleImage);
            } else {
                console.error(response.data);
            }
        },

        async updateImage2Prestataire({ commit }, { id, nouvelleImage2 }) {
            console.log("Mis a jour de l'image pour : ", nouvelleImage2, "de l'id : ", id);
            let response = await ProfilService.updateImage2Prestataire(id, nouvelleImage2);
            if (response.error === 0) {
                commit('updateImage2', nouvelleImage2);
            } else {
                console.error(response.data);
            }
        },

        async updateLogoPrestataire({ commit }, { id, nouveauLogo }) {
            console.log("Mis a jour de l'image pour : ", nouveauLogo, "de l'id : ", id);
            let response = await ProfilService.updateLogoPrestataire(id, nouveauLogo);
            if (response.error === 0) {
                commit('updateLogo', nouveauLogo);
            } else {
                console.error(response.data);
            }
        }

    },
    getters: {
        utilisateurConnecte: state => state.utilisateurConnecte,
    },
});
