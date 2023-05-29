<template>
  <v-main>
    <v-container class="mt-8">
      <v-card>
        <v-card-title v-show="!id">Cadastrar Veículo</v-card-title>
        <v-card-title v-show="id">Editar Veículo: {{ id }}</v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4"
                ><v-text-field variant="outlined" v-model="marca" label="Marca"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="modelo"
                  label="Modelo"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="ano"
                  type="month"
                  label="Mês e Ano de Fabricação"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field variant="outlined" v-model="cor" label="Cor"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="tipo_veiculo"
                  label="Tipo de Veículo"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="tipo_motor"
                  label="Motor"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="combustivel"
                  label="Combustível"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="cambio"
                  label="Câmbio"
              /></v-col>
              <v-col cols="12" sm="4"
                ><v-text-field
                  variant="outlined"
                  v-model="chassi"
                  label="Chassi"
              /></v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="outlined"
                prepend-icon="mdi-restart"
                @click="limpar"
                >Limpar</v-btn
              >
              <v-btn
                color="primary"
                variant="elevated"
                prepend-icon="mdi-content-save"
                @click="salvar"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      marca: null,
      modelo: null,
      ano: null,
      cor: null,
      tipo_veiculo: null,
      tipo_motor: null,
      combustivel: null,
      cambio: null,
      chassi: null,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseApiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      supabaseToken: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
    };
  },

  methods: {
    limpar() {
      this.id = null;
      this.marca = null;
      this.modelo = null;
      this.ano = null;
      this.cor = null;
      this.tipo_veiculo = null;
      this.tipo_motor = null;
      this.combustivel = null;
      this.cambio = null;
      this.chassi = null;
    },
    salvar() {
      // Se tiver ID, é uma edição, se-não é um novo registro
      if (this.id) {
        this.axios
          .patch(
            `${this.supabaseUrl}/veiculos?id=eq.${this.id}`,
            {
              marca: this.marca,
              modelo: this.modelo,
              ano: this.ano + "-01",
              cor: this.cor,
              tipo_veiculo: this.tipo_veiculo,
              tipo_motor: this.tipo_motor,
              combustivel: this.combustivel,
              cambio: this.cambio,
              chassi: this.chassi,
            },
            {
              headers: {
                apikey: this.supabaseApiKey,
                Authorization: `Bearer ${this.supabaseToken}`,
              },
              contentType: "application/json",
            }
          )
          .then((response) => {
            console.log(response);
            this.limpar();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.axios
          .post(
            `${this.supabaseUrl}/veiculos`,
            {
              marca: this.marca,
              modelo: this.modelo,
              ano: this.ano + "-01",
              cor: this.cor,
              tipo_veiculo: this.tipo_veiculo,
              tipo_motor: this.tipo_motor,
              combustivel: this.combustivel,
              cambio: this.cambio,
              chassi: this.chassi,
            },
            {
              headers: {
                apikey: this.supabaseApiKey,
                Authorization: `Bearer ${this.supabaseToken}`,
              },
              contentType: "application/json",
            }
          )
          .then((response) => {
            console.log(response);
            this.limpar();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.$router.push({ name: "Viewer" });
    },
  },
  beforeMount() {
    if (this.$route.params.id) {
      this.axios
        .get(`${this.supabaseUrl}/veiculos?id=eq.${this.$route.params.id}`, {
          headers: {
            apikey: this.supabaseApiKey,
            Authorization: `Bearer ${this.supabaseToken}`,
          },
          contentType: "application/json",
        })
        .then((response) => {
          this.id = response.data[0].id;
          this.marca = response.data[0].marca;
          this.modelo = response.data[0].modelo;
          this.ano = response.data[0].ano.substring(0, 7);
          this.cor = response.data[0].cor;
          this.tipo_veiculo = response.data[0].tipo_veiculo;
          this.tipo_motor = response.data[0].tipo_motor;
          this.combustivel = response.data[0].combustivel;
          this.cambio = response.data[0].cambio;
          this.chassi = response.data[0].chassi;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style>
</style>