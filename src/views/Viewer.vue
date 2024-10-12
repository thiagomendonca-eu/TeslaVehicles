<template>
  <v-container v-if="isLogged.status">
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Pesquisar"
          variant="outlined"
          color="primary"
          prepend-icon="mdi-magnify"
        />
      </v-col>
    </v-row>
    <v-row v-if="veiculos.length !== 0">
      <v-col v-for="(veiculo, index) in veiculos" :key="index" sm="4">
        <v-card>
          <v-img
            :src="`https://api.unsplash.com/photos/random?query=car-${veiculo.modelo}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`"
            height="200px"
            cover
          />
          <v-card-title>{{ veiculo.modelo }}</v-card-title>
          <v-card-subtitle>{{ veiculo.marca }}</v-card-subtitle>
          <v-card-text
            >Motor: {{ veiculo.tipo_motor }} |
            {{ veiculo.combustivel }}</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :to="`/home/${veiculo.id}`"
              prepend-icon="mdi-pencil"
              >Editar</v-btn
            >
            <v-btn
              color="error"
              @click="excluir(veiculo.id)"
              prepend-icon="mdi-delete"
              >Excluir</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col justify="center" cols="2">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLoggedStore } from "@/store/logged";
import { ref, onMounted, watch, onUnmounted } from "vue";
import axios from "axios";

const isLogged = useLoggedStore();

const veiculos = ref([]);
const veiculosCopy = ref([]);
const search = ref("");

onUnmounted(() => {
  veiculos.value = [];
  veiculosCopy.value = [];
});

onMounted(() => {
  setTimeout(() => {
    fetchAll();
  }, 500);
});

function fetchAll() {
  axios
    .get(`https://aula8-58352-default-rtdb.firebaseio.com/veiculos.json`)
    .then((response) => {
      Object.keys(response.data).forEach((key) => {
        veiculos.value.push({
          id: key,
          ...response.data[key],
        });
        veiculosCopy.value.push({
          id: key,
          ...response.data[key],
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function excluir(id) {
  axios
    .delete(
      `https://aula8-58352-default-rtdb.firebaseio.com/veiculos/${id}.json`
    )
    .then((response) => {
      veiculos.value = veiculos.value.filter((veiculo) => veiculo.id !== id);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

watch(search, (value) => {
  veiculos.value = veiculosCopy.value.filter((veiculo) => {
    return veiculo.modelo.toLowerCase().includes(value.toLowerCase());
  });
});

// search(search) {
//   this.veiculos = this.veiculosCopy.filter((veiculo) =>
//     veiculo.modelo.toLowerCase().includes(search.toLowerCase())
//   );
// }
</script>

<style>
</style>