<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">
    Mis calificaciones
  </h1>
  <div class="py-5">
    <div class="charts doughnutChart">
      <h4 class="pb-3 font-semibold">Grafico 1</h4>
      <Bar :options="chartOptions" :data="chartData" />
    </div>
    <div class="charts doughnutChart">
      <h4 class="pb-3 font-semibold">Grafico 2</h4>
      <Bar :options="chartOptions" :data="chartData" />
    </div>
    <div class="charts doughnutChart">
      <h4 class="pb-3 font-semibold">Grafico 3</h4>
      <Bar :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>
<script>
import { findAllRatingsApi } from "@/api/student/RatingsService";
import { validateError } from "@/helpers/Validators";
import store from "@/store";
import { onMounted, ref } from "vue";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  setup() {
    const dialogLoader = ref(false);
    const dataResults = ref([]);
    const averageDataCourses = ref([]);
    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findAllRatingsApi(store.state.token, store.state.studentId)
        .then((response) => {
          dataResults.value = response.data.data ? response.data.data : [];
          console.log("---------------DATA RESULTS---------------");
          console.log(dataResults.value);
          agrupedDataResults(dataResults.value);
        })
        .catch((error) => {
          dialogLoader.value = false;
          validateError(error.response);
        });
    };

    const agrupedDataResults = (data) => {
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

      const result = Object.keys(groupedData).map((course) => {
        const courseData = groupedData[course];
        return {
          course_title: course,
          average_correct_answers:
            courseData.total_correct_answers / courseData.count,
          average_wrong_answers:
            courseData.total_wrong_answers / courseData.count,
          average_total_score: courseData.total_score / courseData.count,
        };
      });

      console.log(result);
    };

    return {
      averageDataCourses,
    };
  },
};
</script>
