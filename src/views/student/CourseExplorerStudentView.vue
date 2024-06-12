<template>
  <div class="flex">
    <v-btn
      density="compact"
      icon="mdi-chevron-left"
      color="cyan-darken-1"
      class="mr-2"
      variant="tonal"
      @click="previousView"
    ></v-btn>
    <h1 class="font-bold text-xl text-gray-500 title-views">
      {{ routeParams.name }}
    </h1>
  </div>
  <div class="py-5">
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="unit in dataUnits" :key="unit.unit_id">
        <v-expansion-panel-title>
          <span class="font-bold"> {{ unit.unit_name }} </span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="p-4">
            <v-alert
              color="#F6F6F6"
              density="compact"
              class="mb-2"
              v-for="item in unit.materials"
              border="start"
              :key="item.material_id"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <div>
                    <v-icon icon="mdi-file-outline"></v-icon>
                  </div>
                  <div>
                    <p>Material . {{ typeExtension(item.extension) }}</p>
                    <p class="text-sm">{{ item.title }}</p>
                  </div>
                </div>
              </div>
            </v-alert>

            <v-alert
              color="cyan-lighten-5"
              density="compact"
              class="mb-2"
              v-for="item in unit.exams"
              border="start"
              :key="item.exam_id"
              border-color="cyan-darken-1"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <div>
                    <v-icon icon="mdi-file-edit-outline"></v-icon>
                  </div>
                  <div>
                    <p>Evaluación Calificada</p>
                    <p class="text-sm">{{ item.title }}</p>
                  </div>
                </div>
              </div>
            </v-alert>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
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
import { findAllCourseUnitsApi } from "@/api/student/CourseService";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, getCurrentInstance } from "vue";
import store from "@/store";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const routeParams = ref(route.params);
    const dataUnits = ref([]);
    const dialogLoader = ref(false);
    const instance = getCurrentInstance();

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const extensionList = {
      doc: "WORD",
      docx: "WORD",
      xlsx: "EXCEL",
      pdf: "PDF",
    };

    const readyData = async () => {
      await findAllCourseUnitsApi(store.state.token, routeParams.value.id).then(
        (response) => {
          dataUnits.value = response.data.data;
        }
      );
    };

    const typeExtension = (extension) => {
      return extensionList[extension] || "DOC";
    };

    const previousView = () => {
      if (instance && instance.proxy && instance.proxy.$router) {
        instance.proxy.$router.go(-1);
      }
    };

    const goShowMaterialStudy = (unitId, materialId) => {
      router.push(
        `/study_material_student/${routeParams.value.id}/${routeParams.value.name}/${unitId}/${materialId}`
      );
    };

    return {
      goShowMaterialStudy,
      previousView,
      typeExtension,
      dialogLoader,
      routeParams,
      dataUnits,
    };
  },
};
</script>
