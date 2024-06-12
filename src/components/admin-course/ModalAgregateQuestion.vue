<template>
    <v-btn size="small" class="text-none" color="cyan-darken-1" @click="dialog = true">
        Agregar pregunta</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-toolbar>
                <span class="px-4 w-full text-center text-cyan-500 font-bold title_views">AGREGAR PREGUNTA</span>
            </v-toolbar>
            <v-card-text>
                <v-col cols="12">
                    <v-textarea variant="outlined" label="Descripción" prepend-inner-icon="mdi-text-box-plus"
                        color="cyan-lighten-1" v-model="description" rows="2"></v-textarea>
                    <v-radio-group v-model="optionAnswer">
                        <div class="flex items-center pb-3">
                            <v-radio value="1" color="cyan"></v-radio>
                            <v-text-field variant="outlined" label="Opción respuesta 1" prepend-inner-icon="mdi-text"
                                color="cyan-lighten-1" v-model="answer1" class="w-full" hide-details></v-text-field>
                        </div>
                        <div class="flex items-center pb-3">
                            <v-radio value="2" color="cyan"></v-radio>
                            <v-text-field variant="outlined" label="Opción respuesta 2" prepend-inner-icon="mdi-text"
                                color="cyan-lighten-1" v-model="answer2" class="w-full" hide-details></v-text-field>
                        </div>
                        <div class="flex items-center pb-3">
                            <v-radio value="3" color="cyan"></v-radio>
                            <v-text-field variant="outlined" label="Opción respuesta 3" prepend-inner-icon="mdi-text"
                                color="cyan-lighten-1" v-model="answer3" class="w-full" hide-details></v-text-field>
                        </div>
                        <div class="flex items-center pb-3">
                            <v-radio value="4" color="cyan"></v-radio>
                            <v-text-field variant="outlined" label="Opción respuesta 4" prepend-inner-icon="mdi-text"
                                color="cyan-lighten-1" v-model="answer4" class="w-full" hide-details></v-text-field>
                        </div>
                    </v-radio-group>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan-grey-lighten-2" variant="tonal" @click="dialog = false">
                    Cancelar
                </v-btn>
                <v-btn color="cyan-lighten-1" variant="tonal" @click="createItem">
                    Agregar pregunta
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { ref } from 'vue';

export default {
    props: {
        unitId: Number
    },
    emits: ['create-item'],
    setup(_, { emit }) {
        const dialog = ref(false);
        const description = ref('');
        const answer1 = ref('');
        const answer2 = ref('');
        const answer3 = ref('');
        const answer4 = ref('');
        const optionAnswer = ref("");

        const createItem = () => {
            emit('create-item', {
                question_text: description.value,
                answers: [
                    { answer_text: answer1.value, is_correct: optionAnswer.value == 1 ? true : false },
                    { answer_text: answer2.value, is_correct: optionAnswer.value == 2 ? true : false },
                    { answer_text: answer3.value, is_correct: optionAnswer.value == 3 ? true : false },
                    { answer_text: answer4.value, is_correct: optionAnswer.value == 4 ? true : false },
                ]
            })
            description.value = optionAnswer.value = answer1.value = answer2.value = answer3.value = answer4.value = "";
            dialog.value = false;
        }

        return {
            dialog,
            optionAnswer,
            description,
            answer1,
            answer2,
            answer3,
            answer4,
            createItem
        }
    }
}
</script>