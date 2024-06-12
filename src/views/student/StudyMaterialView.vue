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
    <span class="font-bold text-xl text-gray-500 title-views"
      >{{ routeParams.name }} - {{ dataUnit.unit_name }}</span
    >
  </div>
  <div class="py-5">
    <div class="flex justify-center w-full">
      <div class="w-[70%] p-5 rounded-lg bg-white shadow-md">
        <p class="font-bold pb-3 text-gray-500">{{ material.title }}</p>
        <iframe
          :src="materialLinkGooglePreview"
          style="width: 100%; height: 700px"
          frameborder="0"
        ></iframe>
        <div class="pt-2">
          <v-btn
            variant="outlined"
            size="small"
            color="cyan-darken-1"
            @click="downloadDocument"
          >
            <v-icon icon="mdi-download"></v-icon>
            Descargar archivo
          </v-btn>
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
import { findAllCourseUnitsApi } from "@/api/student/CourseService";
import { useRoute } from "vue-router";
import store from "@/store";
import { ref, onMounted, getCurrentInstance } from "vue";

export default {
  setup() {
    const route = useRoute();
    const routeParams = ref(route.params);
    const dialogLoader = ref(false);
    const dataUnit = ref({});
    const materialLinkGooglePreview = ref("");
    const material = ref("");
    const instance = getCurrentInstance();

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findAllCourseUnitsApi(store.state.token, routeParams.value.id).then(
        (response) => {
          dataUnit.value = response.data.data.find(
            (unit) => unit.unit_id == routeParams.value.idUnit
          );
          const dataMaterials = dataUnit.value.materials;
          material.value = dataMaterials.find(
            (material) => material.material_id == routeParams.value.idMaterial
          );
          materialLinkGooglePreview.value =
            "https://docs.google.com/gview?url=" +
            material.value.document_link +
            "&embedded=true";
        }
      );
    };

    const previousView = () => {
      if (instance && instance.proxy && instance.proxy.$router) {
        instance.proxy.$router.go(-1);
      }
    };

    const downloadDocument = () => {
      const link = document.createElement("a");
      link.href = material.value.document_link;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      downloadDocument,
      previousView,
      materialLinkGooglePreview,
      dialogLoader,
      dataUnit,
      routeParams,
      material,
    };
  },
};
</script>
