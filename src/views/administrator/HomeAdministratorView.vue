<template>
    <div class="flex justify-between items-center">
        <span class="font-bold text-xl text-gray-500 title-views">Administrar cursos</span>
        <ModalCreateCourseVue @create-item="onCreateItem" />
    </div>
    <div class="py-5">
        <div class="container-cards-courses gap-4">
            <template v-for="course in dataCourses" :key="course.course_id">
                <CardCourseAdministrator :title="course.title" :description="course.description" :id="course.course_id"
                    @see-more="onSeeMore" @edit-course="onEditCourse" />
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
    <ModalEditCourseVue :itemEdit="courseEdit" :openModal="dialogEdit" @cancel-item="dialogEdit = false"
        @edit-item="onEditItem" />
</template>
<script>
import { findAllCoursesHomeApi } from '@/api/administrator/HomeService';
import { createCourseApi, updateCourseApi } from '@/api/administrator/CourseService';
import CardCourseAdministrator from '@/components/home/CardCourseAdministrator.vue';
import { onMounted, ref } from 'vue';
import store from '@/store';
import { validateError } from '@/helpers/Validators';
import { useRouter } from 'vue-router';
import ModalCreateCourseVue from '@/components/home/ModalCreateCourse.vue';
import { basicAlert } from '@/helpers/SweetAlert';
import ModalEditCourseVue from '@/components/admin-course/ModalEditCourse.vue';

export default ({
    components: { CardCourseAdministrator, ModalCreateCourseVue, ModalEditCourseVue },
    setup() {
        const dataCourses = ref([]);
        const dialogLoader = ref(false);
        const courseEdit = ref({});
        const router = useRouter();
        const dialogEdit = ref(false);

        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        })

        const readyData = async () => {
            await findAllCoursesHomeApi(store.state.token)
                .then(response => {
                    dataCourses.value = response.data.data;
                })
                .catch(error => {
                    validateError(error.response);
                })
        }

        const onSeeMore = (data) => {
            router.push(`/course_admin/${data.id}/${data.name}`);
        }

        const onEditCourse = (data) => {
            dialogEdit.value = true;
            courseEdit.value = dataCourses.value.find(course => course.course_id == data.id);
        }

        const onCreateItem = (data) => {
            dialogLoader.value = true
            createCourseApi(store.state.token, data)
                .then(response => {
                    dialogLoader.value = false
                    basicAlert(async () => {
                        await readyData();
                    }, 'success', 'Logrado', response.data.message);
                })
                .catch(error => {
                    dialogLoader.value = false
                    validateError(error.response);
                })
        }

        const onEditItem = async (data) => {
            dialogEdit.value = false
            dialogLoader.value = true
            if (data.title != "" && data.description != "") {
                await updateCourseApi(store.state.token, data, courseEdit.value.course_id)
                    .then(response => {
                        dialogLoader.value = false
                        basicAlert(() => {
                            readyData()
                        }, 'success', 'Logrado', response.data.message)
                    })
                    .catch(error => {
                        dialogLoader.value = false
                        validateError(error.response);
                    })
            } else {
                dialogLoader.value = false
                basicAlert(() => { }, 'warning', 'Error', "Los campos no deben estar vacios")
            }
        }

        return {
            onEditItem,
            onCreateItem,
            onEditCourse,
            onSeeMore,
            dialogEdit,
            courseEdit,
            dialogLoader,
            dataCourses
        }
    }
})
</script>
