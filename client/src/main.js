import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

Vue.use(VueI18n);
const savedLanguage = localStorage.getItem('language') || 'fr';
const i18n = new VueI18n({
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages: { en, fr }
});
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
