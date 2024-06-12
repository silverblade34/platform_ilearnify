<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">
    Cursos Matriculados
  </h1>
  <div class="py-5 h-full">
    <template v-if="dataCourses.length > 0">
      <div class="container-cards-courses gap-4">
        <template v-for="course in dataCourses" :key="course.course_id">
          <CardCourse
            :title="course.title"
            :description="course.description"
            :id="course.course_id"
            @see-more="onSeeMore"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <div class="w-full h-full flex justify-center items-center">
        <div>
          <p>Aún no estas registrado en ningún curso</p>
          <div class="flex justify-center pt-4">
            <v-btn
              color="cyan-darken-1"
              @click="goToExplorerCourses"
              size="small"
              >Explorar cursos</v-btn
            >
          </div>
        </div>
      </div>
    </template>
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
import store from "@/store";
import { findAllEnrolledCoursesHomeApi } from "@/api/student/HomeService";
import CardCourse from "@/components/home/CardCourse.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { CardCourse },
  setup() {
    const dataCourses = ref([]);
    const router = useRouter();
    const dialogLoader = ref(false);

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findAllEnrolledCoursesHomeApi(store.state.token).then(
        (response) => {
          dataCourses.value = response.data.data;
        }
      );
    };

    const goToExplorerCourses = () => {
      router.push("/explorer_courses");
    };

    const onSeeMore = (data) => {
      router.push(`/course_student/${data.id}/${data.name}`);
    };

    return {
      goToExplorerCourses,
      onSeeMore,
      dialogLoader,
      dataCourses,
    };
  },
};
</script>
<style>
.number_card {
  font-family: "Poppins", sans-serif;
}
</style>
