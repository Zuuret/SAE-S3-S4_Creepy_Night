<template>
    <aside class="sidebar">
        <header class="sidebar-header">
            <h1>{{ $t('sidebar.festivalAdmin') }}</h1>
        </header>
        <nav class="nav">
            <router-link to="/home-organisateur" class="nav-item">{{ $t('sidebar.tableauDeBord') }}</router-link>
            <router-link to="/orga-texte-accueil" class="nav-item">{{ $t('sidebar.editAccueil') }}</router-link>
            <router-link to="/orga-carte" class="nav-item">{{ $t('sidebar.carte') }}</router-link>
            <router-link to="/orga-utilisateurs" class="nav-item">{{ $t('sidebar.utilisateurs') }}</router-link>
            <router-link to="/orga-organisateurs" class="nav-item">{{ $t('sidebar.organisateurs') }}</router-link>
            <router-link to="/orga-prestataires" class="nav-item">{{ $t('sidebar.prestataires') }}</router-link>
            <router-link to="/orga-demandes" class="nav-item">{{ $t('sidebar.demandes') }}</router-link>
            <router-link to="/organisateur/validartiste" class="nav-item">{{ $t('sidebar.validerConcert') }}</router-link>
            <router-link to="/orga-profil" class="nav-item">{{ $t('sidebar.profil') }}</router-link>
        </nav>
    </aside>
</template>

<script>
export default{
  name: "NavOrganisateur",
}

</script>
<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #2c3e50;
  color: #fff;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
}

.sidebar-header {
  text-align: center;
  margin-bottom: 30px;
}

.sidebar-header h1 {
  font-size: 1.8em;
  font-weight: bold;
  margin: 0;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  text-decoration: none;
  padding: 12px;
  color: #ecf0f1;
  font-size: 1.1em;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  display: block;
}

.nav-item:hover {
  background-color: #3498db;
  color: #fff;
}

.nav-item.active {
  background-color: #1f78b4;
}

</style>