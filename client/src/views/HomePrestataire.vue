<template>
  <div class="home-prestataire" v-if="accesPermission">
    <h1>Bienvenue {{ utilisateurConnecte?.societe }}</h1>

    <h2>Gestion des articles</h2>
    <div v-for="(article, index) in articles" :key="index">
  <div v-if="utilisateurConnecte.id === article.prestataireId">

        <tr>
          <td>
            {{ article.nom }}
          </td>
          <td>
            {{ article.description }}
          </td>
          <td>
            {{ article.prix }}
          </td>
          <td>
            {{ article.stock }}
          </td>
          <td>
            <img :src="article.image" alt="Image de produit">
          </td>
          <td>
            <button @click="openModal(article)">
              <h5>Modifier</h5>
            </button>
          </td>
          <td>
            <button @click="delPrestaArticle(article.id)">
              <h5>Supprimer</h5>
            </button>
          </td>
        </tr>
      </div>
    </div>
    <button @click="openModal(undefined)">
      <h5>Ajouter</h5>
    </button>
    <div v-if="showModal">
      <div class="modal-content">
        <h3>{{ modalTitle }}</h3>
        <label>Nom :</label>
        <input v-model="nom" min="0" step="0.01"/><br>
        <label>Description :</label>
        <input v-model="description" min="0" step="0.01"/><br>
        <label>Prix :</label>
        <input v-model="prix" min="0" step="0.01"/><br>
        <label>Stock :</label>
        <input v-model="stock" min="0" step="0.01"/><br>
        <label>Image :</label>
        <input v-model="image" min="0" step="0.01"/><br>
        <button @click="acceptArticle(id)">{{ modalButton }}</button>
        <button @click="closeModal">Annuler</button>
      </div>
    </div>

    <h1>Votre Description</h1>
    <div v-if="utilisateurConnecte.description">
      <div class="desactive_edition_description">
        <div v-if="!isEditingDescription" @click="editerDescription" class="affiche_description">
          <h1 class="description" v-html="utilisateurConnecte?.description"></h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_description" />
        </div>
        <div v-else class="active_edition_description">
          <editor
              ref="tinymceEditorDescription"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="editableDescription"
              :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo',
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
            <button @click="sauvegarderDescription" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionDescription" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="desactive_edition_description">
        <div v-if="!isEditingDescription" @click="editerDescription" class="affiche_description">
          <h1 class="description-absent">Veuillez ajouter une description à votre prestation</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_description" />
        </div>
        <div v-else class="active_edition_description">
          <editor
              ref="tinymceEditorDescription"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="editableDescription"
              :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo',
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
            <button @click="sauvegarderDescription" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionDescription" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre nom de société</h1>
    <div v-if="utilisateurConnecte.societe">
      <div class="desactive_edition_societe">
        <div v-if="!isEditingSociete" @click="editerSociete" class="affiche_societe">
          <h1 class="societe-absent" v-html="utilisateurConnecte?.societe"></h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_societe" />
        </div>
        <div v-else class="active_edition_societe">
          <editor
              ref="tinymceEditorSociete"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="editableSociete"
              :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo',
            plugins: 'link lists code image',
            base_url: '/tinymce',
            setup: (editor) => {
              editor.on('init', () => {
                editor.setContent(this.editableSociete);
              });
            }
          }"
          />
          <div class="action_edition_societe">
            <button @click="sauvegarderSociete" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionSociete" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="desactive_edition_societe">
        <div v-if="!isEditingSociete" @click="editerSociete" class="affiche_societe">
          <h1 class="societe-absent">Veuillez ajouter un nom à votre société</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_societe" />
        </div>
        <div v-else class="active_edition_societe">
          <editor
              ref="tinymceEditorSociete"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="editableSociete"
              :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo',
            plugins: 'link lists code image',
            base_url: '/tinymce',
            setup: (editor) => {
              editor.on('init', () => {
                editor.setContent(this.editableSociete);
              });
            }
          }"
          />
          <div class="action_edition_societe">
            <button @click="sauvegarderSociete" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionSociete" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre Thème</h1>
    <div v-if="utilisateurConnecte.theme">
      <div class="desactive_edition_theme">
        <div v-if="!isEditingTheme" @click="editerTheme" class="affiche_theme">
          <h1 class="theme" v-html="utilisateurConnecte?.theme"></h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_theme" />
        </div>
        <div v-else class="active_edition_theme">
          <editor
              ref="tinymceEditorTheme"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="themeEditable"
              :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo',
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
            <button @click="sauvegarderTheme" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionTheme" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="desactive_edition_theme">
        <div v-if="!isEditingTheme" @click="editerTheme" class="affiche_theme">
          <h1 class="theme-absent">Veuillez ajouter un thème à votre prestation</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_theme" />
        </div>
        <div v-else class="active_edition_theme">
          <editor
              ref="tinymceEditorTheme"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="themeEditable"
              :init="{
            height: 200,
            menubar: false,
            toolbar: 'undo redo',
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
            <button @click="sauvegarderTheme" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionTheme" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre Adresse</h1>
    <div v-if="utilisateurConnecte.adresse">
      <div class="desactive_edition_adresse">
        <div v-if="!isEditingAdresse" @click="editerAdresse" class="affiche_adresse">
          <h1 class="adresse" v-html="utilisateurConnecte?.adresse"></h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_adresse" />
        </div>
        <div v-else class="active_edition_adresse">
          <editor
              ref="tinymceEditorAdresse"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="editableAdresse"
              :init="{
        height: 200,
        menubar: false,
        toolbar: 'undo redo',
        plugins: 'link lists code image',
        base_url: '/tinymce',
        setup: (editor) => {
          editor.on('init', () => {
            editor.setContent(this.editableAdresse);
          });
        }
      }"
          />
          <div class="action_edition_adresse">
            <button @click="sauvegarderAdresse" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionAdresse" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="desactive_edition_adresse">
        <div v-if="!isEditingAdresse" @click="editerAdresse" class="affiche_adresse">
          <h1 class="adresse-absent">Veuillez ajouter une adresse à votre société</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_adresse" />
        </div>
        <div v-else class="active_edition_adresse">
          <editor
              ref="tinymceEditorAdresse"
              api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
              v-model="editableAdresse"
              :init="{
        height: 200,
        menubar: false,
        toolbar: 'undo redo',
        plugins: 'link lists code image',
        base_url: '/tinymce',
        setup: (editor) => {
          editor.on('init', () => {
            editor.setContent(this.editableAdresse);
          });
        }
      }"
          />
          <div class="action_edition_adresse">
            <button @click="sauvegarderAdresse" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionAdresse" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre Background de slide</h1>
    <div v-if="utilisateurConnecte.background">
      <div class="background-container" @click="editerImage">
        <img v-if="!isEditingImage" :src="utilisateurConnecte?.background" :alt="utilisateurConnecte?.title" class="background" />
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.background && !isEditingImage"/>
      </div>

      <div v-if="isEditingImage" class="active_edition_image">
        <editor
            ref="tinymceEditorImage"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="imageEditable"
            :init="{
        height: 200,
        menubar: false,
        toolbar: 'image',
        plugins: 'link lists image code',
        base_url: '/tinymce',
        setup: (editor) => {
          editor.on('init', () => {
            editor.setContent(`<img src='${this.utilisateurConnecte?.background}' alt='Image de fond' />`);
          });
        },
        file_picker_types: 'image',
        automatic_uploads: true,
        file_picker_callback: this.filePickerCallback
      }"
        />
        <div class="action_edition">
          <button @click="sauvegarderImage" class="sauvegarde_btn">Enregistrer</button>
          <button @click="finEditionImage" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="background-container" @click="editerImage">
        <h1 class="background-absent">Veuillez ajouter une image à votre société</h1>
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.background && !isEditingImage"/>
      </div>

      <div v-if="isEditingImage" class="active_edition_image">
        <editor
            ref="tinymceEditorImage"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="imageEditable"
            :init="{
        height: 200,
        menubar: false,
        toolbar: 'image',
        plugins: 'link lists image code',
        base_url: '/tinymce',
        setup: (editor) => {
          editor.on('init', () => {
            editor.setContent(`<img src='${this.utilisateurConnecte?.background}' alt='Image de fond' />`);
          });
        },
        file_picker_types: 'image',
        automatic_uploads: true,
        file_picker_callback: this.filePickerCallback
      }"
        />
        <div class="action_edition">
          <button @click="sauvegarderImage" class="sauvegarde_btn">Enregistrer</button>
          <button @click="finEditionImage" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <h1>Votre Logo</h1>
    <div v-if="utilisateurConnecte.logo">
      <div class="logo-container" @click="editerLogo">
        <img v-if="!isEditingLogo" :src="utilisateurConnecte?.logo" :alt="utilisateurConnecte?.societe" class="logo" />
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.logo && !isEditingLogo"/>
      </div>

      <div v-if="isEditingLogo" class="active_edition_logo">
        <editor
            ref="tinymceEditorLogo"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="logoEditable"
            :init="{
      height: 200,
      menubar: false,
      toolbar: 'image',
      plugins: 'link lists image code',
      base_url: '/tinymce',
      setup: (editor) => {
        editor.on('init', () => {
          editor.setContent(`<img src='${this.utilisateurConnecte?.logo}' alt='Logo de fond' />`);
        });
      },
      file_picker_types: 'image',
      automatic_uploads: true,
      file_picker_callback: this.filePickerCallback
    }"
        />
        <div class="action_edition">
          <button @click="sauvegarderLogo" class="sauvegarde_btn">Enregistrer</button>
          <button @click="finEditionLogo" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="logo-container" @click="editerLogo">
        <h1 class="logo-absent">Veuillez ajouter un logo à votre société</h1>
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.logo && !isEditingLogo"/>
      </div>

      <div v-if="isEditingLogo" class="active_edition_logo">
        <editor
            ref="tinymceEditorLogo"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="logoEditable"
            :init="{
      height: 200,
      menubar: false,
      toolbar: 'image',
      plugins: 'link lists image code',
      base_url: '/tinymce',
      setup: (editor) => {
        editor.on('init', () => {
          editor.setContent(`<img src='${this.utilisateurConnecte?.logo}' alt='Logo de fond' />`);
        });
      },
      file_picker_types: 'image',
      automatic_uploads: true,
      file_picker_callback: this.filePickerCallback
    }"
        />
        <div class="action_edition">
          <button @click="sauvegarderLogo" class="sauvegarde_btn">Enregistrer</button>
          <button @click="finEditionLogo" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <h1>Votre Bannière</h1>
    <div v-if="utilisateurConnecte.background2">
      <div class="background2-container" @click="editerImage2">
        <img v-if="!isEditingImage2" :src="utilisateurConnecte?.background2" :alt="utilisateurConnecte?.title" class="background2" />
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.background && !isEditingImage2"/>
      </div>

      <div v-if="isEditingImage2" class="active_edition_image2">
        <editor
            ref="tinymceEditorImage2"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="imageEditable2"
            :init="{
    height: 200,
    menubar: false,
    toolbar: 'image',
    plugins: 'link lists image code',
    base_url: '/tinymce',
    setup: (editor) => {
      editor.on('init', () => {
        editor.setContent(`<img src='${this.utilisateurConnecte?.background2}' alt='Image de fond' />`);
      });
    },
    file_picker_types: 'image',
    automatic_uploads: true,
    file_picker_callback: this.filePickerCallback
  }"
        />
        <div class="action_edition">
          <button @click="sauvegarderImage2" class="sauvegarde_btn">Enregistrer</button>
          <button @click="finEditionImage2" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="background2-container" @click="editerImage2">
        <h1 class="background2-absent">Veuillez ajouter un logo à votre société</h1>
        <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="utilisateurConnecte?.background && !isEditingImage2"/>
      </div>

      <div v-if="isEditingImage2" class="active_edition_image2">
        <editor
            ref="tinymceEditorImage2"
            api-key="mls74syw886xnmqv28owgdd35hghbukt85cprqtkhx9sh5r0"
            v-model="imageEditable2"
            :init="{
    height: 200,
    menubar: false,
    toolbar: 'image',
    plugins: 'link lists image code',
    base_url: '/tinymce',
    setup: (editor) => {
      editor.on('init', () => {
        editor.setContent(`<img src='${this.utilisateurConnecte?.background2}' alt='Image de fond' />`);
      });
    },
    file_picker_types: 'image',
    automatic_uploads: true,
    file_picker_callback: this.filePickerCallback
  }"
        />
        <div class="action_edition">
          <button @click="sauvegarderImage2" class="sauvegarde_btn">Enregistrer</button>
          <button @click="finEditionImage2" class="finEdition_btn">Annuler</button>
        </div>
      </div>
    </div>
  </div>

  <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
