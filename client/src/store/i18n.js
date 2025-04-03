// store/i18n.js
export default {
    state: {
      locale: 'fr', // Valeur par défaut
    },
    mutations: {
      SET_LOCALE(state, locale) {
        state.locale = locale;
      },
    },
    actions: {
      changeLocale({ commit }, locale) {
        commit('SET_LOCALE', locale); // Mise à jour de la langue dans le store
      },
    },
    getters: {
      locale: state => state.locale,
    },
  };
  