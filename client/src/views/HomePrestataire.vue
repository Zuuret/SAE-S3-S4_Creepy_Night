<template>
  <div v-if="hasAccess" class="home-prestataire">
    <h1>Bienvenue {{ utilisateurConnecte?.societe }}</h1>

    <img :src="utilisateurConnecte?.background" :alt="utilisateurConnecte?.title" class="background"/>

    <img :src="utilisateurConnecte?.background2" :alt="utilisateurConnecte?.title" class="background"/>

    <h2>{{utilisateurConnecte?.description}}</h2>

    <h2>{{utilisateurConnecte?.theme}}</h2>

    <!-- Intégration du composant Editor avec v-model -->
    <Editor v-model="presentation" :init="editorConfig" />

    <button @click="saveContent">Enregistrer</button>
  </div>
  <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
</template>

<!-- Script de l'intégration de TinyMCE -->
<script src="https://cdn.tiny.cloud/1/mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>

<script>
// Importation du composant Editor depuis @tinymce/tinymce-vue
import { Editor } from "@tinymce/tinymce-vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "HomePrestataire",
  components: {
    Editor, // Enregistrement du composant Editor
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte", "prestataires"]),
    ...mapState("PrestataireStore", ["livreDOr"]),
    hasAccess() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "prestataire";
    },
  },
  data() {
    return {
      presentation: "",
      editorConfig: {
        height: 300,
        menubar: false,
        plugins: "image link code",
        toolbar: "undo redo | bold italic | alignleft aligncenter alignright | image link | code",
        images_upload_url: "/upload-logo",
        automatic_uploads: true,
        images_upload_handler: async (blobInfo, success, failure) => {
          let formData = new FormData();
          formData.append("logo", blobInfo.blob());

          try {
            let response = await fetch("/upload-logo", {
              method: "POST",
              body: formData,
            });
            let data = await response.json();
            if (data.success) {
              success(data.logoUrl);
            } else {
              failure("Échec de l'upload");
            }
          } catch (error) {
            failure("Erreur lors de l'upload");
          }
        },
        base_url: "/tinymce",
      },
    };
  },
  methods: {
    saveContent() {
      console.log("Contenu enregistré :", this.presentation);
    },
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
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

h2 {
  color: black;
}

.logo {
  max-width: 150px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
