<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">
        <div class="flex">
            <v-btn density="compact" icon="mdi-chevron-left" color="cyan-darken-1" class="mr-2" variant="tonal"
                @click="previousView"></v-btn>
            <h1 class="font-bold text-xl text-gray-500 title-views"> Analisis estudiante - {{ studentParsed.first_name
                }}
                {{ studentParsed.last_name }}</h1>
        </div>

    </h1>
    <div class="py-5">
        <div class="grid grid-cols-3 gap-5">
            <div class="charts doughnutChart">
                <h4 class="pb-3 font-semibold text-gray-500">Resultados examen por curso</h4>
                <Bar :options="chartOptions" :data="charDataAverage" />
            </div>
            <div class="charts doughnutChart h-[18rem]">
                <h4 class="pb-3 font-semibold text-gray-500">Preguntas correctas e incorrectas</h4>
                <div class="w-full flex justify-center h-full">
                    <Doughnut :options="chartOptions" :data="charDataStatusAsnswers" />
                </div>
            </div>
            <div class="charts doughnutChart">
                <h4 class="pb-3 font-semibold text-gray-500">Examenes realizados por curso</h4>
                <Bar :options="chartOptions" :data="charDataExamsCount" />
            </div>
        </div>
        <div class="mt-10">
            <div class="charts h-[35rem]">
                <h4 class="pb-3 font-semibold text-gray-500">Predicción Algoritmo Regresión Logistica</h4>
                <Bar :options="chartOptions" :data="charDataRegresion" />
            </div>
        </div>
        <div class="mt-15">
            <table class="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Curso</th>
                        <th class="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Predicción con Mayor
                            Probabilidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="curso in dataRegresionLogistic" :key="curso.curso" class="odd:bg-white even:bg-gray-50">
                        <td class="border border-gray-300 px-4 py-2">{{ curso.curso }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ obtenerMayorPrediccion(curso.valores_predichos)
                            }}</td>
                    </tr>
                </tbody>
            </table>
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
import { findAllRatingsApi } from "@/api/student/RatingsService";
import store from "@/store";
import { onMounted, ref, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";

import { Bar, Doughnut } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    ArcElement,
    LinearScale,
} from "chart.js";
import { getPredectiveStudentApi, studentByIdApi } from "@/api/student/StudentService";
import { basicAlert } from "@/helpers/SweetAlert";

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    components: { Bar, Doughnut },
    setup() {
        const route = useRoute();
        const dialogLoader = ref(false);
        const studentParsed = ref({});
        const routeParams = ref(route.params);
        /* eslint-disable */
        const dataResults = ref([]);
        const averageDataCourses = ref([]);
        const instance = getCurrentInstance();
        const charDataAverage = ref({
            labels: ["Label"],
            datasets: [{ data: [0] }],
        });
        const chartOptions = {
            responsive: true,
        };
        const charDataRegresion = ref({
            labels: [],
            datasets: [
                {
                    label: 'No pase',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: []
                },
                {
                    label: 'Malo',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: []
                },
                {
                    label: 'Regularmente',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    data: []
                },
                {
                    label: 'Bueno',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: []
                },
                {
                    label: 'Muy bueno',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    data: []
                }
            ]
        });

        const charDataStatusAsnswers = ref({
            labels: ["Label"],
            datasets: [{ data: [0] }],
        });

        const dataRegresionLogistic = ref([])

        const charDataExamsCount = ref({
            labels: ["Label"],
            datasets: [{ data: [0] }],
        });


        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        });

        const readyData = async () => {
            try {
                const [responseRatings, student, responseLogisticRegressionStudent] = await Promise.all([
                    findAllRatingsApi(store.state.token, routeParams.value.id),
                    studentByIdApi(store.state.token, routeParams.value.id),
                    getPredectiveStudentApi(routeParams.value.id),
                ])

                studentParsed.value = student.data.data
                dataResults.value = responseRatings.data.data ? responseRatings.data.data : [];
                agrupedDataAverageResults(dataResults.value);
                agrupedDataStatusAnswersResults(dataResults.value);
                dataRegresionLogistic.value = responseLogisticRegressionStudent.data.data
                processLogisticRegressionChart(responseLogisticRegressionStudent.data.data);

            } catch (error) {
                dialogLoader.value = false;
                basicAlert(() => { }, 'warning', 'Datos insuficientes', 'No se puede realizar una predicción debido a la poca cantidad de registros');
            }
        };

        // Procesar datos para el gráfico de regresión logística
        const processLogisticRegressionChart = (data) => {
            const labels = data.map(item => item.curso);
            const predictedBueno = data.map(item => item.valores_predichos["prediccion de bueno"]);
            const predictedMalo = data.map(item => item.valores_predichos["prediccion de malo"]);
            const predictedMuyBueno = data.map(item => item.valores_predichos["prediccion de muy bueno"]);
            const predictedNoPase = data.map(item => item.valores_predichos["prediccion de no pase"]);
            const predictedRegularmente = data.map(item => item.valores_predichos["prediccion de regularmente"]);
            console.log("----------------VALORES PREDICHOS----------")
            console.log(data)
            charDataRegresion.value = {
                labels: labels,
                datasets: [
                    {
                        label: "Bueno",
                        data: predictedBueno,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Insatisfactorio",
                        data: predictedMalo,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Excelente",
                        data: predictedMuyBueno,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Requiere Atención",
                        data: predictedNoPase,
                        backgroundColor: "rgba(255, 206, 86, 0.2)",
                        borderColor: "rgba(255, 206, 86, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Satisfactorio",
                        data: predictedRegularmente,
                        backgroundColor: "rgba(153, 102, 255, 0.2)",
                        borderColor: "rgba(153, 102, 255, 1)",
                        borderWidth: 1,
                    },
                ]
            };
        };

        const obtenerMayorPrediccion = (valoresPredichos) => {
            const predicciones = Object.entries(valoresPredichos);
            const mayorPrediccion = predicciones.reduce((max, current) =>
                current[1] > max[1] ? current : max
            );
            let prediction = ""
            if(mayorPrediccion[0] == "prediccion de bueno"){
                prediction = "Bueno"
            }else if(mayorPrediccion[0] == "prediccion de malo"){
                prediction = "Insatisfactorio"
            }else if(mayorPrediccion[0] == "prediccion de muy bueno"){
                prediction = "Excelente"
            }else if(mayorPrediccion[0] == "prediccion de no pase"){
                prediction = "Requiere Atención"
            }else if(mayorPrediccion[0] == "prediccion de regularmente"){
                prediction = "Satisfactorio"
            }
            return prediction;
        }

        const agrupedDataStatusAnswersResults = (data) => {
            // Calcular el promedio general de correct_answers y wrong_answers
            const totalCorrectAnswers = data.reduce((acc, curr) => acc + curr.correct_answers, 0);
            const totalWrongAnswers = data.reduce((acc, curr) => acc + curr.wrong_answers, 0);
            const totalCount = data.length;

            const averageCorrectAnswers = totalCorrectAnswers / totalCount;
            const averageWrongAnswers = totalWrongAnswers / totalCount;

            charDataStatusAsnswers.value = {
                labels: ['Preguntas correctas', 'Preguntas incorrectas'],
                datasets: [{
                    data: [averageCorrectAnswers, averageWrongAnswers], label: 'Promedio',
                    backgroundColor: ['#5AC280', '#E38578'],
                }]
            }
        }

        /* eslint-disable */
        const agrupedDataAverageResults = (data) => {
            const groupedData = data.reduce((acc, curr) => {
                const course = curr.course_title;

                if (!acc[course]) {
                    acc[course] = {
                        total_correct_answers: 0,
                        total_wrong_answers: 0,
                        total_score: 0,
                        count: 0,
                    };
                }

                acc[course].total_correct_answers += curr.correct_answers;
                acc[course].total_wrong_answers += curr.wrong_answers;
                acc[course].total_score += parseFloat(curr.total_score);
                acc[course].count += 1;

                return acc;
            }, {});

            const results = Object.keys(groupedData).map((course) => {
                const courseData = groupedData[course];
                return {
                    course_title: course,
                    average_correct_answers: courseData.total_correct_answers / courseData.count,
                    average_wrong_answers: courseData.total_wrong_answers / courseData.count,
                    average_total_score: courseData.total_score / courseData.count,
                    total_records: courseData.count,
                };
            });

            // Asignar los datos a charDataAverage
            charDataAverage.value = {
                labels: results.map(result => result.course_title),
                datasets: [{
                    data: results.map(result => result.average_total_score),
                    label: 'Promedio',
                    backgroundColor: '#81d8d0',
                }]
            };

            charDataExamsCount.value = {
                labels: results.map(result => result.course_title),
                datasets: [{
                    data: results.map(result => result.total_records),
                    label: 'Examenes realizados',
                    backgroundColor: ['#8496F2', '#F28484', '#F7C64D', '#F7984D'],
                }]
            };
        };

        const previousView = () => {
            if (instance && instance.proxy && instance.proxy.$router) {
                instance.proxy.$router.go(-1);
            }
        }

        return {
            dialogLoader,
            charDataRegresion,
            dataRegresionLogistic,
            previousView,
            obtenerMayorPrediccion,
            studentParsed,
            chartOptions,
            charDataAverage,
            charDataExamsCount,
            charDataStatusAsnswers,
            averageDataCourses,
        };
    },
};
</script>