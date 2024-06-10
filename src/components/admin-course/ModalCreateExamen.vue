<template>
    <v-btn size="small" class="text-none" color="cyan-darken-1" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Agregar examen</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-cyan-500 font-bold title_views">AGREGAR EXAMEN</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Titulo" prepend-inner-icon="mdi-text" color="cyan-lighten-1"
                        v-model="title"></v-text-field>
                    <div>
                        <v-btn>Agregar pregunta</v-btn>
                    </div>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan-grey-lighten-2" variant="tonal" @click="dialog = false">
                    Cancelar
                </v-btn>
                <v-btn color="cyan-lighten-1" variant="tonal" @click="createItem">
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref } from 'vue';

export default {
    props: {
        unitId: Number
    },
    emits: ['create-item'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const title = ref('');

        const createItem = () => {
            emit('create-item', {
                title: title.value,
            })
            title.value = "";
            dialog.value = false;
        }

        return {
            dialog,
            title,
            createItem
        }
    }
}
</script>