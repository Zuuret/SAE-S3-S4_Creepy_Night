<template>
  <div>
    <h1>Login</h1>
    <span>prenom:</span><input v-model="prenom" />
    <span>Password:</span><input v-model="motDePasse" type="password" />
    <button @click="redirectionSite">Login</button>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ConnectionLogin",
  data() {
    return {
      prenom: '',
      motDePasse: ''
    };
  },
  computed: {
    ...mapState(['utilisateur', 'errorMessage']),
  },
  methods: {
    ...mapActions(['loginSite']),
    async redirectionSite() {
      const result = await this.loginSite({ prenom: this.prenom, motDePasse: this.motDePasse });
      if (result.success) {
        await this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>