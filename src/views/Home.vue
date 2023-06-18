<template>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from "axios";

const logged = ref(false);

const router = useRouter();
const route = useRoute();
 
const id = ref(null);
const marca = ref(null);
const modelo = ref(null);
const ano = ref(null);
const cor = ref(null);
const tipo_veiculo = ref(null);
const tipo_motor = ref(null);
const combustivel = ref(null);
const cambio = ref(null);
const chassi = ref(null);
    

function limpar() {
  id = null;
  marca = null;
  modelo = null;
  ano = null;
  cor = null;
  tipo_veiculo = null;
  tipo_motor = null;
  combustivel = null;
  cambio = null;
  chassi = null;
};

function salvar() {
  // Se tiver ID, é uma edição, se-não é um novo registro
  if (id.value) {
    axios
      .patch(
        `https://aula8-58352-default-rtdb.firebaseio.com/veiculos/${id.value}.json`,
        {
          marca: marca.value,
          modelo: modelo.value,
          ano: ano.value + "-01",
          cor: cor.value,
          tipo_veiculo: tipo_veiculo.value,
          tipo_motor: tipo_motor.value,
          combustivel: combustivel.value,
          cambio: cambio.value,
          chassi: chassi.value,
        },
      )
      .then((response) => {
        console.log(response);
        limpar();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    axios
      .post(
        `https://aula8-58352-default-rtdb.firebaseio.com/veiculos.json`,
        {
          marca: marca.value,
          modelo: modelo.value,
          ano: ano.value + "-01",
          cor: cor.value,
          tipo_veiculo: tipo_veiculo.value,
          tipo_motor: tipo_motor.value,
          combustivel: combustivel.value,
          cambio: cambio.value,
          chassi: chassi.value,
        },
      )
      .then((response) => {
        console.log(response);
        limpar();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  router.push({ name: "Viewer" });
};

onMounted(() => {
  if (route.params.id) {
    axios
      .get(`https://aula8-58352-default-rtdb.firebaseio.com/veiculos/${route.params.id}.json`)
      .then((response) => {
        console.log(response);
        id.value = route.params.id;
        marca.value = response.data.marca;
        modelo.value = response.data.modelo;
        ano.value = response.data.ano.substring(0, 7);
        cor.value = response.data.cor;
        tipo_veiculo.value = response.data.tipo_veiculo;
        tipo_motor.value = response.data.tipo_motor;
        combustivel.value = response.data.combustivel;
        cambio.value = response.data.cambio;
        chassi.value = response.data.chassi;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
</script>

<style>
</style>