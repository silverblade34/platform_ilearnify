<template>
    <div class="flex justify-between items-center">
        <div class="flex">
            <v-btn density="compact" icon="mdi-chevron-left" color="cyan-darken-1" class="mr-2" variant="tonal"
                @click="previousView"></v-btn>
            <h1 class="font-bold text-xl text-gray-500 title-views">Administrar - {{ routeParams.name }}</h1>
        </div>
        <ModalCreateUnitVue @create-item="onCreateItem" />
    </div>
    <div class="py-5">
        <v-expansion-panels multiple>
            <v-expansion-panel v-for="unit in dataUnits" :key="unit.unit_id">
                <v-expansion-panel-title> <span class="font-bold"> {{ unit.unit_name }} </span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="p-4">
                        <div class="flex justify-end gap-2 pb-3">
                            <ModalCreateMaterialVue :unitId="unit.unit_id" @create-item="onCreateMaterial" />
                            <ModalCreateExamenVue :unitId="unit.unit_id" :courseId="routeParams.id"
                                @create-item="onCreateExam" />
                        </div>
                        <v-alert color="#F6F6F6" density="compact" class="mb-2" v-for="item in unit.materials"
                            border="start" :key="item.material_id">
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
                                <div>

                                </div>
                            </div>
                        </v-alert>

                        <v-alert color="cyan-lighten-5" density="compact" class="mb-2" v-for="item in unit.exams"
                            border="start" :key="item.exam_id" border-color="cyan-darken-1">
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
                                <div>

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
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { findAllCourseUnitsApi } from "@/api/student/CourseService";
import ModalCreateUnitVue from "@/components/admin-course/ModalCreateUnit.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, getCurrentInstance } from "vue";
import store from '@/store';
import { createUnitApi } from "@/api/administrator/UnitService";
import { basicAlert } from "@/helpers/SweetAlert";
import { validateError } from "@/helpers/Validators";
import ModalCreateMaterialVue from "@/components/admin-course/ModalCreateMaterial.vue";
import { createMaterialApi } from "@/api/administrator/MaterialService";
import { createExamApi } from "@/api/administrator/ExamService";
import ModalCreateExamenVue from "@/components/admin-course/ModalCreateExamen.vue";

export default ({
    components: { ModalCreateUnitVue, ModalCreateMaterialVue, ModalCreateExamenVue },
    setup() {
        const route = useRoute();
        const routeParams = ref(route.params);
        const dataUnits = ref([]);
        const dialogLoader = ref(false);
        const instance = getCurrentInstance();

        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        })

        const extensionList = {
            'doc': 'WORD',
            'docx': 'WORD',
            'xlsx': 'EXCEL',
            'pdf': 'PDF',
        };

        const readyData = async () => {
            await findAllCourseUnitsApi(store.state.token, routeParams.value.id)
                .then(response => {
                    dataUnits.value = response.data.data
                })
        }

        const typeExtension = (extension) => {
            return extensionList[extension] || "DOC"
        }

        const previousView = () => {
            if (instance && instance.proxy && instance.proxy.$router) {
                instance.proxy.$router.go(-1);
            }
        }

        const onCreateMaterial = (data) => {
            dialogLoader.value = true
            const payload = {
                unit_id: data.unitId,
                course_id: routeParams.value.id,
                title: data.title,
                description: data.description,
                file: data.file,
            }
            createMaterialApi(store.state.token, payload)
                .then(response => {
                    dialogLoader.value = false
                    basicAlert(async () => {
                        await readyData();
                    }, 'success', 'Logrado', response.data.message);
                })
                .catch(error => {
                    validateError(error.response);
                })
        }

        const onCreateExam = (data) => {
            dialogLoader.value = true
            createExamApi(store.state.token, data)
                .then(response => {
                    dialogLoader.value = false
                    basicAlert(async () => {
                        await readyData();
                    }, 'success', 'Logrado', response.data.message);
                })
                .catch(error => {
                    validateError(error.response);
                })
        }

        const onCreateItem = (data) => {
            dialogLoader.value = true
            const payload = {
                course_id: routeParams.value.id,
                unit_name: data.unitName,
            }
            createUnitApi(store.state.token, payload)
                .then(response => {
                    dialogLoader.value = false
                    basicAlert(async () => {
                        await readyData();
                    }, 'success', 'Logrado', response.data.message);
                })
                .catch(error => {
                    validateError(error.response);
                })
        }

        return {
            onCreateMaterial,
            onCreateExam,
            onCreateItem,
            previousView,
            typeExtension,
            dialogLoader,
            routeParams,
            dataUnits
        };
    }
})
</script>