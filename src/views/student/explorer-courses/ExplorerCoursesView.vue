<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Explorar Cursos</h1>
    <div class="py-5">
        <div class="container-cards-courses gap-4">
            <template v-for="course in dataCourses" :key="course.course_id">
                <CardCourseExplorer :title="course.title" :description="course.description" />
            </template>
        </div>
    </div>
</template>
<script>
import { findAllExplorerCoursesApi } from '@/api/student/ExplorerCoursesService';
import CardCourseExplorer from '@/components/explorer-courses/CardCourseExplorer.vue';
import { onMounted, ref } from 'vue';
import store from '@/store';

export default ({
    components: { CardCourseExplorer },
    setup() {
        const dataCourses = ref([]);

        onMounted(async () => {
            await readyData();
        })

        const readyData = () => {
            findAllExplorerCoursesApi(store.state.token)
                .then(response => {
                    dataCourses.value = response.data.data;
                })
        }

        return {
            dataCourses
        }
    }
})
</script>
<style scoped>
.container-cards-courses {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}


</style>