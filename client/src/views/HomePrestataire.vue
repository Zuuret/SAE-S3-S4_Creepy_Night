<template>
  <div class="home-prestataire" v-if="accesPermission">
    <h1>Bienvenue {{ utilisateurConnecte?.societe }}</h1>

    <h2>Gestion des articles</h2>
    <div v-for="(article,index) in articlesId" :key="index">
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
        <button @click="acceptArticle()">{{ modalButton }}</button>
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
          <label for="description">Description :</label>
          <vue-editor v-model="editableDescription" />
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
          <label for="description">Description :</label>
          <vue-editor v-model="editableDescription" />
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
          <label for="societe">Société :</label>
          <vue-editor v-model="editableSociete" />
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
          <label for="societe">Société :</label>
          <vue-editor v-model="editableSociete" />
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
          <label for="contenu">Thème :</label>
          <vue-editor v-model="themeEditable" />
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
          <label for="theme">Thème :</label>
          <vue-editor v-model="themeEditable" />
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
          <label for="contenu">Adresse :</label>
          <vue-editor v-model="editableAdresse" />
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
          <label for="contenu">Adresse :</label>
          <vue-editor v-model="editableAdresse" />
          <div class="action_edition_adresse">
            <button @click="sauvegarderAdresse" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionAdresse" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre Background de slide</h1>
    <div v-if="utilisateurConnecte.background">
      <div class="background-container">
        <div v-if="!isEditingImage" @click="editerImage" class="affiche_image">
          <img :src="require(`@/assets/${utilisateurConnecte.background}`)" alt="background prestataire" class="background"/>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="!isEditingImage" />
        </div>
        <div v-else class="active_edition_image">
          <vue-editor
              v-model="imageEditable"
              :editor-options="editorOptions"
          />
          <div class="action_edition">
            <button @click="sauvegarderImage" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionImage" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="desactive_edition_image">
        <div v-if="!isEditingImage" @click="editerImage" class="affiche_image">
          <h1 class="image-absent">Veuillez ajouter un background à votre société</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_adresse" />
        </div>
        <div v-else class="active_edition_image">
          <label for="image">Background :</label>
          <vue-editor v-model="imageEditable" />
          <div class="action_edition_image">
            <button @click="sauvegarderImage" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionImage" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre Logo</h1>
    <div v-if="utilisateurConnecte.logo">
      <div class="logo-container">
        <div v-if="!isEditingLogo" @click="editerLogo" class="affiche_logo">
          <img :src="require(`@/assets/${utilisateurConnecte.logo}`)" alt="logo prestataire" class="logo"/>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="!isEditingLogo" />
        </div>
        <div v-else class="active_edition_logo">
          <vue-editor
              v-model="logoEditable"
              :editor-options="editorOptions"
          />
          <div class="action_edition">
            <button @click="sauvegarderLogo" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionLogo" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="desactive_edition_logo">
        <div v-if="!isEditingLogo" @click="editerLogo" class="affiche_logo">
          <h1 class="logo-absent">Veuillez ajouter un logo à votre société</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_adresse" />
        </div>
        <div v-else class="active_edition_adresse">
          <label for="logo">Logo :</label>
          <vue-editor v-model="logoEditable" />
          <div class="action_edition_logo">
            <button @click="sauvegarderLogo" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionLogo" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>

    <h1>Votre Bannière</h1>
    <div v-if="utilisateurConnecte.background2">
      <div class="background2-container">
        <div v-if="!isEditingImage2" @click="editerImage2" class="affiche_image2">
          <img :src="require(`@/assets/${utilisateurConnecte.background2}`)" alt="background2 prestataire" class="background2"/>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon" v-if="!isEditingImage2" />
        </div>
        <div v-else class="active_edition_image2">
          <vue-editor
              v-model="imageEditable2"
              :editor-options="editorOptions"
          />
          <div class="action_edition">
            <button @click="sauvegarderImage2" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionImage2" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="desactive_edition_image2">
        <div v-if="!isEditingImage2" @click="editerImage2" class="affiche_image2">
          <h1 class="image2-absent">Veuillez ajouter un background à votre société</h1>
          <img src="../assets/icone_modifier.png" alt="Modifier" class="edit-icon_image2" />
        </div>
        <div v-else class="active_edition_image2">
          <label for="image2">Bannière :</label>
          <vue-editor v-model="imageEditable2" />
          <div class="action_edition_image2">
            <button @click="sauvegarderImage2" class="sauvegarde_btn">Enregistrer</button>
            <button @click="finEditionImage2" class="finEdition_btn">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="error">Accès refusé. Vous n'avez pas les permissions pour voir cette page.</p>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import { VueEditor, Quill } from 'vue2-editor';
import ImageResize from 'quill-image-resize-vue';

Quill.register("modules/imageResize", ImageResize);

