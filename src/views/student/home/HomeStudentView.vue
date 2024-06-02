<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Cursos</h1>
    <div class="py-5 h-full">
        <template v-if="dataCourses.length > 0">
            <div class="grid grid-cols-5 gap-4">
                <template v-for="course in dataCourses" :key="course.course_id">
                    <CardCourse :title="course.title" :description="course.description" />
                </template>
            </div>
        </template>
        <template v-else>
            <div class="w-full h-full flex justify-center items-center">
                <div>
                    <p>Aún no estas registrado en ningún curso</p>
                    <div class="flex justify-center pt-4">
                        <v-btn color="cyan-darken-1" @click="sendPassword" size="small">Explorar cursos</v-btn>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import store from '@/store';
import { findAllEnrolledCoursesHomeApi } from '@/api/student/HomeService';
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
            findAllEnrolledCoursesHomeApi(store.state.token)
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