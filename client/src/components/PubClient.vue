<template>
    <div class="PubClient">
        <div class="intro">
            <h1 class="titre-partie" id="titre-intro">
                {{ $t('intro.titreIntro') }}
            </h1>
            <div class="intro-partie">
                <div class="description-intro">
                    <p class="introduction">
                        {{ $t('intro.description') }}
                    </p>
                    <router-link class="btn-ticket" to="/billet">{{ $t('intro.ticketLink') }}</router-link>
                </div>
                <div class="image-intro">
                    <img alt="creepynight" src="@/assets/img-intro-1.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-2.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-3.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-4.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-5.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-6.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-7.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-8.png" class="image-style">
                    <img alt="creepynight" src="@/assets/img-intro-9.png" class="image-style">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "PubClient"
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

#titre-intro{
  color: white;
}

.intro{
  padding-top: 20px;
  text-align: center;
  background-color: #AD0918;
  height: 100vh;
}

.intro-partie{
  display: flex;
}

.introduction{
  font-size: 180%;
  margin: 10%;
  text-align: justify;
}

.activites {
  padding-top: 20px;
  text-align: center;
  background-color: black;
  color: white;
  height: 100vh;
}

.description-intro{
  width: 100vw;
  font-family: Arial, sans-serif;
  color: white;
}

.btn-ticket{
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  color: #AD0918;
  font-size: 18px;
  transition: background-color 0.3s, transform 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-ticket:hover {
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

/* Exemples de positions pour chaque image */
.image-style:nth-child(1) {
  top: 13%;
  left: 10%;
  transform: rotate(-10deg);
  z-index: 2;
}

.image-style:nth-child(2) {
  width: 180px;
  top: 20%;
  left: 27%;
  transform: rotate(15deg);
  z-index: 1;

}

.image-style:nth-child(3) {
  top: 38%;
  left: 20%;
  transform: rotate(-5deg);
  z-index: 3;

}

.image-style:nth-child(4) {
  width: 200px;
  top: 43%;
  left: 38%;
  transform: rotate(5deg);
  z-index: 4;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(5) {
  width: 70px;
  top: 63%;
  left: 20%;
  transform: rotate(-8deg);
  z-index: 2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(6) {
  width: 200px;
  top: 21%;
  left: 45%;
  transform: rotate(-20deg);
  z-index: 5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(7) {
  width: 150px;
  top: 33%;
  left: 60%;
  transform: rotate(20deg);
  z-index: 3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(8) {
  top: 56%;
  left: 40%;
  transform: rotate(8deg);
  z-index: 2;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.image-style:nth-child(9) {
  top: 53%;
  left: 52%;
  transform: rotate(10deg);
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