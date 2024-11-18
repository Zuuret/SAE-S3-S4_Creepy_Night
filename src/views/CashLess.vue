<template>
  <div>
    <div class="navbar">
      <NavBar />
    </div>
    <h1>CashLess</h1>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'CashLess',
  components: { NavBar },
  data() {
    return {
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding-top: 150px;
}

</style>