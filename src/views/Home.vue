<template>
  <v-main>
    <v-container class="w-50">
      <v-card>
        <v-card-title>Cadastro de Veículos</v-card-title>
      <v-form >
        <v-container>
          <v-text-field v-model="marca" label="Marca"/>
          <v-text-field v-model="modelo" label="Modelo"/>
          <v-text-field v-model="ano" label="Ano"/>
          <v-text-field v-model="cor" label="Cor"/>
          <v-text-field v-model="tipo_veiculo" label="Tipo de Veículo"/>
          <v-text-field v-model="tipo_motor" label="Motor"/>
          <v-text-field v-model="combustivel" label="Combustível"/>
          <v-text-field v-model="cambio" label="Câmbio"/>
          <v-text-field v-model="chassi" label="Chassi"/>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="margin: 0 15px;" variant="outlined">Salvar</v-btn>
            <v-btn style="margin: 0 15px;" variant="outlined">Limpar</v-btn>
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
    };
  },

  beforeMount() {
    this.id = this.$route.params.id;
  },
};
</script>

<style>
</style>