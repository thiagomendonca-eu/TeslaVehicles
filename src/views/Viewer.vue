<template>
  <v-main>
    <v-container>
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
      <v-row v-if="veiculos">
        <v-col v-for="(veiculo, index) in veiculos" :key="index" sm="4">
          <v-card>
            <v-img
              :src="`https://source.unsplash.com/random/?car=${veiculo.id}`"
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
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      veiculos: [],
      veiculosCopy: [],
      search: "",
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseApiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      supabaseToken: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
    };
  },

  methods: {
    fetchAll() {
      this.axios
        .get(`https://aula8-58352-default-rtdb.firebaseio.com/veiculos.json`)
        .then((response) => {
          // this.veiculos = response.data;
          // this.veiculosCopy = response.data;
          Object.keys(response.data).forEach((key) => {
            this.veiculos.push({
              id: key,
              ...response.data[key],
            });
            this.veiculosCopy.push({
              id: key,
              ...response.data[key],
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    excluir(id) {
      this.axios
        .delete(`https://aula8-58352-default-rtdb.firebaseio.com/veiculos/${id}.json`)
        .then((response) => {
          this.veiculos = this.veiculos.filter((veiculo) => veiculo.id !== id);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  watch: {
    search(search) {
      this.veiculos = this.veiculosCopy.filter((veiculo) =>
        veiculo.modelo.toLowerCase().includes(search.toLowerCase())
      );
    },
  },

  beforeMount() {
    this.fetchAll();
  },
};
</script>

<style>
</style>