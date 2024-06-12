<template>
  <h1 class="font-bold text-xl text-gray-500 title-views">Biblioteca</h1>
  <div class="py-5">
    <div class="w-full">
      <div class="lg:w-[30%] pb-4 w-full flex items-end gap-2">
        <v-text-field
          variant="underlined"
          color="blue"
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Buscar"
          hide-details
          density="compact"
          clearable
        ></v-text-field>
        <v-btn size="small" color="cyan-darken-1" @click="searchDocuments"
          >Buscar</v-btn
        >
      </div>
    </div>
    <div class="container-cards-courses gap-4" v-if="dataDocuments.length > 0">
      <template v-for="document in dataDocuments" :key="document.library_id">
        <CardDocumentVue
          :title="document.document_title"
          :description="document.document_description"
          :extension="document.extension"
          :documentLink="document.document_link"
          @view-document="onViewDocument"
        />
      </template>
    </div>
  </div>
  <!-- Modal para ver el documento -->
  <v-dialog v-model="dialogPreview" max-width="800px">
    <v-card>
      <v-card-subtitle class="headline pt-3"
        >Previsualización del documento</v-card-subtitle
      >
      <v-card-text>
        <div>
          <iframe
            :src="documentLinkGooglePreview"
            style="width: 100%; height: 500px"
            frameborder="0"
          ></iframe>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          @click="dialogPreview = false"
          size="small"
          variant="tonal"
          >Cerrar</v-btn
        >
        <v-btn
          color="cyan-darken-1"
          size="small"
          variant="tonal"
          @click="downloadDocument()"
          >Descargar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
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
import { findAllUsersDocumentApi } from "@/api/student/LibraryService";
import CardDocumentVue from "@/components/library/CardDocument.vue";
import { onMounted, ref } from "vue";
import store from "@/store";
import { validateError } from "@/helpers/Validators";

export default {
  components: { CardDocumentVue },
  setup() {
    const dataDocuments = ref([]);
    const page = ref(1);
    const limit = ref(40);
    const search = ref("");
    const dialogLoader = ref(false);
    const dialogPreview = ref(false);
    const documentLinkGooglePreview = ref("");
    const documentLinkPreview = ref("");

    onMounted(async () => {
      dialogLoader.value = true;
      await readyData();
      dialogLoader.value = false;
    });

    const readyData = async () => {
      await findAllUsersDocumentApi(
        store.state.token,
        page.value,
        limit.value,
        search.value
      )
        .then((response) => {
          dataDocuments.value = response.data.documents
            ? response.data.documents
            : [];
        })
        .catch((error) => {
          dialogLoader.value = false;
          validateError(error.response);
        });
    };

    const searchDocuments = () => {
      readyData();
    };

    const onViewDocument = (data) => {
      dialogPreview.value = true;
      documentLinkGooglePreview.value =
        "https://docs.google.com/gview?url=" +
        data.documentLink +
        "&embedded=true";
      documentLinkPreview.value = data.documentLink;
    };

    const downloadDocument = () => {
      const link = document.createElement("a");
      link.href = documentLinkPreview.value;
      link.download = ""; // Set to empty to use the filename from the URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      downloadDocument,
      searchDocuments,
      onViewDocument,
      documentLinkGooglePreview,
      documentLinkPreview,
      dataDocuments,
      dialogPreview,
      dialogLoader,
      page,
      limit,
      search,
    };
  },
};
</script>
