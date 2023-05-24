<template>
  <v-main>
    <h1>Home {{ id }}</h1>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      id: null,
    };
  },

  beforeMount() {
    this.id = this.$route.params.id;
  },
};
</script>

<style>
</style>