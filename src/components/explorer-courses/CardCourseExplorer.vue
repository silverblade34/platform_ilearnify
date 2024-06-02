<template>
    <v-card max-width="400">
        <v-img class="align-end text-white" height="200"
            src="https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2022/08/18125803/Mejores-plataformas-de-cursos-1024x538.jpg"
            cover>
        </v-img>

        <v-card-subtitle class="pt-4">
            {{ title }}
        </v-card-subtitle>

        <v-card-text>
            <div> {{ description }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="cyan-darken-1" text="Ver más" size="small"></v-btn>
            <v-btn color="indigo-lighten-2" text="Inscribirse" size="small" @click="enrollInTheCourse"></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup>
import { confirmBasic } from '@/helpers/SweetAlert';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: Number,
    title: String,
    description: String,
});

const emit = defineEmits(['enroll-course'])

const enrollInTheCourse = () => {
    confirmBasic(
        async () => {
            emit('enroll-course', { idCourse: props.id });
        },
        "¿Estás seguro de registrarte en este curso?",
        "Aceptar"
    );
}
</script>