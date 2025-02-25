<template>
  <div class="carousel">
    <NavBar/>
    <div ref="list" class="list">
      <div class="item" v-for="prestataire in prestataires" :key="prestataire.id">
        <img :src="prestataire.background" :alt="prestataire.title" class="background"/>
        <div class="content">
          <img :src="prestataire.logo" :alt="prestataire.title" class="author"/>
          <div class="title">{{ prestataire.societe }}</div>
          <div class="topic">{{ prestataire.theme }}</div>
          <div class="description">{{ prestataire.description }}</div>
          <div class="button">
            <router-link :to="`/prestataire/${prestataire.id}`">
              <button>Voir plus</button>
            </router-link>
            <router-link :to="`/prestataire/${prestataire.id}/articles`">
              <button>Acheter un produit</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="thumbnail" ref="thumbnail">
      <div class="item" v-for="(thumb, index) in prestataireTrie" :key="index">
        <img :src="thumb.background" :alt="thumb.societe" class="background"/>
        <div class="content">
          <div class="title">{{ thumb.societe }}</div>
        </div>
      </div>
    </div>
    <div class="arrows">
      <button @click="showSlider('prev')" class="nav-arrow">❮</button>
      <button @click="showSlider('next')" class="nav-arrow">❯</button>
    </div>
    <div class="time"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "PrestataireCarousel",
  components: {NavBar},
  data() {
    return {
      runTimeOut: null,
      autoRun: null,
      timeRunning: 3000,
      timeAutoNext: 7000,
    };
  },
  computed: {
    ...mapState("ProfilStore", ["prestataires"]),
    prestataireTrie() {
      if (this.prestataires.length > 1) {
        return this.prestataires.slice(1).concat(this.prestataires[0]);
      }
      return this.prestataires;
    }
  },
  methods: {
    ...mapActions("ProfilStore", ["getAllPrestataire"]),
    showSlider(type) {
      const list = this.$refs.list;
      const thumbnail = this.$refs.thumbnail;
      const carousel = this.$el;

      if (!list || !thumbnail) return;

      const items = Array.from(list.children);
      const thumbs = Array.from(thumbnail.children);

      if (type === "next") {
        list.appendChild(items[0]);
        thumbnail.appendChild(thumbs[0]);
        carousel.classList.add(type);
      } else {
        list.prepend(items[items.length - 1]);
        thumbnail.prepend(thumbs[thumbs.length - 1]);
        carousel.classList.add(type);
      }

      clearTimeout(this.runTimeOut);
      this.runTimeOut = setTimeout(() => {
        carousel.classList.remove("next");
        carousel.classList.remove("prev");
      }, this.timeRunning);

      clearTimeout(this.autoRun);
      this.autoRun = setTimeout(() => {
        this.showSlider("next");
      }, this.timeAutoNext);
    }

  },
  mounted() {
    this.getAllPrestataire();
    this.autoRun = setTimeout(() => {
      this.showSlider("next");
    }, this.timeAutoNext);
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
* {
  margin: 0;
  font-family: Poppins,serif;
  font-size: 12px;
}
.carousel{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.carousel .list .item{
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0 0 0 0;
}
.carousel .list .item .background{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel .list .item .content{
  position: absolute;
  top: 21%;
  width: 1140px;
  max-width: 80%;
  left: 45%;
  transform: translateX(-50%);
  padding-right: 30%;
  box-sizing: border-box;
  color: #fff;
  text-shadow: 0 5px 10px #0004;
}
.carousel .list .item .content .author{
  width: 150px;
  height: 150px;
}

.carousel .list .item .content .title,
.carousel .list .item .content .topic{
  font-size: 5em;
  font-weight: bold;
  line-height: 1.3em;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
.carousel .list .item .content .topic{
  color: #9f041c;
  padding-bottom: 5px;
}
.carousel .list .item .content .description{
  font-size: 15px;
  padding-bottom: 10px;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
.carousel .list .item .content .button {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.carousel .list .item .content button {
  border: none;
  background-color: #ffffff;
  letter-spacing: 1px;
  font-family: Poppins, serif;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  padding: 12px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
.carousel .list .item .content .button button:hover {
  background-color: #fff;
  color: #9f041c;
  transform: scale(1.05);
  text-shadow: none;
}
.carousel .list .item .content .button button:nth-child(1) {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.carousel .list .item .content .button button:nth-child(1):hover {
  background-color: #fff;
  color: #9f041c;
}
.thumbnail{
  position: absolute;
  bottom: 50px;
  left: 55.5%;
  width: max-content;
  z-index: 100;
  display: flex;
  gap: 20px;
}
.thumbnail .item{
  width: 150px;
  height: 220px;
  flex-shrink: 0;
  position: relative;
}
.thumbnail .item .background{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.thumbnail .item .content{
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.thumbnail .item .content .title{
  font-weight: bold;
  color : #9f041c;
  font-size: 17px;
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
}
.arrows{
  position: absolute;
  top: 87%;
  right: 72.5%;
  z-index: 100;
  width: 300px;
  max-width: 30%;
  display: flex;
  gap: 10px;
  align-items: center;
}
.arrows button{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(113, 117, 117);
  border: none;
  color: #fff;
  font-family: monospace;
  font-weight: bold;
  transition: .5s;
}
.arrows button:hover {
  background-color: #fff;
  color: #9f041c;
}
.carousel .list .item:nth-child(1){
  z-index: 1;
}
.carousel .list .item:nth-child(1) .content .author,
.carousel .list .item:nth-child(1) .content .title,
.carousel .list .item:nth-child(1) .content .topic,
.carousel .list .item:nth-child(1) .content .description,
.carousel .list .item:nth-child(1) .content .button
{
  transform: translateY(50px);
  filter: blur(20px);
  opacity: 0;
  animation: showContent 0.5s 1s linear 1 forwards;
}
@keyframes showContent{
  to{
    transform: translateY(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
.carousel .list .item:nth-child(1) .content .title{
  animation-delay: 1.2s!important;
}
.carousel .list .item:nth-child(1) .content .topic{
  animation-delay: 1.4s!important;
}
.carousel .list .item:nth-child(1) .content .description{
  animation-delay: 1.6s!important;
}
.carousel .list .item:nth-child(1) .content .button{
  animation-delay: 1.8s!important;
}
.carousel.next .list .item:nth-child(1) .background{
  width: 150px;
  height: 220px;
  position: absolute;
  bottom: 50px;
  left: 55.5%;
  border-radius: 20px;
  animation: showImage 0.5s linear 1 forwards;
}
@keyframes showImage{
  to{
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
.carousel.next .thumbnail .item:nth-last-child(1){
  overflow: hidden;
  animation: showThumbnail .5s linear 1 forwards;
}
.carousel.prev .list .item .background{
  z-index: 100;
}
@keyframes showThumbnail{
  from{
    width: 0;
    opacity: 0;
  }
}
.carousel.next .thumbnail{
  animation: effectNext .5s linear 1 forwards;
}
@keyframes effectNext{
  from{
    transform: translateX(150px);
  }
}
.carousel .time{
  position: absolute;
  z-index: 1000;
  width: 0;
  height: 3px;
  background-color: #9f041c;
  left: 0;
  top: 0;
}

.carousel.next .time,
.carousel.prev .time{
  animation: runningTime 3s linear 1 forwards;
}
@keyframes runningTime{
  from{ width: 100%}
  to{width: 0}
}
.carousel.prev .list .item:nth-child(2){
  z-index: 2;
}
.carousel.prev .list .item:nth-child(2) .background{
  animation: outFrame 0.5s linear 1 forwards;
  position: absolute;
  bottom: 0;
  left: 0;
}
@keyframes outFrame{
  to{
    width: 150px;
    height: 220px;
    bottom: 50px;
    left: 55.5%;
    border-radius: 20px;
  }
}

.carousel.prev .thumbnail .item:nth-child(1){
  overflow: hidden;
  opacity: 0;
  animation: showThumbnail .5s linear 1 forwards;
}
.carousel.next .arrows button,
.carousel.prev .arrows button{
  pointer-events: none;
}
.carousel.prev .list .item:nth-child(2) .content .author,
.carousel.prev .list .item:nth-child(2) .content .title,
.carousel.prev .list .item:nth-child(2) .content .topic,
.carousel.prev .list .item:nth-child(2) .content .description,
.carousel.prev .list .item:nth-child(2) .content .button
{
  animation: contentOut 1.5s linear 1 forwards!important;
}
@keyframes contentOut{
  to{
    transform: translateY(-150px);
    filter: blur(20px);
    opacity: 0;
  }
}
@media screen and (max-width: 678px) {
  .carousel .list .item .content{
    padding-right: 0;
  }
  .carousel .list .item .content .title{
    font-size: 30px;
  }
}
</style>