</template>

<script>
/* global tinymce */
import {mapActions, mapGetters, mapState} from "vuex";
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
      isEditingSociete: false,
      isEditingAdresse: false,
      isEditingLogo: false,
      isEditingImage2: false,
      editableDescription: "",
      editableSociete: "",
      themeEditable: "",
      imageEditable: "",
      editableAdresse: "",
      logoEditable: "",
      imageEditable2: "",
      id: null,
      nom: '',
      description: '',
      prix: '',
      stock: '',
      image: null,
      showModal: false,
      modalTitle: '',
      modalButton: '',
    };
  },
  computed: {
    ...mapState("PrestataireStore", ["articlesId"]),
    ...mapGetters("ProfilStore", ["utilisateurConnecte"]),
    accesPermission() {
      return this.utilisateurConnecte && this.utilisateurConnecte.role === "prestataire";
    },
    articles() {
    return this.articlesId || []; 
  },
  },
  methods: {
    ...mapActions('ProfilStore',['updateDescriptionPrestataireFromAPI','updateSocietePrestataireFromAPI', 'updateThemePrestataireFromAPI', 'updateAdressePrestataireFromAPI', 'updateImagePrestataireFromAPI', 'updateImage2PrestataireFromAPI', 'updateLogoPrestataireFromAPI']),
    ...mapActions('PrestataireStore',['getAllArticlesById', 'setPrestataireArticle', 'delPrestataireArticle']),
    editerDescription() {
      this.isEditingDescription = true;
      this.editableDescription = this.utilisateurConnecte?.description || "";
    },
    editerSociete() {
      this.isEditingSociete = true;
      this.editableSociete = this.utilisateurConnecte?.societe || "";
    },
    editerTheme() {
      this.isEditingTheme = true;
      this.themeEditable = this.utilisateurConnecte?.theme || "";
    },
    editerImage() {
      this.isEditingImage = true;
      this.imageEditable = this.utilisateurConnecte?.background || "";
    },
    editerLogo() {
      this.isEditingLogo = true;
      this.logoEditable = this.utilisateurConnecte?.logo || "";
    },
    editerImage2() {
      this.isEditingImage2 = true;
      this.imageEditable2 = this.utilisateurConnecte?.background2 || "";
    },
    editerAdresse() {
      this.isEditingAdresse = true;
      this.editableAdresse = this.utilisateurConnecte?.adresse || "";
    },
    sauvegarderDescription() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorDescription?.getEditor();
      if (editorInstance) {
        let nouvelleDescription = editorInstance.getContent({ format: 'text' }).trim();
        if (id && nouvelleDescription) {
          this.updateDescriptionPrestataireFromAPI({ id, nouvelleDescription });
        }
      }
      this.isEditingDescription = false;
    },
    sauvegarderSociete() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorSociete?.getEditor();
      if (editorInstance) {
        let nouvelleSociete = editorInstance.getContent({ format: 'text' }).trim();
        if (id && nouvelleSociete) {
          this.updateSocietePrestataireFromAPI({ id, nouvelleSociete });
        }
      }
      this.isEditingSociete = false;
    },
    sauvegarderTheme() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorTheme?.getEditor();
      if (editorInstance) {
        let nouveauTheme = editorInstance.getContent({ format: 'text' }).trim();
        if (id && nouveauTheme) {
          this.updateThemePrestataireFromAPI({ id, nouveauTheme });
        }
      }
      this.isEditingTheme = false;
    },
    sauvegarderImage() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorImage?.getEditor();
      if (editorInstance) {
        let nouvelleImage = editorInstance.getContent().match(/src="([^"]+)"/)[1];
        if (id && nouvelleImage) {
          this.updateImagePrestataireFromAPI({ id, nouvelleImage });
        }
      }
      this.isEditingImage = false;
    },
    sauvegarderImage2() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorImage2?.getEditor();
      if (editorInstance) {
        let nouvelleImage2 = editorInstance.getContent().match(/src="([^"]+)"/)[1];
        if (id && nouvelleImage2) {
          this.updateImage2PrestataireFromAPI({ id, nouvelleImage2 });
        }
      }
      this.isEditingImage2 = false;
    },
    sauvegarderLogo() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorLogo?.getEditor();
      if (editorInstance) {
        let nouveauLogo = editorInstance.getContent().match(/src="([^"]+)"/)[1];
        if (id && nouveauLogo) {
          this.updateLogoPrestataireFromAPI({ id, nouveauLogo });
        }
      }
      this.isEditingLogo = false;
    },
    sauvegarderAdresse() {
      let id = this.utilisateurConnecte?.id;
      let editorInstance = this.$refs.tinymceEditorAdresse?.getEditor();
      if (editorInstance) {
        let nouvelleAdresse = editorInstance.getContent({ format: 'text' }).trim();
        if (id && nouvelleAdresse) {
          this.updateAdressePrestataireFromAPI({ id, nouvelleAdresse });
        }
      }
      this.isEditingAdresse = false;
    },
    finEditionDescription() {
      this.isEditingDescription = false;
      this.editableDescription = this.utilisateurConnecte?.description || "";
    },
    finEditionTheme() {
      this.isEditingTheme = false;
      this.themeEditable = this.utilisateurConnecte?.theme || "";
    },
    finEditionAdresse() {
      this.isEditingAdresse = false;
      this.editableAdresse = this.utilisateurConnecte?.adresse || "";
    },
    finEditionSociete() {
      this.isEditingSociete = false;
      this.editableSociete = this.utilisateurConnecte?.societe || "";
    },
    finEditionImage() {
      this.isEditingImage = false;
    },
    finEditionImage2() {
      this.isEditingImage2 = false;
    },
    finEditionLogo() {
      this.isEditingLogo = false;
    },
    filePickerCallback(cb) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (readerEvent) => {
            const id = 'blobid' + (new Date()).getTime();
            const blobCache = tinymce.activeEditor.editorUpload.blobCache;
            const base64 = readerEvent.target.result.split(',')[1];
            const blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        }
      });
      input.click();
    },
    openModal(data) {
      if (this.showModal === false) this.showModal = true;
      if (data === undefined) {
        this.modalTitle = 'Ajouter';
        this.modalButton = 'Ajouter';
        this.id = -1;
        this.nom = '';
        this.description = '';
        this.prix = '';
        this.stock = '';
        this.image = null;
      } else {
        this.modalTitle = 'Modifier';
        this.modalButton = 'Modifier';
        this.id = data.id;
        this.nom = data.nom;
        this.description = data.description;
        this.prix = data.prix;
        this.stock = data.stock;
        this.image = data.image;
      }
    },
    closeModal() {
      if (this.showModal === true) this.showModal = false;
      this.modalTitle = '';
      this.modalButton = '';
    },
    acceptArticle(idProduit) {
      if (this.nom !== '' && this.description !== '' && this.prix !== '' && this.stock !== '') {
        let data = {
          id: idProduit,
          prestataireId: this.utilisateurConnecte.id,
          nom: this.nom,
          description: this.description,
          prix: this.prix,
          stock: this.stock,
          image: this.image,
        }
        this.showModal = false;
        this.setPrestataireArticle(data);
      }
      else{console.log('Aucun argument donné')}
    },
    delPrestaArticle(id) {
      this.delPrestataireArticle(id);
    },
  },
