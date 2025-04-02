<template>
    <div class="PubPrestataire">
        <div class="intro">
            <h1 class="titre-partie" id="titre-intro">
                {{ $t('prestataire.titreIntro') }}
            </h1>
            <div class="intro-partie">
                <div class="description-intro">
                    <p class="introduction">
                        {{ $t('prestataire.description') }}
                    </p>
                    <router-link class="btn-candidature" to="/creation-profil">{{ $t('prestataire.candidatureLink') }}</router-link>
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

.titre-partie{
  font-family: 'Creepster', cursive;
  font-size: 300%;
  text-align: center;
  padding-top: 50px;
  color: white;
  padding: 50px;
}

@media (max-width: 768px) {
  .intro {
    padding-top: 10px;
    padding-bottom: 30px;
    height: auto;
  }

  .titre-partie {
    font-size: 200%;
    padding: 20px;
  }

  .introduction {
    font-size: 120%;
    margin: 5%;
    padding: 15px;
  }

  .btn-candidature {
    font-size: 16px;
    padding: 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .titre-partie {
    font-size: 250%;
    padding: 30px;
  }

  .introduction {
    font-size: 150%;
    margin: 8%;
    padding: 18px;
  }

  .btn-candidature {
    font-size: 17px;
    padding: 11px;
  }
}
</style>
