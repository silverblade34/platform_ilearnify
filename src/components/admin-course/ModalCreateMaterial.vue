<template>
    <v-btn size="small" class="text-none" color="cyan-darken-1" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Agregar material</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-cyan-500 font-bold title_views">AGREGAR MATERIAL</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Titulo" prepend-inner-icon="mdi-text" color="cyan-lighten-1"
                        v-model="title"></v-text-field>

                    <v-textarea variant="outlined" label="Descripción" prepend-inner-icon="mdi-text-box-plus"
                        color="cyan-lighten-1" v-model="description" rows="2"></v-textarea>

                    <v-file-input v-model="files" :show-size="1000" color="cyan-lighten-1" label="Cargar documento"
                        prepend-icon="mdi-paperclip" variant="outlined" counter>
                        <template v-slot:selection="{ fileNames }">
                            <template v-for="(fileName, index) in fileNames" :key="fileName">
                                <v-chip v-if="index < 2" class="me-2" color="cyan-lighten-1" size="small" label>
                                    {{ fileName }}
                                </v-chip>

                                <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                                    +{{ files.length - 2 }} File(s)
                                </span>
                            </template>
                        </template>
                    </v-file-input>
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
    setup(props, { emit }) {
        const dialog = ref(false);
        const description = ref('');
        const title = ref('');
        const files = ref([]);

        const createItem = () => {
            emit('create-item', {
                unitId: props.unitId,
                title: title.value,
                description: description.value,
                file: files.value[0]
            })
            title.value = description.value = "";
            files.value = [];
            dialog.value = false;
        }

        return {
            dialog,
            title,
            description,
            files,
            createItem
        }
    }
}
</script>