<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col sm="6">
          <v-card>
            <v-img
              :src="`https://source.unsplash.com/random/?chart`"
              height="200px"
              cover
            />
            <v-card-title> Todos os veículos </v-card-title>
            <v-card-subtitle cover>
              Todos os veículos cadastrados serão exportados para um arquivo
              CSV.
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="csv('todos')">Download</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="6">
          <v-card>
            <v-img
              :src="`https://source.unsplash.com/random/?tesla`"
              height="200px"
              cover
            />
            <v-card-title> Todos os veículos Elétricos</v-card-title>
            <v-card-subtitle>
              Todos os veículos Elétricos cadastrados exportados para um arquivo
              CSV.
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="csv('eletricos')">Download</v-btn>
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
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseApiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      supabaseToken: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
    };
  },

  methods: {
    convertToCSV(objArray) {
      const array =
        typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
      let str = "";
      for (let i = 0; i < array.length; i++) {
        let line = "";
        for (let index in array[i]) {
          if (line !== "") line += ",";
          line += array[i][index];
        }
        str += line + "\r\n";
      }
      return str;
    },
    csv(tipo) {
      if (tipo === "todos") {
        this.axios
          .get(`${this.supabaseUrl}/veiculos?select=*`, {
            headers: {
              apikey: this.supabaseApiKey,
              Authorization: `Bearer ${this.supabaseToken}`,
            },
            contentType: "application/json",
          })
          .then((response) => {
            const csv = this.convertToCSV(response.data);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            window.open(URL.createObjectURL(blob));
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (tipo === "eletricos") {
        this.axios
          .get(`${this.supabaseUrl}/veiculos?combustivel=eq.Eletrico`, {
            headers: {
              apikey: this.supabaseApiKey,
              Authorization: `Bearer ${this.supabaseToken}`,
            },
            contentType: "application/json",
          })
          .then((response) => {
            const csv = this.convertToCSV(response.data);
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            window.open(URL.createObjectURL(blob));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>