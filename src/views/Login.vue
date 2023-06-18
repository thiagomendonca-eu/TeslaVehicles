<template>
    <v-container>
        <v-form>
            <h1>Login</h1>
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
            <v-btn color="primary" class="mr-2" @click="login">Login</v-btn>
            <v-btn color="primary" @click="google">Login com Google</v-btn>
        </v-form>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

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
    });
    router.push('/home')
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
    router.push('/home')
}
</script>