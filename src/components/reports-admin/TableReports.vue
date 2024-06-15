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
                { title: 'Codigo', align: 'start', key: 'result_id' },
                { title: 'Curso', align: 'start', key: 'course_title' },
                { title: 'Unidad', align: 'start', key: 'unit_name' },
                { title: 'Examen', align: 'start', key: 'exam_title' },
                { title: 'Grado', align: 'start', key: 'grade_name' },
                { title: 'Alumno', align: 'start', key: 'first_name' },
                { title: 'P. Correctas', align: 'start', key: 'correct_answers' },
                { title: 'P. Incorrectas', align: 'start', key: 'wrong_answers' },
                { title: 'Calificación', align: 'start', key: 'total_score' },
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