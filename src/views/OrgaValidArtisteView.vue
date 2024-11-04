<template>
  <div class="container">
    <h1>Validation de concert</h1>
    <p>Liste des artistes</p>
    <ul class="validation-table">
      <li v-for="(artiste) in artistes" :key="artiste.id">
        <div v-if="artiste.decision == 'null'">
          {{ artiste.nomGroupe }}, {{ artiste.nbMembres }}
          <button @click="setDecision(['true', artiste.id])"> Accepter </button>
          <button @click="setDecision(['false', artiste.id])"> Refuser </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AboutView.vue',
  data: () => ({
  }),
  computed: {
    ...mapState(['artistes']),
  },
  methods: {
    ...mapActions(['setDecision','getArtistes']),
  },
}

</script>

<style>

</style>