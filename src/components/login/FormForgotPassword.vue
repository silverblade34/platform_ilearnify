<template>
    <form id="login-form" class="lg:w-[80%] w-full flex flex-col justify-center text-center">
        <p class="font-bold text-lg text-gray-500 text-start pb-4">Recordar contraseña</p>
        <v-text-field color="cyan-darken-1" density="compact" label="Ingrese su usuario"
            prepend-inner-icon="mdi mdi-account" variant="outlined" v-model="username"></v-text-field>
        <div>
            <v-col cols="auto">
                <v-btn size="large" color="cyan-darken-1" @click="sendPassword">Enviar contraseña</v-btn>
            </v-col>
        </div>
        <div class="pt-5 flex justify-center text-sm">
            <span>Deseas regresar?</span><span class="cursor-pointer text-cyan-500 hover:text-cyan-600 ml-2"
                @click="showLogin">
                Login</span>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';

const username = ref('');
/* eslint-disable */
const emit = defineEmits(['send-password', 'show-login']);

const sendPassword = () => {
    emit('send-password', { username: username.value });
};

const showLogin = () => {
    emit('show-login')
}
</script>