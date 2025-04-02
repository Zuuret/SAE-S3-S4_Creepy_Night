<script>

</script>

<template>
  <div>
    <router-link to="/reservations/concert">
      <button>{{ $t('myConcertReservations') }}</button>
    </router-link>
    <router-link to="/reservations/baltrouille">
      <button>{{ $t('myCostumeReservations') }}</button>
    </router-link>
    <router-link to="/reservations/articles">
      <button>{{ $t('myArticleReservations') }}</button>
    </router-link>
  </div>
</template>
<style scoped>

</style>