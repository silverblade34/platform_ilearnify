<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Biblioteca</h1>
    <div class="py-5">
        <div class="container-cards-courses gap-4" v-if="dataDocuments.length > 0">
            <template v-for="document in dataDocuments" :key="document.library_id">
                <CardDocumentVue :title="document.document_title" :description="document.document_description" :extension="document.extension"/>
            </template>
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
import { findAllUsersDocumentApi } from '@/api/student/LibraryService';
import CardDocumentVue from '@/components/library/CardDocument.vue';
import { onMounted, ref } from "vue";
import store from '@/store';
import { validateError } from '@/helpers/Validators';

export default ({
    components: { CardDocumentVue },
    setup() {
        const dataDocuments = ref([]);
        const page = ref(1);
        const limit = ref(20);
        const search = ref("");
        const dialogLoader = ref(false);

        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        })

        const readyData = async () => {
            findAllUsersDocumentApi(store.state.token, page.value, limit.value, search.value)
                .then(response => {
                    dataDocuments.value = response.data.documents;
                })
                .catch(error => {
                    dialogLoader.value = false;
                    validateError(error.response);
                })
        }

        return {
            dataDocuments,
            dialogLoader,
            page,
            limit,
            search
        }
    }
})
</script>
<style scoped>
.container-cards-courses {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    /* 5 columnas por defecto */
    gap: 1rem;
    /* Puedes ajustar el valor de gap según tus necesidades */
}

@media (max-width: 1400px) {
    .container-cards-courses {
        grid-template-columns: repeat(4, 1fr);
        /* 4 columnas cuando el ancho sea menor a 1200px */
    }
}
</style>
