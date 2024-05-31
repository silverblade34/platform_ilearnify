<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Cursos</h1>
    <div class="py-5">
        <div class="grid grid-cols-5 gap-4">
            <template v-for="course in dataCourses" :key="course.course_id">
                <CardCourse :title="course.title" :description="course.description" />
            </template>
        </div>
    </div>
</template>
<script>
import store from '@/store';
import { findAllCoursesHomeApi } from '@/api/student/HomeService';
import CardCourse from '@/components/home/CardCourse.vue';
import { onMounted, ref } from 'vue';

export default ({
    components: { CardCourse },
    setup() {
        const dataCourses = ref([]);

        onMounted(async () => {
            await readyData();
        })

        const readyData = () => {
            findAllCoursesHomeApi(store.state.token)
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
<style>
.number_card {
    font-family: 'Poppins', sans-serif;
}
</style>