<template>
  <div>
    <div class="navbars">
      <NavBar />
    </div>
    <div class="introduction">
      <p>Bienvenue dans SécuFlippe, votre guide pour un festival CreepyNight terrifiant mais sécurisé !</p>
      <p>Que vous soyez ici pour signaler un problème, suivre un incident ou simplement découvrir comment rester en sécurité tout au long de l’événement, cette rubrique est
      là pour vous accompagner. Le festival est intense, l’ambiance est sombre, mais votre sécurité reste notre priorité absolue.</p>
    </div>
    <div class="section1">
      <h1>Que voulez-vous faire ?</h1>
      <ul>
        <li>
          <h2>Faire un signalement</h2>
          <p>Avez-vous rencontré un problème ? Notre équipe est là pour vous aider rapidement.</p>
          <router-link to="/secuflippe/signalement" style="text-decoration: none; color: white;">
            <button>Accéder au formulaire de signalement</button>
          </router-link>
        </li>
        <li>
          <h2>Suivre un signalement</h2>
          <p>Déjà signalé un problème ? Consultez le statut de votre requête.</p>
          <router-link to="/secuflippe/mesSignalements" style="text-decoration: none; color: white;">
            <button>Suivre un signalement</button>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="section2">
      <h2>Un festival d'horreur peut être effrayant… mais pas dangereux si vous suivez ces conseils !</h2>
      <li>Déplacez-vous en groupe : Ne restez pas seul dans les zones sombres ou isolées.</li>
      <li>Localisez les points de secours : Familiarisez-vous avec les postes de secours et les issues de secours sur la carte.</li>
      <li>Gardez vos affaires près de vous : Les monstres ne voleront pas vos sacs, mais on ne sait jamais avec les autres festivaliers !</li>
      <li>Restez vigilant(e) : Si quelque chose semble louche, signalez-le immédiatement via SécuFlippe.</li>
      <li>Respectez les limites : Certaines zones sont interdites pour votre propre sécurité, ne vous aventurez pas au-delà.</li>
    </div>
    <div class="section3">
      <h1>A propos de l'équipe de SécuFlippe</h1>
      <p>Nos équipes de sécurité sont composées de professionnels et de bénévoles passionnés qui veillent à ce que tout le monde profite du festival sans inquiétude.
      N’hésitez pas à demander de l’aide ou des renseignements si nécessaire.</p>
      <img src="@/assets/EquipeSécuflippe.jpg" alt="Sécuflippe" class="equipe_secuflippe"/>
    </div>
    <div class="section4">
      <h1>Plan du site et postes de secours</h1>
      <img src="@/assets/carte_creepy_night.png" alt="Carte du festival" class="carte-festival" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "SecuFlippe",
  components: {NavBar},
}
</script>

<style scoped>
/* Styles globaux pour la page */
div {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbars {
  margin-bottom: 20px;
}

/* Introduction */
.introduction {
  background-color: #b5a7a7;
  color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 7% auto 20px;
  width: 90%;
  max-width: 800px;
}

.introduction p {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.6;
  font-size: 23px;
}

/* Section 1: Actions */
.section1 {
  padding: 20px;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
}

.section1 h1 {
  text-align: center;
  color: #d32f2f;
  margin-bottom: 20px;
}

.section1 ul {
  list-style-type: none;
  padding: 0;
}

.section1 li {
  font-size: 18px;
  margin: 15px 0;
  color: #222;
}

.section1 p {
  margin: 5px 0 15px;
  font-size: 14px;
  color: #555;
  font-size: 20px;
}

.section1 button {
  display: inline-block;
  padding: 10px 15px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #fff;
  background-color: #d32f2f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}

.section1 button:hover {
  background-color: #b71c1c;
}

/* Section 2: Conseils de sécurité */
.section2 {
  padding: 20px;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
}

.section2 p {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
}

.section2 li {
  margin: 10px 0;
  font-size: 14px;
  color: #555;
  font-size: 20px;
}

/* Section 3: À propos */
.section3 {
  padding: 20px;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
}

.section3 h1 {
  text-align: center;
  color: #d32f2f;
  margin-bottom: 20px;
}

.section3 p {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
  font-size: 20px;
}

.section3 img {
  width: 760px;
}

/* Section 4: Carte */
.section4 {
  padding: 20px;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
}

.section4 h1 {
  color: #d32f2f;
  margin-bottom: 20px;
}

.section4 img {
  width: 755px;
  height: auto;
  border: 2px solid #d32f2f;
  border-radius: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  .introduction, .section1, .section2, .section3, .section4 {
    width: 100%;
    padding: 15px;
  }

  .section1 ul {
    padding-left: 10px;
  }

  .section1 button {
    width: 100%;
    font-size: 16px;
  }
}
</style>
