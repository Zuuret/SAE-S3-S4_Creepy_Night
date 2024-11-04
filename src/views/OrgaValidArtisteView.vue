<template>
  <div class="orga">
    <h1>Validation de concert</h1>
    <p>Liste des artistes</p>
      <li v-for="(artiste) in artistes" :key="artiste.id">
        <div v-if="artiste.decision == 'null'">
          {{ artiste.nomGroupe }}, {{ artiste.nbMembres }}
          <button @click="setDecision(['true', artiste.id])"> Accepter </button>
          <button @click="setDecision(['false', artiste.id])"> Refuser </button>
        </div>
      </li>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OrgaValidArtisteView',
  data: () => ({
  }),
  computed: {
    ...mapState(['artistes']),
  },
  methods: {
    ...mapActions(['setDecision', "getArtistes"]),
  },
  mounted() {
    this.getArtistes();
  }
}

</script>

<style>
.orga {
  background-color: #F0F0F0;
}

</style>