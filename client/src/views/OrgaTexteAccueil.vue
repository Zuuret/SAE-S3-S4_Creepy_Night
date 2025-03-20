<template>
    <div class="admin-texte-accueil">
      <h1>Modifier le texte d’accueil</h1>
  
      <label for="titre">Titre :</label>
      <input v-model="titre" id="titre" type="text" />
  
      <label for="contenu">Contenu :</label>
      <vue-editor v-model="contenu" />
  
      <button @click="enregistrer">Enregistrer</button>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
</template>
  
<script>
  import { mapGetters } from 'vuex';
  import { VueEditor } from "vue2-editor"; // ou "vue3-editor" selon ta stack
  
  export default {
    name: "AdminTexteAccueil",
    components: { VueEditor },
    data() {
      return {
        titre: '',
        contenu: '',
        successMessage: ''
      };
    },
    computed: {
      ...mapGetters('texte_accueil', ['titreAccueil', 'contenuAccueil']),
    },
    mounted() {
      this.$store.dispatch('texte_accueil/fetchTexteAccueil').then(() => {
        this.titre = this.titreAccueil;
        this.contenu = this.contenuAccueil;
      });
    },
    methods: {
      async enregistrer() {
        const res = await this.$store.dispatch('texte_accueil/saveTexteAccueil', {
          titre: this.titre,
          contenu: this.contenu
        });
  
        if (res && res.error === 0) {
          this.successMessage = "Texte mis à jour avec succès !";
          setTimeout(() => this.successMessage = '', 3000);
        }
      }
    }
  };
</script>
  
<style scoped>
  .admin-texte-accueil {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
  }
  input, .vue-editor {
    width: 100%;
    margin-bottom: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
  }
  .success-message {
    color: green;
    margin-top: 1rem;
  }
</style>