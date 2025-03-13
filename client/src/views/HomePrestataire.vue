<template>
  <div v-if="hasAccess" class="home-prestataire">
    <h1>Bienvenue {{ utilisateurConnecte?.societe }}</h1>

    <div class="editable-field">
      <div v-if="!isEditing" @click="startEditing" class="description-display">
        <h1 class="description-text" v-html="utilisateurConnecte?.description"></h1>
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" />
      </div>

      <div v-else class="editor-container">
        <editor
            ref="tinymceEditor"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="editableDescription"
            :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            plugins: 'link lists code',
            base_url: '/tinymce',
          }"
        />
        <div class="editor-actions">
          <button @click="saveDescription" class="save-btn">Enregistrer</button>
          <button @click="cancelEditing" class="cancel-btn">Annuler</button>
        </div>
      </div>
    </div>

    <img :src="utilisateurConnecte?.background" :alt="utilisateurConnecte?.title" class="background"/>
  </div>
  <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
</template>

<script>
import {mapGetters} from "vuex";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "HomePrestataire",
  components: {
    'editor': Editor
  },
  data() {
    return {
      isEditing: false,
      editableDescription: ""
    };
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "prestataire";
    },
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.editableDescription = this.utilisateurConnecte?.description || "";
    },
    saveDescription() {
      if (this.isEditing) {
        this.utilisateurConnecte.description = this.editableDescription;
        console.log("Nouvelle description sauvegardée :", this.editableDescription);
        this.isEditing = false;
      }
    },
    cancelEditing() {
      this.isEditing = false;
      this.editableDescription = this.utilisateurConnecte?.description || "";
    }
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      this.$router.push("/");
    } else if (!this.hasAccess) {
      console.log("Accès refusé");
    } else {
      this.presentation = `
        <img src="${this.utilisateurConnecte?.logo || ''}" alt="Logo prestataire" class="logo" />
        <p>Bienvenue sur la page de présentation de ${this.utilisateurConnecte?.societe || 'Votre entreprise'} !</p>
      `;
    }
  },
};
</script>

<style scoped>
.home-prestataire {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}


.editable-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.description-display {
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

.description-display:hover {
  background: #e0e0e0;
}

.description-text {
  font-size: 16px;
  color: #333;
}

.edit-icon {
  width: 20px;
  margin-left: 10px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.edit-icon:hover {
  opacity: 1;
}

.editor-container{
  width: 100%;
}

.editor-actions {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.save-btn, .cancel-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}
</style>
