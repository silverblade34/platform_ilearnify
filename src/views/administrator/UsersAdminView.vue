<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Usuarios</h1>
    <div class="py-5">
        <TableUsersVue :desserts="dataUsers" />
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

export default ({
    components: { TableUsersVue },
    setup() {
        const dataUsers = ref([]);
        const dialogLoader = ref(false);

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

        return {
            dataUsers,
            dialogLoader
        }
    }
})
</script>