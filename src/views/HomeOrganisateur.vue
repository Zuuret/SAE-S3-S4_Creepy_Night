<template>
  <div>
    <h1>Bienvenue sur la page de l'organisateur</h1>
    <p>Contenu réservé aux organisateurs.</p>

    <h2>Liste des Utilisateurs</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in utilisateurs" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.prenom }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Liste des Organisateurs</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="organisateur in organisateurs" :key="organisateur.id">
          <td>{{ organisateur.id }}</td>
          <td>{{ organisateur.prenom }}</td>
          <td>{{ organisateur.nom }}</td>
          <td>{{ organisateur.email }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Liste des Prestataires</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Société</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prestataire in prestataires" :key="prestataire.id">
          <td>{{ prestataire.id }}</td>
          <td>{{ prestataire.société }}</td>
          <td>{{ prestataire.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { utilisateurs, organisateurs, prestataires } from '@/datasource/data.js';

export default {
  name: "HomeOrganisateur",
  data() {
    return {
      utilisateurs,
      organisateurs,
      prestataires
    };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>