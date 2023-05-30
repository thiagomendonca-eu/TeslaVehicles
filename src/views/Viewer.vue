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
      <v-row>
        <v-col v-for="veiculo in veiculos" :key="veiculo.id" sm="4">
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
                :to="`/${veiculo.id}`"
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
        .get(`${this.supabaseUrl}/veiculos?select=*`, {
          headers: {
            apikey: this.supabaseApiKey,
            Authorization: `Bearer ${this.supabaseToken}`,
          },
          contentType: "application/json",
        })
        .then((response) => {
          this.veiculos = response.data;
          this.veiculosCopy = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    excluir(id) {
      this.axios
        .delete(`${this.supabaseUrl}/veiculos?id=eq.${id}`, {
          headers: {
            apikey: this.supabaseApiKey,
            Authorization: `Bearer ${this.supabaseToken}`,
          },
          contentType: "application/json",
        })
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

  beforeUpdate() {
    this.fetchAll();
  },

  beforeMount() {
    this.fetchAll();
  },
};
</script>

<style>
</style>