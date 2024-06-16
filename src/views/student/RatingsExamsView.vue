<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">
    Mis calificaciones
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
  </div>
</template>
<script>
import { findAllRatingsApi } from "@/api/student/RatingsService";
import { validateError } from "@/helpers/Validators";
import store from "@/store";
import { onMounted, ref } from "vue";

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
    const dialogLoader = ref(false);
    /* eslint-disable */
    const dataResults = ref([]);
    const averageDataCourses = ref([]);
    const charDataAverage = ref({
      labels: ["Label"],
      datasets: [{ data: [0] }],
    });
    const chartOptions = {
      responsive: true,
    };

    const charDataStatusAsnswers = ref({
      labels: ["Label"],
      datasets: [{ data: [0] }],
    });

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
      await findAllRatingsApi(store.state.token, store.state.studentId)
        .then((response) => {
          console.log(response);
          dataResults.value = response.data.data ? response.data.data : [];
          agrupedDataAverageResults(dataResults.value);
          agrupedDataStatusAnswersResults(dataResults.value);
        })
        .catch((error) => {
          dialogLoader.value = false;
          validateError(error.response);
        });
    };

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
          backgroundColor: ['#8496F2','#F28484', '#F7C64D', '#F7984D'],
        }]
      };
    };

    return {
      chartOptions,
      charDataAverage,
      charDataExamsCount,
      charDataStatusAsnswers,
      averageDataCourses,
    };
  },
};
</script>
