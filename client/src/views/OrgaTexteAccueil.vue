<template>
  <div class="admin-texte-accueil">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="main-content">
      <header>
        <h1>{{ $t('modifierTexteAccueil') }}</h1>
      </header>

      <section class="editor-section">
        <label for="titre">{{ $t('titre') }} :</label>
        <input v-model="titre" id="titre" type="text" />

        <label for="contenu">{{ $t('contenu') }} :</label>
        <vue-editor v-model="contenu" />

        <button @click="enregistrer">{{ $t('enregistrer') }}</button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VueEditor } from "vue2-editor"; // ou "vue3-editor"
import NavOrganisateur from "@/components/NavOrganisateur.vue";

export default {
  name: "AdminTexteAccueil",
  components: { VueEditor, NavOrganisateur },
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
  display: flex;
  height: 100vh;
  background-color: #f4f5f7;
}

.navbar {
  width: 300px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  padding-left: 300px;
}

header h1 {
  text-align: center;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.editor-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2c3e50;
}

input,
.vue-editor {
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background-color: #2c3e50;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1a252f;
}

.success-message {
  color: green;
  margin-top: 1rem;
  font-weight: bold;
}
</style>