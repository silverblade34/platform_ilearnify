<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Usuarios</h1>
    <div class="py-5">
        <TableUsersVue :desserts="dataUsers" @view-details="onViewDetails" />
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
import { findAllUsersApi } from '@/api/administrator/UserService';
import { onMounted, ref } from 'vue';
import store from '@/store';
import { validateError } from '@/helpers/Validators';
import TableUsersVue from '@/components/admin-users/TableUsers.vue';
import { useRouter } from 'vue-router';
import { findLogisticRegressionStudentId } from '@/api/administrator/PredictiveService';
import { updloadPredictiveStudentApi } from '@/api/student/StudentService';

export default ({
    components: { TableUsersVue },
    setup() {
        const dataUsers = ref([]);
        const dialogLoader = ref(false);
        const router = useRouter();

        onMounted(async () => {
            dialogLoader.value = true;
            await readyData();
            dialogLoader.value = false;
        })

        const readyData = async () => {
            await findAllUsersApi(store.state.token)
                .then(response => {
                    dataUsers.value = response.data.data ? response.data.data : [];
                })
                .catch(error => {
                    dialogLoader.value = false;
                    validateError(error.response);
                })
        }

        const onViewDetails = (userId) => {
            router.push(`/predictive_student/${userId.userId}`);
        }

        const uploadPredictive = async () => {
            dialogLoader.value = true;
            await uploadPredictiveUsers()
            dialogLoader.value = false;
        }

        const uploadPredictiveUsers = async () => {
            const batchSize = 10;
            const totalUsers = dataUsers.value.length;

            for (let i = 0; i < totalUsers; i += batchSize) {
                const userBatch = dataUsers.value.slice(i, i + batchSize);

                const promises = userBatch.map(async (user) => {
                    try {
                        const predictiveStudent = await findLogisticRegressionStudentId(user.studentId);
                        const payload = {
                            "studentId": user.studentId,
                            "predictive": predictiveStudent.data
                        };
                        await updloadPredictiveStudentApi(payload);
                    } catch (e) {
                        console.log(`Error con el estudiante ID: ${user.studentId}`);
                        console.log(e);
                    }
                });

                await Promise.all(promises);
            }
        };

        return {
            dataUsers,
            dialogLoader,
            uploadPredictive,
            onViewDetails
        }
    }
})
</script>