<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">Resolver examen</h1>
  <div class="py-5">
    <div class="flex justify-center w-full">
      <div class="w-[70%] p-5 rounded-lg bg-white shadow-md">
        <p class="font-bold pb-3 text-gray-500">{{ exam.title }}</p>
        <template
          v-for="question in exam.questions"
          :key="question.question_id"
        >
          <div class="py-2">
            <p>{{ question.question_text }}</p>
            <v-radio-group v-model="answers[question.question_id]">
              <v-radio
                :label="answer.answer_text"
                density="compact"
                v-for="answer in question.answers"
                :key="answer.answer_id"
                :value="answer.answer_id"
                class="py-2"
                color="cyan-darken-1"
              ></v-radio>
            </v-radio-group>
          </div>
        </template>
        <div class="py-5">
          <v-btn @click="submitAnswers" size="small" color="cyan-darken-1"
            >Terminar examen</v-btn
          >
        </div>
      </div>
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
import { useRoute } from "vue-router";
import { ref, onMounted, getCurrentInstance } from "vue";
import { findOneExamApi, submitExam } from "@/api/student/ExamService";
import store from "@/store";
import { basicAlert } from "@/helpers/SweetAlert";

export default {
  setup() {
    const route = useRoute();
    const routeParams = ref(route.params);
    const exam = ref({});
    const dialogLoader = ref(false);
    const answers = ref({});
    const instance = getCurrentInstance();

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findOneExamApi(store.state.token, routeParams.value.id).then(
        (response) => {
          exam.value = response.data.data;
          initializeAnswers(exam.value.questions);
        }
      );
    };

    const initializeAnswers = (questions) => {
      questions.forEach((question) => {
        answers.value[question.question_id] = null;
      });
    };

    const submitAnswers = () => {
      const formattedAnswers = Object.entries(answers.value).map(
        ([question_id, answer_id]) => ({
          question_id: parseInt(question_id),
          answer_id: parseInt(answer_id),
        })
      );

      const payload = {
        student_id: store.state.studentId,
        exam_id: exam.value.exam_id,
        answers: formattedAnswers,
      };

      console.log(payload);
      submitExam(store.state.token, payload).then((response) => {
        basicAlert(
          async () => {
            previousView();
          },
          "success",
          "Logrado",
          response.data.message
        );
      });
    };

    const previousView = () => {
      if (instance && instance.proxy && instance.proxy.$router) {
        instance.proxy.$router.go(-1);
      }
    };

    return {
      routeParams,
      exam,
      dialogLoader,
      answers,
      submitAnswers,
    };
  },
};
</script>
