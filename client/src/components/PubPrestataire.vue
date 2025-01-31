<template>
    <div class="PubPrestataire">
        <div class="intro">
            <h1 class="titre-partie" id="titre-intro">
                Participez à Creepy Night en tant que Prestataire !
            </h1>
            <div class="intro-partie">
                <div class="description-intro">
                    <p class="introduction">
                        Vous êtes artiste, exposant, restaurateur ou professionnel du divertissement ?
                        Rejoignez l’aventure Creepy Night et proposez votre savoir-faire à un public
                        passionné d’horreur et de frissons. Profitez d’une visibilité unique et faites partie
                        de cette expérience inoubliable en tant que prestataire officiel du festival.
                    </p>
                    <router-link class="btn-candidature" to="/creation-profil">Déposer ma candidature</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PubPrestataire"
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

#titre-intro {
  color: white;
}

.intro {
  padding-top: 20px;
  text-align: center;
  background-color: #AD0918;
  height: 100vh;
}

.intro-partie {
  display: flex;
}

.introduction {
  font-size: 180%;
  margin: 10%;
  text-align: justify;
  border-radius: 12px;
  color: white;
  background-color: rgba(255, 255, 255, 0.505);
  padding: 20px
}

.description-intro {
  width: 100vw;
  font-family: Arial, sans-serif;
  color: white;
}

.btn-candidature {
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  color: #AD0918;
  font-size: 18px;
  transition: background-color 0.3s, transform 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-candidature:hover {
  background-color: #dbdbdb;
  transform: scale(1.05);
}

.image-intro {
  position: relative;
  height: 70vh;
  width: 100%;
  display: block;
  margin: auto;
}

.image-style {
  position: absolute;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-style:nth-child(1) {
  top: 15%;
  left: 12%;
  transform: rotate(-10deg);
  z-index: 2;
}

.image-style:nth-child(2) {
  width: 180px;
  top: 25%;
  left: 30%;
  transform: rotate(15deg);
  z-index: 1;
}

.image-style:nth-child(3) {
  top: 40%;
  left: 50%;
  transform: rotate(-5deg);
  z-index: 3;
}

.image-style:nth-child(4) {
  width: 200px;
  top: 50%;
  left: 70%;
  transform: rotate(5deg);
  z-index: 4;
}

.image-style:hover {
  transform: scale(1.1) rotate(0deg);
  z-index: 10;
}

.titre-partie{
  font-family: 'Creepster', cursive;
  font-size: 300%;
  text-align: center;
  padding-top: 50px;
  color: white;
  padding: 50px;
}
</style>
