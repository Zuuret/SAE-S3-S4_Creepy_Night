import Vue from 'vue'
import Vuex from 'vuex'
import controller from "@/datasource/controller";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    utilisateur: null
  },
  getters: {
  },
  mutations: {
    updateUtilisateur(state, utilisateur){
      state.utilisateur = utilisateur
    }
  },
  actions: {
    async enregistrementUtilisateur({commit}, data){
      console.log("enregistrement d'un nouvel utilisateur")
      let response = controller.ajoutUtilisateur(data)
      if(response.error === 0){
        commit('updateUtilisateur', response.data)
      } else {
        console.log(response.data)
      }
    }
  },
  modules: {
  }
})
