<template>
    <form id="login-form" class="lg:w-[80%] w-full flex flex-col justify-center text-center">
        <span class="text-gray-600 pb-1 label text-start">Usuario</span>
        <v-text-field color="cyan-darken-1" density="compact" placeholder="Ingrese su usuario"
            prepend-inner-icon="mdi mdi-account" variant="outlined" v-model="username"></v-text-field>
        <div class="flex justify-between">
            <span class="text-gray-600 pb-1 label">Contraseña</span>
            <span class="text-caption text-decoration-none text-cyan-500 cursor-pointer hover:text-cyan-600" href="#" rel="noopener noreferrer"
                @click="showForgotPassword">
                Olvidaste tu contraseña?</span>
        </div>
        <v-text-field color="cyan-darken-1" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingrese su contraseña"
            prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
            v-model="password"></v-text-field>
        <div>
            <v-col cols="auto">
                <v-btn size="large" color="cyan-darken-1" @click="validateCredential">Ingresar</v-btn>
            </v-col>
        </div>
        <div class="pt-5 flex justify-center text-sm">
            <span>Aún no tienes una cuenta?</span><span class="cursor-pointer text-cyan-500 hover:text-cyan-600 ml-2"
                @click="showRegister">
                Registrarse</span>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const visible = ref(false);
/* eslint-disable */
const emit = defineEmits(['validate-credentials', 'show-register', 'show-forgotpassword']);

const validateCredential = () => {
    emit('validate-credentials', { username: username.value, password: password.value });
};

const showRegister = () => {
    emit('show-register')
}

const showForgotPassword = () => {
    emit('show-forgotpassword')
}
</script>