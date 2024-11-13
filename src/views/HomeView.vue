<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>

    <div class="accueil">
      <img src="@/assets/fond_Accueil.png" alt="CreepyNight_accueil" class="accueil_image">
      <div class="compte-rebours">
        <CompteRebours />
      </div>
    </div>
  </div>
</template>

<script>
import CompteRebours from '@/components/CompteRebours.vue';
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    CompteRebours,
    NavBar,
  }
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.accueil .accueil_image {
  margin-top: 6.5%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.compte-rebours {
  position: absolute;
  top: 60%;
  left: 52%;
  transform: translate(-50%, -50%);
}
</style>