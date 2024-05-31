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
                    component: () => import("@/views/student/home/HomeStudentView.vue"),
                },
                {
                    name: "cursos",
                    path: "cursos",
                    component: () => import("@/views/student/courses/CourseView.vue"),
                },
                {
                    name: "cursos/detalles",
                    path: "cursos/detalles/:id",
                    props: true,
                    component: () => import("@/views/student/courses/DetailsView.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        if (!hasIdParam) {
                            // Si no se proporciona un :id, redirige a otra vista, por ejemplo, "acceso-denegado"
                            next({ name: 'cursos' });
                        } else {
                            next(); // Continuar con la navegación si se proporciona un :id
                        }
                    },
                },
                {
                    name: "cursos/examen",
                    path: "cursos/examen",
                    component: () => import("@/views/student/courses/ExamView.vue")
                },
                {
                    name: "resultado/curso/examen",
                    path: "resultado/curso/examen/:id",
                    props: true,
                    component: () => import("@/views/student/courses/evaluation/ResultCourseEvaluation.vue"),
                    beforeEnter: (to, from, next) => {
                        const hasIdParam = to.params.id;
                        if (!hasIdParam) {
                            // Si no se proporciona un :id, redirige a otra vista, por ejemplo, "acceso-denegado"
                            next({ name: 'cursos' });
                        } else {
                            next(); // Continuar con la navegación si se proporciona un :id
                        }
                    },
                },
                {
                    name: "dashboard_admin",
                    path: "dashboard_admin",
                    component: () => import("@/views/administrator/DashboardView.vue"),
                },
                {
                    name: "sedes",
                    path: "sedes",
                    component: () => import("@/views/administrator/CampusView.vue")
                },
                {
                    name: "universidades",
                    path: "universidades",
                    component: () => import("@/views/administrator/UniversitiesView.vue")
                },
                {
                    name: "profesores",
                    path: "profesores",
                    component: () => import("@/views/administrator/TeachersView.vue")
                },
                {
                    name: "alumnos",
                    path: "alumnos",
                    component: () => import("@/views/administrator/StudentsView.vue")
                },
                {
                    name: "cursosadmin",
                    path: "cursosadmin",
                    component: () => import("@/views/administrator/CourseView.vue")
                }
            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/login/LoginView.vue")
        }
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


