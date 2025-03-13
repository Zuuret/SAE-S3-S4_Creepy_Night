<template>
  <div class="home-prestataire" v-if="accesPermission">
    <h1>Bienvenue {{ utilisateurConnecte?.societe }}</h1>

    <div class="desactive_edition_description">
      <div v-if="!isEditingDescription" @click="editerDescription" class="affiche_description">
        <h1 class="description" v-html="utilisateurConnecte?.description"></h1>
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" />
      </div>
      <div v-else class="active_edition_description">
        <editor
            ref="tinymceEditorDescription"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="editableDescription"
            :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image code',
            plugins: 'link lists code image',
            base_url: '/tinymce',
            setup: (editor) => {
              editor.on('init', () => {
                editor.setContent(this.editableDescription);
              });
            }
          }"
        />
        <div class="action_edition_description">
          <button @click="sauvegarderDescription" class="sauvegardeDes_btn">Enregistrer</button>
          <button @click="finEdition" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <div class="desactive_edition_theme">
      <div v-if="!isEditingTheme" @click="editerTheme" class="affiche_theme">
        <h1 class="theme" v-html="utilisateurConnecte?.theme"></h1>
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" />
      </div>
      <div v-else class="active_edition_theme">
        <editor
            ref="tinymceEditorTheme"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="themeEditable"
            :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image code',
            plugins: 'link lists code image',
            base_url: '/tinymce',
            setup: (editor) => {
              editor.on('init', () => {
                editor.setContent(this.themeEditable);
              });
            }
          }"
        />
        <div class="action_edition">
          <button @click="sauvegarderTheme" class="sauvegardeDes_btn">Enregistrer</button>
          <button @click="finEdition" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <div class="background-container" @click="editerImage">
      <img :src="utilisateurConnecte?.background" :alt="utilisateurConnecte?.title" class="background" />
      <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.background"/>
    </div>

    <div v-if="isEditingImage" class="active_edition_image">
      <editor
          ref="tinymceEditorImage"
          api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
          v-model="imageEditable"
          :init="{
          height: 200,
          menubar: false,
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | image | code',
          plugins: 'link lists image code',
          base_url: '/tinymce',
          setup: (editor) => {
            editor.on('init', () => {
              editor.setContent(this.imageEditable);
      });
      editor.ui.registry.addButton('image', {
      text: 'Changer l\'image de fond',
      onAction: () => {
      this.uploadImage();
      }
      });
      }
      }"
      />
      <div class="action_edition">
        <button @click="sauvegarderImage" class="sauvegardeDes_btn">Enregistrer</button>
        <button @click="finEditionImage" class="finEdition_btn">Annuler</button>
      </div>
    </div>
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
      isEditingDescription: false,
      isEditingTheme: false,
      isEditingImage: false,
      editableDescription: "",
      themeEditable: "",
      imageEditable: "",
    };
  },
  computed: {
    ...mapGetters("ProfilStore", ["utilisateurConnecte"]),
    accesPermission() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "prestataire";
    },
  },
  methods: {
    editerDescription() {
      this.isEditingDescription = true;
      this.editableDescription = this.utilisateurConnecte?.description || "";
    },
    editerTheme() {
      this.isEditingTheme = true;
      this.themeEditable = this.utilisateurConnecte?.theme || "";
    },
    editerImage() {
      this.isEditingImage = true;
    },
    sauvegarderDescription() {
      const editorInstance = this.$refs.tinymceEditorDescription?.getEditor();
      if (editorInstance) {
        this.utilisateurConnecte.description = editorInstance.getContent();
      }
      this.isEditingDescription = false;
    },
    sauvegarderTheme() {
      const editorInstance = this.$refs.tinymceEditorTheme?.getEditor();
      if (editorInstance) {
        this.utilisateurConnecte.theme = editorInstance.getContent();
      }
      this.isEditingTheme = false;
    },
    sauvegarderImage() {
      const editorInstance = this.$refs.tinymceEditorImage?.getEditor();
      if (editorInstance) {
        const newImageSrc = editorInstance.getContent().match(/src="([^"]+)"/)[1];
        this.utilisateurConnecte.background = newImageSrc;
      }
      this.isEditingImage = false;
    },
    finEdition() {
      this.isEditingDescription = false;
      this.editableDescription = this.utilisateurConnecte?.description || "";
    },
    finEditionImage() {
      this.isEditingImage = false;
    },
    uploadImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target.result;
            this.utilisateurConnecte.background = imageUrl;
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  },
  mounted() {
    if (!this.utilisateurConnecte) {
      this.$router.push("/");
    } else if (!this.accesPermission) {
      console.log("Accès refusé");
    }
  },
};
</script>

<style scoped>
.background-container {
  position: relative;
  display: inline-block;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  cursor: pointer;
  opacity: 0.7;
}

.edit-icon:hover {
  opacity: 1;
}

.active_edition_image {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>