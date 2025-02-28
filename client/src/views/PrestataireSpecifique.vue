<template>
  <div>
    <NavBar/>
    <div v-if="prestataire">
      <div class="banner">
        <img :src="prestataire.background2" :alt="prestataire.societe" class="prestataire-background"/>
        <div class="prestataire-header">
          <img :src="prestataire.logo" :alt="prestataire.societe" class="prestataire-logo"/>
          <div class="trait"></div>
          <h1>Bienvenue chez {{ prestataire.societe }}</h1>
          <p>Retrouvez nous au {{ prestataire.adresse }}</p>
        </div>
      </div>
      <BoutiquePrestataire/>
      <div class="traitBlanc"></div>
      <LivreDOr/>
    </div>
  </div>
</template>


<script>
import {mapActions, mapState} from "vuex";
import LivreDOr from "@/components/LivreDOr.vue";
import BoutiquePrestataire from "@/components/BoutiquePrestataire.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'PrestataireSpecifique',
  components:{NavBar, BoutiquePrestataire, LivreDOr},
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
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Kanit:wght@300;400;600;700&display=swap');

div {
  text-align: center;
  position: relative;
  background: black;
}

.banner {
  position: relative;
  margin-top: 11vh;
}
.prestataire-background {
  width: 100%;
  height: 400px;
  object-fit: cover;
  position: relative;
}
.prestataire-header {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.68);
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 29%;
}
.prestataire-logo {
  width: 100px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}
.trait {
  border-top: 1px solid black;
  width: 95%;
}
.traitBlanc {
  border-top: 1px solid white;
  display: flex;
  justify-content: center;
  width: 85%;
  margin: 50px auto 20px auto;
  padding-top: 10px;
}

h1 {
  margin-top: 10px;
  color: #333;
  font-size: 30px;
  font-family: 'Kanit', sans-serif;
  text-transform: uppercase;
  margin-bottom: 5px;
}
p {
  color: #555;
  font-size: 16px;
  font-family: 'Kanit', sans-serif;
  margin: 0;
}
</style>



