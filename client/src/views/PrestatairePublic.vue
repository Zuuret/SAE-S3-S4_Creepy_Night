<template>
  <div class="prestataires-list">
    <div v-if="prestataires.length === 0" class="no-prestataires">
      <p>Aucun prestataire disponible.</p>
    </div>

    <div v-else class="prestataire" v-for="prestataire in prestataires" :key="prestataire.id">
      <router-link :to="`/prestataire/${prestataire.id}`">
      <div class="prestataire-item">
        <img :src="prestataire.logo" :alt="prestataire.societe" class="prestataire-logo" />
        <div class="prestataire-details">
          <h3>{{ prestataire.societe }}</h3>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'PrestatairePublic',
  computed: {
    ...mapState('ProfilStore',['prestataires'])
  },
  methods: {
    ...mapActions('ProfilStore',['getAllPrestataire'])
  },
  mounted() {
    this.getAllPrestataire();
  },
};
</script>

<style scoped>
.prestataires-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.prestataire {
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.prestataire-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.prestataire-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.prestataire-details {
  text-align: center;
  margin-top: 15px;
}

.prestataire-details h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.prestataire-details p {
  font-size: 1rem;
  color: #666;
}

.no-prestataires {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #888;
}
</style>
