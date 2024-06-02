<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">{{ routeParams.name }}</h1>
    <div class="py-5">
        <v-expansion-panels multiple>
            <v-expansion-panel v-for="unit in dataUnits" :key="unit.unit_id">
                <v-expansion-panel-title>{{ unit.unit_name }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="p-4">
                        <v-alert color="#F6F6F6" density="compact" class="mb-2" v-for="item in unit.materials"
                            :key="item.material_id">
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
                                    <v-btn color="cyan-darken-1" text="Ver documento" size="small"
                                        variant="tonal"></v-btn>
                                </div>
                            </div>
                        </v-alert>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script>
import { findAllCourseUnitsApi } from "@/api/student/CourseService";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import store from '@/store';

export default ({
    setup() {
        const route = useRoute();
        const routeParams = ref(route.params);
        const dataUnits = ref([]);

        onMounted(async () => {
            await readyData();
        })

        const extensionList = {
            'doc': 'WORD',
            'docx': 'WORD',
            'xlsx': 'EXCEL',
            'pdf': 'PDF',
        };

        const readyData = async () => {
            findAllCourseUnitsApi(store.state.token, routeParams.value.id)
                .then(response => {
                    dataUnits.value = response.data.data
                })
        }

        const typeExtension = (extension) => {
            return extensionList[extension] || "DOC"
        }

        return {
            typeExtension,
            routeParams,
            dataUnits
        };
    }
})
</script>