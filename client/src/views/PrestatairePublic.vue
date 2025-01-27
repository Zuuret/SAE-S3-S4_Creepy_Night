<template>
  <div class="carousel">
    <div class="list">
      <div class="item" v-for="(slide, index) in slides" :key="index">
        <img :src="getImage(slide.image)" :alt="slide.title" />
        <div class="content">
          <div class="author">{{ slide.author }}</div>
          <div class="title">{{ slide.title }}</div>
          <div class="topic">{{ slide.topic }}</div>
          <div class="description">{{ slide.description }}</div>
          <div class="button">
            <button @click="onViewMore(slide)">Voir plus</button>
          </div>
        </div>
      </div>
    </div>
    <div class="thumbnail">
      <div class="item" v-for="(thumb, index) in slides" :key="index">
        <img :src="getImage(thumb.image)" :alt="thumb.title" />
        <div class="content">
          <div class="title">{{ thumb.title }}</div>
          <div class="description">{{ thumb.description }}</div>
        </div>
      </div>
    </div>
    <div class="arrows">
      <button id="prev" @click="showSlider('prev')" class="nav-arrow">❮</button>
      <button id="next" @click="showSlider('next')" class="nav-arrow">❯</button>
    </div>
    <div class="time"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PrestataireCarousel",
  data() {
    return {
      slides: [
        {
          image: "background_BK.jpg",
          author: "LUNDEV",
          title: "DESIGN SLIDER",
          topic: "ANIMAL",
          description: "Lorem ipsum dolor sit amet",
        },
        {
          image: "background_POP.jpg",
          author: "LUNDEV",
          title: "DESIGN SLIDER",
          topic: "ANIMAL",
          description: "Lorem ipsum dolor sit amet",
        },
        {
          image: "background_starbucks.jpg",
          author: "LUNDEV",
          title: "DESIGN SLIDER",
          topic: "ANIMAL",
          description: "Lorem ipsum dolor sit amet",
        },
      ],
      currentIndex: 0,
      timeRunning: 500,
    };
  },
  computed: {
    ...mapState("ProfilStore", ["prestataires"]),
  },
  methods: {
    ...mapActions("ProfilStore", ["getAllPrestataire"]),
    getImage(image) {
      return require(`@/assets/${image}`);
    },
    showSlider(direction) {
      if (direction === "next") {
        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;
      } else if (direction === "prev") {
        this.currentIndex =
            (this.currentIndex - 1 + this.slides.length) %
            this.slides.length;
      }
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    onViewMore(slide) {
      alert(`Voir plus sur : ${slide.title}`);
    },
  },
  mounted() {
    this.getAllPrestataire();
    this.arrowDirection();
  },
};
</script>

<style scoped>
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
.carousel .list .item img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel .list .item .content{
  position: absolute;
  top: 20%;
  width: 1140px;
  max-width: 80%;
  left: 50%;
  transform: translateX(-50%);
  padding-right: 30%;
  box-sizing: border-box;
  color: #fff;
  text-shadow: 0 5px 10px #0004;
}
.carousel .list .item .author{
  font-weight: bold;
  letter-spacing: 10px;
}
.carousel .list .item .title,
.carousel .list .item .topic{
  font-size: 5em;
  font-weight: bold;
  line-height: 1.3em;
}
.carousel .list .item .topic{
  color: #f1683a;
}
.carousel .list .item .button{
  display: grid;
  grid-template-columns: repeat(2, 130px);
  grid-template-rows: 40px;
  gap: 5px;
  margin-top: 20px;
}
.carousel .list .item .buttons button{
  border: none;
  background-color: #eee;
  letter-spacing: 3px;
  font-family: Poppins,serif;
  font-weight: 500;
}
.carousel .list .item .buttons button:nth-child(2){
  background-color: transparent;
  border: 1px solid #fff;
  color: #eee;
}
/* thumbail */
.thumbnail{
  position: absolute;
  bottom: 50px;
  left: 50%;
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
.thumbnail .item img{
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
  font-weight: 500;
}
.thumbnail .item .content .description{
  font-weight: 300;
}
/* arrows */
.arrows{
  position: absolute;
  top: 80%;
  right: 52%;
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
  background-color: #eee4;
  border: none;
  color: #fff;
  font-family: monospace;
  font-weight: bold;
  transition: .5s;
}
.arrows button:hover{
  background-color: #fff;
  color: #000;
}

/* animation */
.carousel .list .item:nth-child(1){
  z-index: 1;
}

/* animation text in first item */

.carousel .list .item:nth-child(1) .content .author,
.carousel .list .item:nth-child(1) .content .title,
.carousel .list .item:nth-child(1) .content .topic,
.carousel .list .item:nth-child(1) .content .description,
.carousel .list .item:nth-child(1) .content .button
{
  transform: translateY(50px);
  filter: blur(20px);
  opacity: 0;
  animation: showContent .5s 1s linear 1 forwards;
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
/* create animation when next click */
.carousel.next .list .item:nth-child(1) img{
  width: 150px;
  height: 220px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  border-radius: 30px;
  animation: showImage .5s linear 1 forwards;
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
.carousel.prev .list .item img{
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

/* running time */

.carousel .time{
  position: absolute;
  z-index: 1000;
  width: 0;
  height: 3px;
  background-color: #f1683a;
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


/* prev click */

.carousel.prev .list .item:nth-child(2){
  z-index: 2;
}

.carousel.prev .list .item:nth-child(2) img{
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
    left: 50%;
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