async mounted() {
  if (!this.utilisateurConnecte) {
    this.$router.push("/");
    return;
  }

  if (!this.accesPermission) {
    console.log("Accès refusé");
    return;
  }

  console.log("Utilisateur connecté :", this.utilisateurConnecte.id);

  if (this.utilisateurConnecte.id) {
    try {
      // Attends la réponse de getAllArticlesById
      const response = await this.getAllArticlesById(this.utilisateurConnecte.id);
      console.log("Réponse de getAllArticlesById :", response); // Vérifie la réponse ici

      // Si la réponse est correcte et qu'il n'y a pas d'erreur, mets à jour les articles
      if (response && response.data && !response.error) {
        this.articles = response.data; // Assigne les données des articles
        console.log("Articles mis à jour :", this.articles);
      } else {
        console.error("Erreur lors de la récupération des articles :", response?.data || "Réponse invalide");
      }
    } catch (error) {
      console.error("Erreur inattendue :", error);
    }
  } else {
    console.error("L'ID du prestataire est introuvable !");
  }
}


};</script>

<style scoped>
.home-prestataire {
  font-family: 'Arial', sans-serif;
  margin: 20px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
}

.desactive_edition_description,
.desactive_edition_societe,
.desactive_edition_theme,
.desactive_edition_adresse {
  margin-bottom: 20px;
}

