<template>
    <v-btn size="small" class="text-none" color="cyan-darken-1" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Nuevo</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-cyan-500 font-bold title_views">CREAR UNIDAD</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Nombre" prepend-inner-icon="mdi-text" color="cyan-lighten-1"
                        v-model="unitName"></v-text-field>
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
import { ref } from 'vue'
export default {
    emits: ['create-item'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const unitName = ref('');

        const createItem = () => {
            emit('create-item', {
                unitName: unitName.value,
            })
            unitName.value = "";
            dialog.value = false
        }
        return {
            dialog,
            unitName,
            createItem
        }
    }
}
</script>