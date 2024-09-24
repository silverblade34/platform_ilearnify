<template>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1 text-sm rounded-lg">
        <template v-slot:[`item.nameStudent`]="{ item }">
         <div class="flex gap-1 justify-start">
            {{ item.selectable.studentFirstName }}  {{ item.selectable.studentLastName }}
         </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <div class="flex gap-1 justify-end">
                <v-btn size="small" color="blue" @click="viewDetails(item)">Detalle</v-btn>
            </div>
        </template>
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
    emits: ['view-details'],
    data() {
        return {
            headers: [
                { title: 'ID', align: 'start', key: 'userId' },
                { title: 'Nombre', align: 'start', key: 'nameStudent' },
                { title: 'Correo', align: 'start', key: 'userEmail' },
                { title: 'Distrito', align: 'start', key: 'studentDistrict' },
                { title: 'Genero', align: 'end', key: 'studentGender' },
                { title: 'Nivel socieconomico', align: 'end', key: 'studentEconomicLevel' },
                { title: 'Detalle graficos', align: 'end', key: 'actions' },
            ]
        }
    },
    setup(_, { emit }) {
        const viewDetails = (item) => {
            emit('view-details', { userId: item.raw.studentId })
        }

        return {
            viewDetails
        }
    }
})
</script>