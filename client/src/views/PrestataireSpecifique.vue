<template>
  <div>
    <h1>Prestataire</h1>
    <p>Voici la page dédiée aux prestataires.</p>
    <div v-if="prestataire">
      <h1>{{ prestataire.societe }}</h1>
      <p>{{ prestataire.adresse }}</p>
      <img :src="prestataire.logo" :alt="prestataire.societe" class="prestataire-logo" />
    </div>
    <LivreDOr/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import LivreDOr from "@/components/LivreDOr.vue";

export default {
  name: 'PrestataireSpecifique',
  components:{LivreDOr},
  computed: {
    ...mapState('ProfilStore',['prestataire'])
  },
  methods: {
    ...mapActions('ProfilStore',['getPrestairebyId'])
  },
  mounted() {
    const prestaireId = parseInt(this.$route.params.id);
    this.getPrestairebyId(prestaireId)
  }
}
</script>

<style scoped>

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
}

.prestataire-logo {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}
</style>

