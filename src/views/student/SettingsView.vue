<template>
    <v-container>
        <!-- Título -->
        <h1 class="font-bold text-xl text-gray-500 title-views">Perfil</h1>

        <!-- Imagen del Estudiante -->
        <v-row justify="center">
            <v-col cols="12" sm="4">
                <v-avatar size="150">
                    <img src="https://static.vecteezy.com/system/resources/previews/020/274/235/non_2x/student-icon-for-your-website-design-logo-app-ui-free-vector.jpg"
                        alt="Estudiante" />
                </v-avatar>
            </v-col>
        </v-row>

        <!-- Formulario para editar datos -->
        <v-form v-model="isValid">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.first_name" label="Nombre" :disabled="!isEditing" />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.last_name" label="Apellido" :disabled="!isEditing" />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.birthdate" label="Fecha de Nacimiento" type="date"
                        :disabled="!isEditing" />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.phone" label="Teléfono" :disabled="!isEditing" />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="student.district"
                        :items="districts" label="Distrito" :disabled="!isEditing"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select color="cyan-darken-1" density="compact" variant="outlined" v-model="student.gender"
                        :items="genders" label="Género" :disabled="!isEditing"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select color="cyan-darken-1" density="compact" variant="outlined"
                        v-model="student.economic_level" :items="socioeconomicLevels" label="Nivel socioeconomico"
                        :disabled="!isEditing"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select color="cyan-darken-1" density="compact" variant="outlined"
                        v-model="student.access_platform" :items="accessPlatforms"
                        label="Uso de la plataforma diaria estimado" :disabled="!isEditing"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.username" label="Usuario" :disabled="!isEditing" />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.password" label="Contraseña" :disabled="!isEditing" />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="student.email" label="Correo Electrónico" :disabled="!isEditing" />
                </v-col>
            </v-row>

            <!-- Botones para Editar y Guardar -->
            <v-row justify="center" class="mt-4 gap-3">
                <v-btn color="primary" @click="toggleEdit">{{ isEditing ? 'Cancelar' : 'Editar' }}</v-btn>
                <v-btn color="success" :disabled="!isEditing" @click="saveStudent">Guardar</v-btn>
            </v-row>
        </v-form>
    </v-container>
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
import { ref, reactive, onMounted } from 'vue';
import { studentByIdApi, studentUpdateApi } from '@/api/student/StudentService';
import store from '@/store';

export default {
    setup() {
        const districts = [
            "Lima",
            "Ate",
            "Barranco",
            "Breña",
            "Comas",
            "Chorrillos",
            "El Agustino",
            "Jesús María",
            "La Molina",
            "La Victoria",
            "Lince",
            "Magdalena del Mar",
            "Miraflores",
            "Pueblo Libre",
            "Puente Piedra",
            "Rimac",
            "San Borja",
            "San Isidro",
            "Independencia",
            "San Luis",
            "San Miguel",
            "Santiago de Surco",
            "Surquillo",
            "Santa Rosa",
            "Los Olivos",
            "Cieneguilla",
            "San Bartolo",
            "Punta Negra",
            "Punta Hermosa",
            "Pucusana",
            "Carabayllo",
            "Chaclacayo",
            "Lurigancho",
            "Lurín",
            "Villa El Salvador",
            "Ancón",
            "Santa Anita"
        ];
        const genders = [
            "Masculino",
            "Femenino",
            "Otro"
        ];

        const grades = [
            "1", "2", "3", "4", "5"
        ]

        const accessPlatforms = [
            "1h - 2h",
            "2h - 4h",
            "4h - 6h",
            "+ 6h",
        ];

        const socioeconomicLevels = [
            "Bajo",
            "Medio",
            "Alto"
        ];

        const student = reactive({
            first_name: '',
            last_name: '',
            birthdate: '',
            phone: '',
            district: '',
            gender: '',
            password: '',
            economic_level: '',
            access_platform: '',
            username: '',
            email: ''
        });
        const dialogLoader = ref(false);
        const isEditing = ref(false);  // Inicialmente en modo no edición
        const isValid = ref(true);

        onMounted(async () => {
            dialogLoader.value = true;
            await fetchStudent();
            dialogLoader.value = false;
        });

        const fetchStudent = async () => {
            const userResponse = await studentByIdApi(store.state.token, store.state.studentId);
            const user = userResponse.data.data;

            student.first_name = user.first_name;
            student.last_name = user.last_name;
            student.birthdate = user.birthdate.slice(0, 10);
            student.phone = user.phone;
            student.district = user.district;
            student.gender = user.gender;
            student.economic_level = user.economic_level;
            student.access_platform = user.access_platform;
            student.username = user.username;
            student.password = user.password;
            student.email = user.email;
        };

        const toggleEdit = () => {
            isEditing.value = !isEditing.value;
        };

        const saveStudent = async () => {
            dialogLoader.value = true;
            console.log('Datos guardados:', student);
            const payload = {
                "firstName": student.first_name,
                "lastName": student.last_name,
                "birthdate": student.birthdate,
                "phone": student.phone,
                "district": student.district,
                "gender": student.gender,
                "username": student.username,
                "email": student.email,
                "password": student.password,
                "socioeconomicLevel": student.economic_level,
                "AccessPlatform": student.access_platform,
            }

            await studentUpdateApi(store.state.token, payload, store.state.studentId)
            await fetchStudent();
            dialogLoader.value = false;
            // Una vez guardado, podrías desactivar el modo de edición
            isEditing.value = false;
        };

        return {
            student,
            isEditing,
            isValid,
            districts,
            dialogLoader,
            socioeconomicLevels,
            grades,
            accessPlatforms,
            genders,
            fetchStudent,
            saveStudent,
            toggleEdit
        };
    }
};
</script>

<style scoped>
.title-views {
    margin-bottom: 20px;
}
</style>