<template>
    <div class="flex">
        <v-btn density="compact" icon="mdi-chevron-left" color="cyan-darken-1" class="mr-2" variant="tonal"
            @click="previousView"></v-btn>
        <span class="font-bold text-xl text-gray-500 title-views">{{ routeParams.name }} - {{ dataUnit.unit_name
            }}</span>
    </div>
    <div class="py-5">
        <div class="flex justify-center w-full">
            <div class="w-[70%] p-5 rounded-lg bg-white shadow-md">
                <p class="font-bold pb-3 text-gray-500"> {{ material.title }} </p>
                <iframe :src="materialLinkGooglePreview" style="width:100%; height:700px;" frameborder="0"></iframe>
                <div class="pt-2">
                    <v-btn variant="outlined" size="small" color="cyan-darken-1">
                        <v-icon icon="mdi-download" ></v-icon>
                        Descargar archivo
                    </v-btn>
                </div>
            </div>
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