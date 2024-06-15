<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Reportes examenes</h1>
    <div class="py-5">
        <TableReportsVue :desserts="dataReports" />
    </div>
    <v-dialog v-model="dialogLoader" :scrim="false" persistent width="auto">
        <v-card color="blue">
            <v-card-text>
                Procesando...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { findAllReportsExamsApi } from '@/api/administrator/ReportService';
import { onMounted, ref } from 'vue';
import store from '@/store';
import { validateError } from '@/helpers/Validators';
import TableReportsVue from '@/components/reports-admin/TableReports.vue';

export default ({
    components: { TableReportsVue },
    setup() {
        const dataReports = ref([]);
        const dialogLoader = ref(false);

        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        })

        const readyData = async () => {
            await findAllReportsExamsApi(store.state.token)
                .then(response => {
                    dataReports.value = response.data.data ? response.data.data : [];
                })
                .catch(error => {
                    dialogLoader.value = false;
                    validateError(error.response);
                })
        }

        return {
            dataReports,
            dialogLoader
        }
    }
})
</script>