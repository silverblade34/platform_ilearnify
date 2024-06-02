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


