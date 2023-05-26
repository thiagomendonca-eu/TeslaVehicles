<template>
  <v-app>
    <v-app-bar color="primary">
      <v-toolbar-title>
        <v-icon>mdi-lightning-bolt</v-icon>
        TeslaVehicles
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs v-model="tab">
        <v-tab to="/">Cadastrar</v-tab>
        <v-tab to="/viewer">Visualizar</v-tab>
        <v-tab to="/reports">Relatórios</v-tab>
      </v-tabs>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: "1",
    };
  },
};
</script>
