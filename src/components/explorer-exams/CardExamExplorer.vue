<template>
    <v-card>
        <div class="grid grid-cols-3 justify-space-between">
            <div class="pt-3 col-span-2">
                <v-card-subtitle>
                    {{ title }}
                </v-card-subtitle>
                <v-card-text>
                    {{ truncatedDescription(description) }}
                </v-card-text>
                <v-card-actions>
                    <v-btn class="ms-2" size="small" text="START RADIO" variant="outlined" @click="viewDocument"
                        color="cyan-darken-1">
                        Ver documento
                    </v-btn>
                </v-card-actions>
            </div>

            <v-img :src="getImageUrl(extension)" class="col-span-1"></v-img>
        </div>
    </v-card>
</template>

<script setup>
/* eslint-disable */
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    extension: String,
    documentLink: String
});

const emit = defineEmits(['view-document']);

const viewDocument = () => {
    emit('view-document', { documentLink: props.documentLink, extension: props.extension });

};

// Mapeo de extensiones a URLs de imágenes
const extensionToImageMap = {
    'doc': 'https://st4.depositphotos.com/2454451/26433/v/450/depositphotos_264331992-stock-illustration-new-word-icon-popular-program.jpg',
    'docx': 'https://st4.depositphotos.com/2454451/26433/v/450/depositphotos_264331992-stock-illustration-new-word-icon-popular-program.jpg',
    'xlsx': 'https://st4.depositphotos.com/2454451/26433/v/450/depositphotos_264331990-stock-illustration-new-excel-icon-popular-program.jpg',
    'pdf': 'https://logowik.com/content/uploads/images/adobe-pdf3324.jpg',
};

// Función para obtener la URL de la imagen basada en la extensión
const getImageUrl = (extension) => {
    return extensionToImageMap[extension] || 'https://st5.depositphotos.com/66680222/68204/v/450/depositphotos_682045366-stock-illustration-document-vector-line-art-icon.jpg'; // Imagen por defecto
};

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

const truncatedDescription = (description) => {
    return truncateText(description, 30);
};
</script>