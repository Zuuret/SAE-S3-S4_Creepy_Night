<template>
  <div class="admin-carte">
    <div class="navbar">
      <NavOrganisateur />
    </div>

    <div class="icone-container">
      <h1>Liste des Icônes</h1>
      <div v-if="icones.length">
        <img v-for="icone in icones" :key="icone.id" :src="getImagePath(icone.nom_image)" :alt="icone.nom_image">
      </div>
      <p v-else>Aucune icône disponible.</p>
    </div>
    <div class="icone-container">
      <h1>Liste des emplacements</h1>
      <div v-if="emplacement.length">
        <p v-for="emplacement in emplacement" :key="emplacement.id">{{ emplacement.nom }}</p>
      </div>
      <p v-else>Aucun emplacement disponible.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavOrganisateur from "@/components/NavOrganisateur.vue";

export default {
  name: "OrgaCarte",
  components: { NavOrganisateur },
  computed: {
    ...mapGetters('carte', ['icones', 'emplacement']),
  },
  mounted() {
    this.$store.dispatch('carte/fetchIcone')
        .catch(error => console.error("Erreur lors du fetchIcone :", error));
    
    this.$store.dispatch('carte/fetchEmplacement')
    .catch(error => console.error("Erreur lors du fetchEmplacement :", error));

  },
  methods: {
  getImagePath(nom_image) {
    return require(`@/assets/${nom_image}`);
  }
}
};
</script>

<style scoped>
.icone-container {
  text-align: center;
  margin-top: 20px;
}

img {
  width: 50px;
  height: 50px;
  margin: 10px;
}
</style>