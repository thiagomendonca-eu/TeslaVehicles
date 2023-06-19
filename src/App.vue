<!-- 
1. [2.0 pt] No mínimo 2 rotas: Login e CRUD; ✅
2. [2.0 pt] Faça um CRUD com Firebase; ✅
3. [2.0 pt] Faça LOGIN social com Firebase; ✅
4. [2.0 pt] Utilize o Pinia para armazenar o estado de logado. A tela do CRUD só pode aparecer se o usuário estiver logado; ✅
5. [2.0 pt] Deve ser usado o vuetify; ✅
-->

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
          <v-tab v-show="isLogged.status" to="/home">Cadastrar</v-tab>
          <v-tab v-show="isLogged.status" to="/viewer">Visualizar</v-tab>
          <v-tab v-show="isLogged.status" @click="logout">Sair</v-tab>
        </v-tabs>
      </v-app-bar>
      <v-main>
        <router-view :key="route.fullPath" />
      </v-main>
    </v-app>
  </div>
</template>
<script setup>
import { useLoggedStore } from '@/store/logged';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';

const isLogged = useLoggedStore();

const auth = getAuth();

const router = useRouter();
const route = useRoute();

onAuthStateChanged(auth, (user) => {
  if(route.path === "/" && user){
    router.push('/home');
  }
  else if(route.path !== "/" && !user){
    router.push('/');
  }
  isLogged.status = user ? true : false;
});

function logout(){
  auth.signOut();
};
</script>
