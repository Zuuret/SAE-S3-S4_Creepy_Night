<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <div class="introduction">
      <div class="form"></div>
      <div class="text-content">
        <h1>Bienvenue dans SécuFlippe, votre guide pour un festival CreepyNight terrifiant mais sécurisé !</h1>
        <p>
          Que vous soyez ici pour signaler un problème, suivre un incident ou simplement découvrir comment rester en sécurité tout au long de l’événement,
          cette rubrique est là pour vous accompagner.
        </p>
      </div>
      <img src="@/assets/Secuflippe_intro.png" alt="Image introduction" class="image_intro" />
    </div>
    <div class="section">
      <div class="section1" data-aos="zoom-in" data-aos-duration="1000">
        <h1>Que voulez-vous faire ?</h1>
        <ul>
          <li data-aos="flip-left" data-aos-delay="200">
            <img src="@/assets/signalement_icone.png" alt="Icône signalement" class="signalement_icon"/>
            <h2>Faire un signalement</h2>
            <p>Avez-vous rencontré un problème ? Notre équipe est là pour vous aider rapidement.</p>
            <router-link to="/secuflippe/signalement" style="text-decoration: none; color: white;">
              <button>Accéder au formulaire de signalement</button>
            </router-link>
          </li>
          <li data-aos="flip-right" data-aos-delay="400">
            <img src="@/assets/suivi_signalement_icone.png" alt="Icône suivi signalement" class="suivi_signalement_icon"/>
            <h2>Suivre un signalement</h2>
            <p>Déjà signalé un problème ? Consultez le statut de votre requête.</p>
            <router-link to="/secuflippe/mesSignalements" style="text-decoration: none; color: white;">
              <button>Suivre un signalement</button>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="section2" data-aos="fade-right" data-aos-duration="1000">
        <h2>Un festival d'horreur peut être effrayant… mais pas dangereux si vous suivez ces conseils !</h2>
        <ul>
          <li>
            <img src="@/assets/ensemble.png" alt="Ensemble" class="regle1">
            <div class="trait"></div>
            Déplacez-vous en groupe : <br>
            Ne restez pas seul dans les zones sombres ou isolées.
          </li>
          <li>
            <img src="@/assets/croix_secours.png" alt="Croix rouge" class="regle2">
            <div class="trait"></div>
            Localisez les points de secours : <br>
            Familiarisez-vous avec les postes de secours et les issues de secours sur la carte.</li>
          <li>
            <img src="@/assets/perturbateur.png" alt="Mauvaise personne" class="regle3">
            <div class="trait"></div>
            Gardez vos affaires près de vous : <br>
            Les monstres ne voleront pas vos sacs, mais on ne sait jamais avec les autres festivaliers !
          </li>
          <li>
            <img src="@/assets/appel.png" alt="Téléphone" class="regle4">
            <div class="trait"></div>
            Restez vigilant(e) : <br>
            Si quelque chose semble louche, signalez-le immédiatement via SécuFlippe.
          </li>
          <li>
            <img src="@/assets/map.png" alt="Carte" class="regle5">
            <div class="trait"></div>
            Respectez les limites : <br>
            Certaines zones sont interdites pour votre propre sécurité, ne vous aventurez pas au-delà.</li>
        </ul>
      </div>
      <div class="section3" data-aos="fade-up" data-aos-duration="1000">
        <h1>A propos de l'équipe de SécuFlippe</h1>
        <p>Nos équipes de sécurité sont composées de professionnels et de bénévoles passionnés qui veillent à ce que tout le monde profite du festival sans inquiétude.
        N’hésitez pas à demander de l’aide ou des renseignements si nécessaire.</p>
      </div>
      <div class="section4" data-aos="fade-up" data-aos-duration="1000">
        <h1>Plan du site et postes de secours</h1>
        <img src="@/assets/carte_creepy_night.png" alt="Carte du festival" class="carte-festival" data-aos="zoom-in" data-aos-duration="1200">
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default {
  name: "SecuFlippe",
  components: {NavBar},
  mounted() {
    AOS.init();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
div {
  font-family: 'Kanit', sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbars {
  margin-bottom: 5%;
}
.introduction {
  width: 100%;
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: #1a1a1a;
}
.introduction .form {
  width: 70%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
  background: linear-gradient(145deg, rgba(255, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  position: absolute;
  opacity: 0.9;
  z-index: 1;
  transition: all 0.5s ease;
}
.introduction:hover .form{
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  background: linear-gradient(145deg, rgba(255, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
  opacity: 1;
}
.text-content {
  position: relative;
  z-index: 2;
  padding: 5% 5%;
  cursor: context-menu;
}
.text-content h1 {
  font-size: 50px;
  font-family: 'Creepster', cursive;
  color: #f6c700;
  text-shadow: 0 0 15px #000000, 0 0 20px #900c0c;
  margin-bottom: 20px;
  letter-spacing: 1px;
}
.text-content p {
  max-width: 93%;
  font-size: 30px;
  line-height: 1.8;
  margin-top: 20px;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
.introduction .image_intro {
  width: 100%;
  height: auto;
  max-height: 800px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.6;
  filter: grayscale(30%);
  transition: all 0.5s ease-in-out;
}
.introduction:hover .image_intro {
  transform: scale(1.05);
}
.section{
  padding: 40px 0;
  width: 100%;
  background: linear-gradient(145deg, #3a0000, #570000);
}
.section1 {
  color: #eaeaea;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.section1 h1 {
  margin-bottom: 3%;
  font-size: 50px;
  font-family: 'Kanit', sans-serif;
  color: #f6c700;
  text-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000;
  cursor: context-menu;
}
.section1 ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 10%;
}
.section1 li {
  width: 25%;
  border: 5px solid transparent;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  position: relative;
  cursor: context-menu;
}
.section1 li:hover {
  border: #b31010 5px solid;
  border-radius: 25px;
}
.section1 .signalement_icon,
.section1 .suivi_signalement_icon {
  width: 25%;
  height: auto;
  margin-top: 10px;
}
.section1 h2 {
  padding: 5px;
  margin: 0 0 10px 0;
  font-size: 35px;
  color: #f6c700;
}
.section1 p {
  margin: 0;
  padding: 0 20px 25px 20px;
  font-size: 25px;
  line-height: 1.6;
  color: #eaeaea;
}
.section1 button {
  width: 75%;
  background: #EA3323;
  color: #000000;
  margin: 0 0 25px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 23px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.section1 button:hover {
  background: #f6c700;
  color: #1a1a1a;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 0 10px #f6c700;
}
.section2 {
  margin-top: 3%;
}
.section2 h2 {
  font-size: 50px;
  font-family: 'Kanit', sans-serif;
  color: #f6c700;
  padding: 0 50px 0 50px;
  text-align: center;
  margin-bottom: 3%;
  text-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000;
}
.section2 ul {
  list-style: none;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.section2 li img {
  width: 25%;
  margin-bottom: 7px;
}
.section2 .trait {
  border-top: 3px solid #f6c700;
  width: 75%;
  margin: 15px auto;
  position: relative;
  box-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000, 0 0 30px #f6c700;
}
.section2 li:hover .trait {
  box-shadow: 0 0 20px #f6c700, 0 0 30px #ff0000, 0 0 40px #f6c700;
}
.section2 li {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  font-family: 'Kanit', sans-serif;
  font-size: 19px;
  line-height: 1.8;
  color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  cursor: context-menu;
}
.section2 li:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
}
.section3 {
  text-align: center;
  border-radius: 15px;
  cursor: context-menu;
  padding: 0 20px 0 20px;
}
.section3 h1 {
  font-size: 50px;
  font-family: 'Kanit', sans-serif;
  color: #f6c700;
  margin-bottom: 40px;
  text-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000; /* Effet lumineux */
}
.section3 p {
  font-size: 27px;
  padding: 0 15px 0 15px;
  line-height: 1.8;
  color: #ffffff;
  left: 0;
}
.section4 {
  margin-top: 2%;
  text-align: center;
}
.section4 h1 {
  font-size: 50px;
  font-family: 'Kanit', sans-serif;
  color: #f6c700;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #f6c700, 0 0 20px #ff0000;
  cursor: context-menu;
}
.section4 .carte-festival {
  width: 100%;
  max-width: 800px;
  border: 2px solid #b71c1c;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
}
</style>
