<template>
    <v-btn size="small" class="text-none" color="cyan-darken-1" @click="dialog = true"><v-icon icon="mdi-plus"></v-icon>
        Agregar examen</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-cyan-500 font-bold title_views">AGREGAR EXAMEN</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-text-field variant="outlined" label="Titulo" prepend-inner-icon="mdi-text" color="cyan-lighten-1"
                        v-model="title"></v-text-field>
                    <div class="pb-3">
                        <ModalAgregateQuestionVue @create-item="onCreateQuestion" />
                    </div>
                    <div class="max-h-[20rem] overflow-y-auto">
                        <v-alert :text="question.question_text" v-for="question in questions"
                            :key="question.question_text" class="mb-1"></v-alert>
                    </div>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan-grey-lighten-2" variant="tonal" @click="dialog = false">
                    Cancelar
                </v-btn>
                <v-btn color="cyan-lighten-1" variant="tonal" @click="createItem">
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref } from 'vue';
import ModalAgregateQuestionVue from './ModalAgregateQuestion.vue';

export default {
    props: {
        unitId: Number,
        courseId: Number
    },
    components: { ModalAgregateQuestionVue },
    emits: ['create-item'],
    setup(props, { emit }) {
        const dialog = ref(false);
        const title = ref('');
        const questions = ref([]);

        const createItem = () => {
            emit('create-item', {
                course_id: props.courseId,
                unit_id: props.unitId,
                title: title.value,
                questions: questions.value
            })
            title.value = "";
            questions.value = [];
            dialog.value = false;
        }

        const onCreateQuestion = (data) => {
            questions.value.push(data);
        }

        return {
            dialog,
            title,
            questions,
            createItem,
            onCreateQuestion
        }
    }
}
</script>