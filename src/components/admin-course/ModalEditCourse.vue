<template>
    <v-dialog v-model="dialog" width="500" @click:outside="cancelItem">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-blue-400 font-bold title_views">EDITAR CURSO</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Titulo" prepend-inner-icon="mdi-badge-account"
                        color="cyan-darken-1" v-model="title"></v-text-field>
                    <v-text-field variant="outlined" label="Descripción" prepend-inner-icon="mdi mdi-text-long"
                        color="cyan-darken-1" v-model="description"></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey-lighten-2" variant="tonal" @click="cancelItem">
                    Cancelar
                </v-btn>
                <v-btn color="blue-lighten-1" variant="tonal" @click="editItem">
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref, watch } from 'vue';

export default {
    props: {
        itemEdit: Object,
        openModal: Boolean
    },
    emits: ['edit-item', 'cancel-item'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const title = ref('');
        const description = ref('');

        watch(() => props.openModal, (newVal) => {
            dialog.value = newVal
        })

        watch(() => props.itemEdit, (newVal) => {
            if (Object.keys(newVal).length !== 0) {
                title.value = newVal.title
                description.value = newVal.description
            }
        })

        const editItem = () => {
            emit('edit-item', {
                title: title.value,
                description: description.value
            })
            title.value = description.value = ""
        }

        const cancelItem = () => {
            emit('cancel-item')
        }

        return {
            dialog,
            title,
            description,
            editItem,
            cancelItem
        }
    }
}
</script>