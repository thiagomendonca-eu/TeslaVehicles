<template>
    <v-container>
        <v-row justify="center" no-gutters>
            <v-col cols="12" lg="6" sm="10">
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                            v-model="email"
                            label="Email"
                            required
                            />
                            <v-text-field
                            v-model="password"
                            label="Senha"
                            type="password"
                            required
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="flex-column mx-2">
                        <v-btn prepend-icon="mdi-login-variant" block color="primary" variant="elevated" @click="login" class="mb-5">Entrar</v-btn>
                        <v-btn prepend-icon="mdi-google" block color="primary" variant="plain" @click="google">Login com Google</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const email = ref('')
const password = ref('')

const auth = getAuth()
const provider = new GoogleAuthProvider()

const router = useRouter()

const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
        console.log(auth.currentUser);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert('Email ou senha incorretos')
    });
}

const google = () => {
    signInWithPopup(auth, provider)
    .then(() => {
        console.log(auth.currentUser);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}
</script>