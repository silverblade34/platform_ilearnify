<template>
    <form id="register-form" class="lg:w-[90%] w-full text-center">
        <p class="font-bold text-lg text-gray-500 text-start pb-4">Registro de usuario</p>

        <div class="grid grid-cols-2 gap-2">
            <v-text-field color="cyan-darken-1" density="compact" variant="outlined" v-model="firstName"
                label="Nombres"></v-text-field>

            <v-text-field color="cyan-darken-1" density="compact" variant="outlined" v-model="lastName"
                label="Apellidos"></v-text-field>

        </div>
        <v-text-field color="cyan-darken-1" density="compact" prepend-inner-icon="mdi mdi-account" variant="outlined"
            v-model="username" label="Usuario"></v-text-field>

        <v-text-field color="cyan-darken-1" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" density="compact" prepend-inner-icon="mdi-lock-outline"
            variant="outlined" @click:append-inner="visible = !visible" v-model="password"
            label="Contraseña"></v-text-field>

        <v-text-field color="cyan-darken-1" density="compact" prepend-inner-icon="mdi mdi-email" variant="outlined"
            label="Correo" v-model="email"></v-text-field>

        <div class="grid grid-cols-2 gap-2">
            <v-text-field color="cyan-darken-1" density="compact" variant="outlined" type="date" v-model="birthdate"
                label="Fecha nacimiento"></v-text-field>
            <v-text-field color="cyan-darken-1" density="compact" prepend-inner-icon="mdi mdi-phone" variant="outlined"
                v-model="phone" label="N° Celular"></v-text-field>
        </div>

        <div class="grid grid-cols-2 gap-2">
            <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="district" :items="districts"
                label="Distrito"></v-select>
            <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="gender" :items="genders"
                label="Género"></v-select>
        </div>
        <div class="grid grid-cols-2 gap-2">
            <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="socioeconomicLevel"
                :items="socioeconomicLevels" label="Nivel socioeconomico"></v-select>
            <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="grade" :items="grades"
                label="Grado"></v-select>
        </div>
        <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="accessPlatform"
            :items="accessPlatforms" label="Uso de la plataforma diaria estimado"></v-select>

        <div>
            <v-btn size="large" color="cyan-darken-1" @click="createStudent" class="w-full">Registrar</v-btn>
        </div>
        <div class="pt-5 pb-5 flex justify-center text-sm">
            <span>Ya tienes una cuenta?</span><span class="cursor-pointer text-cyan-500 hover:text-cyan-600 ml-2"
                @click="showLogin">
                Login</span>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';

const districts = [
    "Lima",
    "Ate",
    "Barranco",
    "Breña",
    "Comas",
    "Chorrillos",
    "El Agustino",
    "Jesús María",
    "La Molina",
    "La Victoria",
    "Lince",
    "Magdalena del Mar",
    "Miraflores",
    "Pueblo Libre",
    "Puente Piedra",
    "Rimac",
    "San Borja",
    "San Isidro",
    "Independencia",
    "San Luis",
    "San Miguel",
    "Santiago de Surco",
    "Surquillo",
    "Santa Rosa",
    "Los Olivos",
    "Cieneguilla",
    "San Bartolo",
    "Punta Negra",
    "Punta Hermosa",
    "Pucusana",
    "Carabayllo",
    "Chaclacayo",
    "Lurigancho",
    "Lurín",
    "Villa El Salvador",
    "Ancón",
    "Santa Anita"
];

const genders = [
    "Masculino",
    "Femenino",
    "Otro"
];

const grades = [
    "1", "2", "3", "4", "5"
]

const accessPlatforms = [
    "1h - 2h",
    "2h - 4h",
    "4h - 6h",
    "+ 6h",
];

const socioeconomicLevels = [
    "Bajo",
    "Medio",
    "Alto"
];

const visible = ref(false);
const firstName = ref("");
const lastName = ref("");
const username = ref("");

const password = ref("");
const email = ref("");
const birthdate = ref("");

const phone = ref("");
const district = ref("");
const gender = ref("");
const grade = ref("");
const socioeconomicLevel = ref("");
const accessPlatform = ref("");

/* eslint-disable */
const emit = defineEmits(['create-student', 'show-login']);

const createStudent = () => {
    emit('create-student', {
        "username": username.value,
        "password": password.value,
        "email": email.value,
        "firstName": firstName.value,
        "lastName": lastName.value,
        "birthdate": birthdate.value,
        "phone": phone.value,
        "district": district.value,
        "gender": gender.value,
        "grade_id": parseInt(grade.value),
        "socioeconomicLevel": socioeconomicLevel.value,
        "AccessPlatform": accessPlatform.value,
    });
};

const showLogin = () => {
    emit('show-login')
}
</script>

<style scoped>
.v-select .v-select__selections {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>