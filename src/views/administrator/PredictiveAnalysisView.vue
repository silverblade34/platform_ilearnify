<template>
    <div class="flex justify-between items-center">
        <span class="font-bold text-xl text-gray-500 title-views">Analisis predictivo</span>
    </div>
    <div class="py-5">
        <div class="grid grid-cols-3 gap-5">
            <div class="charts doughnutChart">
                <h4 class="pb-3 font-semibold text-gray-500">Predicción Algoritmo Regresión Logistica</h4>
                <Bar :options="chartOptions" :data="charDataAverage" />
            </div>
            <div class="charts doughnutChart h-[18rem]">
                <h4 class="pb-3 font-semibold text-gray-500">Predicción Algoritmo Arbol de desiciones</h4>
                <div class="w-full flex justify-center h-full">
                    <Doughnut :options="chartOptions" :data="charDataStatusAsnswers" />
                </div>
            </div>
            <div class="charts doughnutChart">
                <h4 class="pb-3 font-semibold text-gray-500">Examenes realizados por curso</h4>
                <Bar :options="chartOptions" :data="charDataExamsCount" />
            </div>
        </div>
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
import { findLogisticRegression, findDecisionTree } from '@/api/administrator/PredictiveService';
import { validateError } from '@/helpers/Validators';
import { onMounted, ref } from 'vue';

export default ({
    setup() {
        const dialogLoader = ref(false);
        const dataLogistic = ref([]);
        const dataDecisionTree = ref([]);
        const dataPredictionLogistic = ref([]);
        const dataPredictionDesicionTree = ref([]);

        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        })

        const readyData = async () => {
            await findLogisticRegression()
                .then(response => {
                    dataLogistic.value = response.data ? response.data : [];
                    console.log("------------LOGISTIC REGRESION------------")
                    console.log(dataLogistic.value)
                    dataPredictionLogistic.value = agrupedCoursePrediction(dataLogistic.value);
                })
                .catch(error => {
                    dialogLoader.value = false;
                    validateError(error.response);
                })
            await findDecisionTree()
                .then(response => {
                    dataDecisionTree.value = response.data ? response.data : [];
                    console.log("------------DECISION TREE------------")
                    console.log(dataDecisionTree.value)
                    dataPredictionDesicionTree.value = agrupedCoursePrediction(dataDecisionTree.value);
                })
                .catch(error => {
                    dialogLoader.value = false;
                    validateError(error.response);
                })
        }

        const agrupedCoursePrediction = (cursos) => {
            // Redondear todos los valores a 2 decimales
            cursos.forEach(curso => {
                for (let key in curso) {
                    if (typeof curso[key] === 'number') {
                        curso[key] = parseFloat(curso[key].toFixed(2)); // Redondear a 2 decimales
                    }
                }
            });

            // Calcular el promedio de cada campo numérico para todos los cursos
            let promedio = {};
            let numCursos = cursos.length;

            // Inicializar el objeto de promedios con 0 para cada clave
            for (let key in cursos[0]) {
                if (typeof cursos[0][key] === 'number') {
                    promedio[key] = 0;
                }
            }

            // Sumar los valores de cada clave para todos los cursos
            cursos.forEach(curso => {
                for (let key in curso) {
                    if (typeof curso[key] === 'number') {
                        promedio[key] += curso[key];
                    }
                }
            });

            // Calcular el promedio dividiendo por el número de cursos
            for (let key in promedio) {
                promedio[key] /= numCursos;
                promedio[key] = parseFloat(promedio[key].toFixed(2)); // Redondear a 2 decimales
            }

            return promedio;
        }

        return {
            dialogLoader,
            dataPredictionLogistic,
            dataPredictionDesicionTree
        }
    }
})
</script>