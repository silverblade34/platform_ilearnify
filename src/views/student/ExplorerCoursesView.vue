<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">Explorar Cursos</h1>
  <div class="py-5">
    <div class="container-cards-courses gap-4">
      <template v-for="course in dataCourses" :key="course.course_id">
        <CardCourseExplorer
          :title="course.title"
          :description="course.description"
          :id="course.course_id"
          :isEnrolled="course.is_enrolled"
          @enroll-course="onEnrollCourse"
          @see-more="onSeeMore"
        />
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
import {
  findAllExplorerCoursesApi,
  enrollCourseApi,
} from "@/api/student/ExplorerCoursesService";
import CardCourseExplorer from "@/components/explorer-courses/CardCourseExplorer.vue";
import { onMounted, ref } from "vue";
import store from "@/store";
import { validateError } from "@/helpers/Validators";
import { basicAlert } from "@/helpers/SweetAlert";
import { useRouter } from "vue-router";

export default {
  components: { CardCourseExplorer },
  setup() {
    const dataCourses = ref([]);
    const dialogLoader = ref(false);
    const router = useRouter();

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findAllExplorerCoursesApi(store.state.token)
        .then((response) => {
          dataCourses.value = response.data.data;
        })
        .catch((error) => {
          validateError(error.response);
        });
    };

    const onEnrollCourse = async (data) => {
      dialogLoader.value = true;
      await enrollCourseApi(store.state.token, data.idCourse)
        .then((response) => {
          dialogLoader.value = false;
          basicAlert(
            async () => {
              await readyData();
            },
            "success",
            "Logrado",
            response.data.message
          );
        })
        .catch((error) => {
          dialogLoader.value = false;
          console.log(error);
          validateError(error.response);
        });
    };

    const onSeeMore = (data) => {
      router.push(`/course_student_explorer/${data.id}/${data.name}`);
    };

    return {
      onEnrollCourse,
      onSeeMore,
      dialogLoader,
      dataCourses,
    };
  },
};
</script>
