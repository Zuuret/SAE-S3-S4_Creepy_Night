<template>
  <aside class="sidebar">
    <header class="sidebar-header">
      <h1>Festival Admin</h1>
    </header>
    <nav class="nav">
      <router-link to="/home-organisateur" class="nav-item">Tableau de bord</router-link>
      <router-link to="/orga-utilisateurs" class="nav-item">Utilisateurs</router-link>
      <router-link to="/orga-organisateurs" class="nav-item">Organisateurs</router-link>
      <router-link to="/orga-prestataires" class="nav-item">Prestataires</router-link>
      <router-link to="/orga-demandes" class="nav-item">Demandes</router-link>
      <router-link to="/planning" class="nav-item">Placer concert</router-link>
      <router-link to="/organisateur/validartiste" class="nav-item" >Valider concert</router-link>
      <router-link to="/orga-profil" class="nav-item">Profil</router-link>
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