<template>
    <v-btn size="small" class="text-none" color="cyan-darken-1" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Nuevo</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-cyan-500 font-bold title_views">CREAR CURSO</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Titulo" prepend-inner-icon="mdi-text" color="cyan-lighten-1"
                        v-model="title"></v-text-field>

                    <v-textarea variant="outlined" label="Descripción" prepend-inner-icon="mdi-text-box-plus"
                        color="cyan-lighten-1" v-model="description" rows="2"></v-textarea>

                    <v-select color="cyan-darken-1" variant="outlined" v-model="grade" :items="grades"
                        label="Grado"></v-select>
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
        const description = ref('');
        const title = ref('');
        const grade = ref("");
        const grades = [
            "1", "2", "3", "4", "5"
        ]

        const createItem = () => {
            emit('create-item', {
                title: title.value,
                description: description.value,
                grade_id: grade.value
            })
            title.value = description.value = "";
            dialog.value = false
        }
        return {
            grade,
            dialog,
            grades,
            title,
            description,
            createItem
        }
    }
}
</script>