export default {
  name: "HomePrestataire",
  components: {
    VueEditor
  },
  data() {
    return {
      editorOptions: {
        modules: {
          toolbar: [
            ['image', 'link'],
          ],
          imageResize: {
            displaySize: false
          },
        },
      },
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
  },
  methods: {
    ...mapActions('ProfilStore',['updateDescriptionPrestataire','updateSocietePrestataire', 'updateThemePrestataire', 'updateAdressePrestataire', 'updateImagePrestataire', 'updateImage2PrestataireFromAPI', 'updateLogoPrestataireFromAPI']),
    ...mapActions('PrestataireStore',['getAllArticlesById', 'setPrestataireArticle', 'putPrestataireArticle', 'delPrestataireArticle']),
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
      this.imageEditable = `<img src="${require(`@/assets/${this.utilisateurConnecte.background}`)}" alt="Background">` || "";
    },
    editerLogo() {
      this.isEditingLogo = true;
      this.logoEditable = `<img src="${require(`@/assets/${this.utilisateurConnecte.logo}`)}" alt="Logo">` || "";
    },
    editerImage2() {
      this.isEditingImage2 = true;
      this.imageEditable2 = `<img src="${require(`@/assets/${this.utilisateurConnecte.background2}`)}" alt="Background2">` || "";
    },
    editerAdresse() {
      this.isEditingAdresse = true;
      this.editableAdresse = this.utilisateurConnecte?.adresse || "";
    },
    sauvegarderDescription() {
      let id = this.utilisateurConnecte?.id;
      let nouvelleDescription = this.editableDescription.trim();
      nouvelleDescription = nouvelleDescription.replace(/<\/?[^>]+(>|$)/g, "").trim();
      if (id && nouvelleDescription) {
        this.utilisateurConnecte.description = nouvelleDescription;
        this.updateDescriptionPrestataire({ id, nouvelleDescription });
      }
      this.isEditingDescription = false;
    },
    sauvegarderSociete() {
      let id = this.utilisateurConnecte?.id;
      let nouvelleSociete = this.editableSociete.trim();
      nouvelleSociete = nouvelleSociete.replace(/<\/?[^>]+(>|$)/g, "").trim();
      if (id && nouvelleSociete) {
        this.utilisateurConnecte.societe = nouvelleSociete;
        this.updateSocietePrestataire({ id, nouvelleSociete });
      }
      this.isEditingSociete = false;
    },
    sauvegarderTheme() {
      let id = this.utilisateurConnecte?.id;
      let nouveauTheme = this.themeEditable.trim();
      nouveauTheme = nouveauTheme.replace(/<\/?[^>]+(>|$)/g, "").trim();
      if (id && nouveauTheme) {
        this.utilisateurConnecte.theme = nouveauTheme;
        this.updateThemePrestataire({ id, nouveauTheme });
      }
      this.isEditingTheme = false;
    },
    sauvegarderImage() {
      let id = this.utilisateurConnecte?.id;
      let contenu = this.imageEditable;
      let match = contenu.match(/src="([^"]+)"/);
      let imageUrl = match ? match[1] : null;

      if (id && imageUrl) {
        // Si l'image est en base64
        if (imageUrl.startsWith("data:image")) {
          let arr = imageUrl.split(",");
          let mime = arr[0].match(/:(.*?);/)[1];
          let bstr = atob(arr[1]);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }

          let fileName = `background-${id}.jpg`; // Utilisation d'un timestamp unique

          let nouvelleImage = new File([u8arr], fileName, { type: mime });

          // Vérifier si c'est bien un fichier
          if (nouvelleImage instanceof File) {
            let formData = new FormData();
            formData.append("image", nouvelleImage);

            // Log détaillé pour vérifier le fichier envoyé
            console.log("📤 FormData envoyée :", formData.get("image").name, formData.get("image").size, formData.get("image").type);

            this.updateImagePrestataire({ id, formData })
                .then(response => {
                  // Répondre à la mise à jour dans le store si nécessaire
                  if (response && response.data) {
                    this.utilisateurConnecte.background = response.data;  // Mise à jour avec l'URL de l'image
                    localStorage.setItem("utilisateurConnecte", JSON.stringify(this.utilisateurConnecte));
                  }
                })
                .catch(error => {
                  console.error("Erreur lors de la mise à jour de l'image : ", error);
                });
          } else {
            console.error("Erreur : l'image n'a pas pu être convertie en fichier.");
          }
        } else {
          console.error("L'image n'est pas en base64.");
        }
      } else {
        console.error("ID ou URL d'image manquants.");
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
      let nouvelleAdresse = this.editableAdresse.trim();
      nouvelleAdresse = nouvelleAdresse.replace(/<\/?[^>]+(>|$)/g, "").trim();
      if (id && nouvelleAdresse) {
        this.utilisateurConnecte.adresse = nouvelleAdresse;
        this.updateAdressePrestataire({ id, nouvelleAdresse });
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
    acceptArticle() {
      if (this.nom !== '' && this.description !== '' && this.prix !== '' && this.stock !== '') {
        if (this.modalButton === 'Modifier') {
          let data = {
            id: this.id,
            prestataire_id: this.utilisateurConnecte.id,
            nom: this.nom,
            description: this.description,
            prix: this.prix,
            stock: this.stock,
            image: this.image,
          }
          this.putPrestataireArticle(data);
        }
        if (this.modalButton === 'Ajouter') {
          let data = {
            prestataire_id: this.utilisateurConnecte.id,
            nom: this.nom,
            description: this.description,
            prix: this.prix,
            stock: this.stock,
            image: this.image,
          }
          this.setPrestataireArticle(data);
        }
        this.showModal = false;
      }
      else{console.log('Aucun argument donné')}
    },
    delPrestaArticle(id) {
      this.delPrestataireArticle(id);
    },
  },
  mounted() {
    this.getAllArticlesById(this.utilisateurConnecte.id);
    if (!this.utilisateurConnecte) {
      this.$router.push("/");
    } else if (!this.accesPermission) {
      console.log("Accès refusé");
    }
  },
};
</script>

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
