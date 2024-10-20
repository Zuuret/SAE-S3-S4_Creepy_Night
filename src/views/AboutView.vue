<template>
  <div class="inscriptionProfil">
    <h1>Inscription</h1>
    <div>
      <input type="text" v-model="prenom" id="prenom" placeholder="Prénom">
    </div>
    <div>
      <input type="text" v-model="nom" id="nom" placeholder="Nom">
    </div>
    <div>
      <input type="date" v-model="dateNaissance" id="dateNaissance" placeholder="Date de naissance">
    </div>
    <div>
      <input type="text" v-model="email" id="email" placeholder="email">
    </div>
    <div>
      <input type="text" v-model="emailConfirmation" id="emailConfirmation" placeholder="Confirmation adresse mail">
    </div>
    <div>
      <input type="text" v-model="motDePasse" id="motDePasse" placeholder="Mot de passe">
    </div>
    <div>
      <button type="submit" @click="soumettreInscription">Confirmer l'inscription</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'AboutView.vue',
  data: () => ({
    prenom: '',
    nom: '',
    dateNaissance: '',
    email: '',
    emailConfirmation: '',
    motDePasse: '',
  }),
  computed: {
    ...mapState(['utilisateur'])
  },
  methods: {
    ...mapActions(['enregistrementUtilisateur']),
    soumettreInscription() {
      this.enregistrementUtilisateur({
        prenom: this.prenom,
        nom: this.nom,
        dateNaissance: this.dateNaissance,
        email: this.email,
        emailConfirmation: this.emailConfirmation,
        motDePasse: this.motDePasse,
      });
    }
  }
}
</script>
