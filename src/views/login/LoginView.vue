<template>
    <div class="flex w-full h-screen overflow-y-hidden">
        <div class="left">
            <div class="block w-full">
                <img src="../../assets/login/logo_ilearnify.png" class="animation a6 pb-10"
                    style="margin: 0 auto 10px;width: 220px">
                <div class="flex justify-center">
                    <FormLoginVue @validate-credentials="onValidateCredentials" @show-register="onShowRegister"
                        @show-forgotpassword="onShowForgotPassword" v-if="typeContent == 'LOGIN'" />
                    <FormRegisterVue v-else-if="typeContent == 'REGISTER'" @show-login="onShowLogin"
                        @create-student="onCreateStudent" />

                    <FormForgotPasswordVue v-else-if="typeContent == 'FORGOT_PASSWORD'" @show-login="onShowLogin"
                        @send-password="onSendPassword" />
                </div>
            </div>
        </div>
        <div id="right">
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
import { loginApi, recoverPasswordApi } from '@/api/login/LoginService';
import { basicAlert } from '@/helpers/SweetAlert';
import store from '@/store';
import { useRouter } from 'vue-router';
import FormLoginVue from "@/components/login/FormLogin.vue";
import FormRegisterVue from "@/components/login/FormRegister.vue";
import FormForgotPasswordVue from "@/components/login/FormForgotPassword.vue";
import { ref } from 'vue';
import { studentRegisterApi } from '@/api/student/StudentService';
import { validateError } from '@/helpers/Validators';

export default ({
    components: { FormLoginVue, FormRegisterVue, FormForgotPasswordVue },
    setup() {
        const router = useRouter();
        const typeContent = ref("LOGIN");
        const dialogLoader = ref(false);

        const onShowRegister = () => {
            typeContent.value = "REGISTER";
        }

        const onShowLogin = () => {
            typeContent.value = "LOGIN";
        }

        const onShowForgotPassword = () => {
            typeContent.value = "FORGOT_PASSWORD";
        }

        const onCreateStudent = (data) => {

            studentRegisterApi(store.state.token, data)
                .then(response => {
                    console.log(response.data)
                    typeContent.value = "LOGIN";
                    basicAlert(() => { }, 'success', 'Logrado', 'Se ha registrado el estudiante correctamente');
                })
                .catch(error => {
                    validateError(error.response);
                })
        }

        const onValidateCredentials = async (data) => {
            await loginApi(data.username, data.password)
                .then(response => {
                    if (response.data.status == true) {
                        const user = response.data.data.user;
                        store.commit('setUsuario', user.username);
                        store.commit('setRole', user.role);
                        store.commit('setStudentId', user.student_id);
                        store.commit('setToken', response.data.data.token);
                        store.commit('setIsAuthenticated', true);
                        if (user.role == "student") {
                            router.push('/home_student');
                        } else if (user.role == "admin") {
                            router.push('/home_admin');
                        }
                    } else {
                        basicAlert(() => { }, 'warning', 'Credenciales incorrectas', 'Verifique su usuario y contraseña')
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            basicAlert(() => { }, 'warning', 'Credenciales incorrectas', 'Verifique su usuario y contraseña');
                        } else if (error.response.status === 400) {
                            basicAlert(() => { }, 'error', 'Solicitud incorrecta', 'Los datos proporcionados no son válidos');
                        } else {
                            basicAlert(() => { }, 'error', 'Error de conexión', 'Hubo un problema de conexión');
                        }
                    } else {
                        console.log(error);
                        basicAlert(() => { }, 'error', 'Error de conexión', 'Hubo un problema de conexión');
                    }
                })
        }

        const onSendPassword = (data) => {
            dialogLoader.value = true;
            recoverPasswordApi(data.username)
                .then(response => {
                    dialogLoader.value = false;
                    basicAlert(() => { }, 'success', 'Logrado', response.data.message);
                })
                .catch(error => {
                    dialogLoader.value = false;
                    validateError(error.response);
                })
        }

        return {
            onShowForgotPassword,
            onValidateCredentials,
            onSendPassword,
            onCreateStudent,
            onShowRegister,
            onShowLogin,
            typeContent,
            dialogLoader
        }
    },
})
</script>

<style scoped lang="scss">
.left {
    font-family: 'Poppins', sans-serif;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    -webkit-animation-name: left;
    animation-name: left;
    -webkit-animation-duration: .8s;
    animation-duration: .8s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-delay: .5s;
    animation-delay: .5s;
}

#right {
    width: 100%;
    margin: 0;
    flex: 1;
    background-color: rgba(72, 128, 150, 0.418);
    transition: 1s;
    background-image: url('../../assets/login/portada_ilearnify.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-position: center center;
}

#right:before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: rgba(38, 116, 212, 0.6);
}

.header>h2 {
    margin: 0;
    color: #535699;
    text-align: center;
}

.header>p {
    margin-top: 10px;
    font-weight: normal;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    line-height: 1.5;
    text-align: justify;
}


.animation {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.a6 {
    -webkit-animation-delay: 1.8s;
    animation-delay: 1.3s;
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 30%, 0);
        transform: translate3d(0, 30%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 30%, 0);
        transform: translate3d(0, 30%, 0);
    }

    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@-webkit-keyframes left {
    0% {
        opacity: 0;
        width: 0;
    }

    100% {
        opacity: 1;
        padding: 20px 40px;
        width: 500px;
    }
}

@keyframes left {
    0% {
        opacity: 0;
        width: 0;
    }

    100% {
        opacity: 1;
        padding: 20px 40px;
        width: 500px;
    }
}
</style>