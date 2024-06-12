<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">Lista de examenes</h1>
  <div class="py-5">
    <div class="container-cards-courses gap-4" v-if="dataExamenes.length > 0">
      <template v-for="exam in dataExamenes" :key="exam.exam_id">
        <v-card>
          <div class="grid grid-cols-4 justify-space-between">
            <div class="pt-3 col-span-3">
              <v-card-subtitle>
                <span class="font-bold text-gray-500"> {{ exam.title }} </span>
              </v-card-subtitle>
              <v-card-text>
                <p class="text-xs">
                  <span class="font-bold text-gray-500">Curso:</span>
                  {{ exam.course_title }} <br />
                  <span class="font-bold text-gray-500">Unidad:</span>
                  {{ exam.unit_name }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ms-2"
                  size="small"
                  variant="outlined"
                  @click="goSolveExam(exam.exam_id)"
                  color="cyan-darken-1"
                >
                  Realizar examen
                </v-btn>
              </v-card-actions>
            </div>
            <div class="flex justify-center items-center h-full">
              <v-img
                src="https://cdn-icons-png.flaticon.com/512/4696/4696755.png"
                class="col-span-1"
              ></v-img>
            </div>
          </div>
        </v-card>
      </template>
    </div>
  </div>
  <v-dialog v-model="dialogLoader" :scrim="false" persistent width="auto">
    <v-card color="blue">
      <v-card-text>
        Procesando...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { findAllExamApi, findOneExamApi } from "@/api/student/ExamService";
import { basicAlert } from "@/helpers/SweetAlert";
import { validateError } from "@/helpers/Validators";
import store from "@/store";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const dataExamenes = ref([]);
    const dialogLoader = ref(false);

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findAllExamApi(store.state.token)
        .then((response) => {
          dataExamenes.value = response.data.data ? response.data.data : [];
        })
        .catch((error) => {
          dialogLoader.value = false;
          validateError(error.response);
        });
    };

    const goSolveExam = async (examId) => {
      dialogLoader.value = true;
      await findOneExamApi(store.state.token, examId)
        .then((response) => {
          const statusCompleted = response.data.data.isCompleted;
          if (statusCompleted) {
            dialogLoader.value = false;
            basicAlert(
              () => {},
              "warning",
              "Examen resuelto",
              "Este examen ya ha sido resuelto"
            );
          } else {
            dialogLoader.value = false;
            router.push(`/solve_exam/${examId}`);
          }
        })
        .catch((error) => {
          dialogLoader.value = false;
          console.log(error);
          validateError(error.response);
        });
    };

    return {
      goSolveExam,
      dialogLoader,
      dataExamenes,
    };
  },
};
</script>
