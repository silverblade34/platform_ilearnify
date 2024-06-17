<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Reportes examenes</h1>
    <div class="py-5">
        <div>
            <v-btn color="green" @click="exportReports" class="mb-3 md:mb-0" size="small">
                <v-icon>mdi-microsoft-excel</v-icon> Exportar excel</v-btn>
        </div>
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
import * as XLSX from "xlsx";

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

        const exportReports = () => {
            const excelData = dataReports.value.flatMap((item) => {
                // Paso 3: Construir la cadena de fecha en el formato deseado
                const fechaFormateada = item.result_date.split("T")[0];
                const itemsRow = {
                    "Codigo": item.result_id,
                    "Fecha": fechaFormateada,
                    "Course": item.course_title,
                    "Unidad": item.unit_name,
                    "Examen": item.exam_title,
                    "Estudiante": item.first_name + " " + item.last_name,
                    "Grado": item.grade_name,
                    "P. Correctas": item.correct_answers,
                    "P. Incorrectas": item.wrong_answers,
                    "Calificación": item.total_score,
                };
                return itemsRow;
            });

            // Crear una hoja de cálculo de Excel
            const workbook = XLSX.utils.book_new();
            // Convertir la matriz de datos a una hoja de cálculo de Excel
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            // Agregar la hoja de cálculo al libro de trabajo
            const sheetName = "DatosReportes";
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

            // Guardar el archivo de Excel
            XLSX.writeFile(
                workbook,
                "Reporte.xlsx",
                { bookType: "xlsx", type: "buffer" }
            );
            dialogLoader.value = false;
        }


        return {
            exportReports,
            dataReports,
            dialogLoader
        }
    }
});
</script>