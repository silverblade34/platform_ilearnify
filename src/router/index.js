import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
                {
                    name: "home_student",
                    path: "home_student",
                    component: () => import("@/views/student/HomeStudentView.vue"),
                },
                {
                    name: "explorer_courses",
                    path: "explorer_courses",
                    component: () => import("@/views/student/ExplorerCoursesView.vue"),
                },
                {
                    name: "library_student",
                    path: "library_student",
                    component: () => import("@/views/student/LibraryView.vue"),
                },
                {
                    name: "course_student",
                    path: "course_student/:id/:name",
                    component: () => import("@/views/student/CourseStudentView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        const hasNameParam = to.params.name;
                        if (!hasIdParam || !hasNameParam) {
                            next({ name: 'home_student' });
                        } else {
                            next();
                        }
                    },
                },
                {
                    name: "course_student_explorer",
                    path: "course_student_explorer/:id/:name",
                    component: () => import("@/views/student/CourseExplorerStudentView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        const hasNameParam = to.params.name;
                        if (!hasIdParam || !hasNameParam) {
                            next({ name: 'home_student' });
                        } else {
                            next();
                        }
                    },
                },
                {
                    name: "study_material_student",
                    path: "study_material_student/:id/:name/:idUnit/:idMaterial",
                    component: () => import("@/views/student/StudyMaterialView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        const hasNameParam = to.params.name;
                        const hasIdUnitParam = to.params.idUnit;
                        const hasIdMaterialParam = to.params.idMaterial;

                        if (!hasIdParam || !hasNameParam || !hasIdUnitParam || !hasIdMaterialParam) {
                            next({ name: 'home_student' });
                        } else {
                            next();
                        }
                    },
                },
                {
                    name: "home_admin",
                    path: "home_admin",
                    component: () => import("@/views/administrator/HomeAdministratorView.vue"),
                },
                {
                    name: "library_admin",
                    path: "library_admin",
                    component: () => import("@/views/administrator/LibraryAdminView.vue"),
                },
            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/login/LoginView.vue")
        },
    ]
})
// Navigation Guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a la página de inicio de sesión
        next({ name: 'login' });
    } else if (to.name === 'login' && store.state.isAuthenticated) {
        if (store.state.role == "student") {
            next({ name: 'home_student' });
        } else if (store.state.role == "admin") {
            next({ name: 'home_admin' });
        } else {
            next({ name: 'login' });
        }
    } else if (to.path === '/' && store.state.isAuthenticated) {
        // Permitir la navegación
        if (store.state.role == "student") {
            next({ name: 'home_student' });
        } else if (store.state.role == "admin") {
            next({ name: 'home_admin' });
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }

});
export default router;


