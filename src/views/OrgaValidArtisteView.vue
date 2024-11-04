<template>
  <div>
    <h1>Validation de concert</h1>
    <p>Liste des artistes</p>
    <ul v-for="(artiste) in artistes" :key="artiste.id">
      <li v-if="artiste.decision == 'null'">
        <div>
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