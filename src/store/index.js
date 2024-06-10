import { createStore } from "vuex";

const localStorageKey = 'DJsdfg-2352LLDSF-dfg-jsah33454-//4415gfsfd';

export default createStore({
    state: {
        isAuthenticated: false,
        role: '',
        usuario: '',
        studentId: '',
        token: ''
    },
    getters: {

    },
    mutations: {
        setIsAuthenticated(state, value) {
            state.isAuthenticated = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setRole(state, value) {
            state.role = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setUsuario(state, value) {
            state.usuario = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setStudentId(state, value) {
            state.studentId = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        setToken(state, value) {
            state.token = value;
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        },
        // Agregar una mutación para inicializar el estado desde localStorage al cargar la página
        initializeStateFromLocalStorage(state) {
            const storedState = localStorage.getItem(localStorageKey);
            if (storedState) {
                Object.assign(state, JSON.parse(storedState));
            }
        }
    },
    actions: {
        initializeStateFromLocalStorage({ commit }) {
            commit('initializeStateFromLocalStorage');
        }
    }
})