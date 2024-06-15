<template>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1 text-sm rounded-lg">
    </v-data-table>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';
export default ({
    props: {
        desserts: Array
    },
    components: {
        VDataTable,
    },
    emits: ['delete-item', 'edit-item'],
    data() {
        return {
            headers: [
                { title: 'ID', align: 'start', key: 'userId' },
                { title: 'Usuario', align: 'start', key: 'userName' },
                { title: 'Correo', align: 'start', key: 'userEmail' },
                { title: 'Distrito', align: 'start', key: 'studentDistrict' },
                { title: 'Genero', align: 'end', key: 'studentGender' },
                { title: 'Nivel socieconomico', align: 'end', key: 'studentEconomicLevel' },
            ]
        }
    },
    setup(_, { emit }) {
        const editItem = (item) => {
            emit('edit-item', { item })
        }

        const deleteItem = (item) => {
            emit('delete-item', { item })
        }

        return {
            editItem,
            deleteItem,
        }
    }
})
</script>