.affiche_description,
.affiche_societe,
.affiche_theme,
.affiche_adresse {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-icon_description,
.edit-icon_societe,
.edit-icon_theme,
.edit-icon_adresse,
.edit-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.edit-icon_description:hover,
.edit-icon_societe:hover,
.edit-icon_theme:hover,
.edit-icon_adresse:hover,
.edit-icon:hover {
  transform: scale(1.2);
}

.active_edition_description,
.active_edition_societe,
.active_edition_theme,
.active_edition_adresse {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action_edition_description,
.action_edition_societe,
.action_edition,
.action_edition_adresse {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.sauvegarde_btn,
.finEdition_btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.sauvegarde_btn {
  background-color: #4caf50;
  color: white;
}

.sauvegarde_btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.finEdition_btn {
  background-color: #f44336;
  color: white;
}

.finEdition_btn:hover {
  background-color: #e53935;
  transform: scale(1.05);
}

.background-container,
.logo-container,
.background2-container {
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  cursor: pointer;
}

.background,
.logo,
.background2 {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.edit-icon {
  position: absolute;
  bottom: 15px;
  right: 10px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background-color: rgba(237, 233, 233, 0.6);
  border-radius: 10%;
  padding: 5px;
  transition: background-color 0.3s ease;
}

.edit-icon:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.error {
  color: #ff3b3b;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
}

.active_edition_image,
.active_edition_logo,
.active_edition_image2 {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 100px;
}

td {
  padding: 20px
}
</style>
