<template>
  <div>
    <v-app>
      <v-app-bar color="primary">
        <v-toolbar-title>
          <v-icon>mdi-lightning-bolt</v-icon>
          TeslaVehicles
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tabs>
          <v-tab v-show="logged" to="/home">Cadastrar</v-tab>
          <v-tab v-show="logged" to="/viewer">Visualizar</v-tab>
          <v-tab v-show="logged" @click="logout">Sair</v-tab>
        </v-tabs>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const logged = ref(false);

const router = useRouter();

onAuthStateChanged(auth, (user) => {
  if (user) {
    logged.value = true;
    console.log('logged');
  } else {
    logged.value = false;
    console.log('not logged');
  }
});

const logout = () => {
  auth.signOut();
  console.log('logout');
  router.push('/');
};

</script>
