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
            <div> {{ truncatedDescription(description) }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="cyan-darken-1" text="Ver más" size="small" variant="tonal" @click="seeMore"></v-btn>
            <v-btn v-if="!isEnrolled" color="indigo-lighten-2" size="small"
                @click="enrollInTheCourse" variant="outlined">Inscribirse</v-btn>
            <v-btn v-else color="indigo-lighten-2" size="small">Inscrito</v-btn>
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
    isEnrolled: Boolean
});

const emit = defineEmits(['enroll-course', 'see-more'])

const enrollInTheCourse = () => {
    confirmBasic(
        async () => {
            emit('enroll-course', { idCourse: props.id });
        },
        "¿Estás seguro de registrarte en este curso?",
        "Aceptar"
    );
}

const seeMore = () => {
    emit('see-more', { id: props.id, name: props.title })
}

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

const truncatedDescription = (description) => {
    return truncateText(description, 45);
};
</script>