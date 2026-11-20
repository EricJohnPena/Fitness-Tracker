import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'notyf/notyf.min.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';

import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import HomePage from './pages/HomePage.vue';
import WorkoutsPage from './pages/WorkoutsPage.vue';
import AddWorkout from './pages/AddWorkout.vue';
import EditWorkout from './pages/EditWorkout.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: 'Home',
            component: HomePage
        },
        {
            path: "/login",
            name: 'Login',
            component: LoginPage
        },
        {
            path: "/register",
            name: 'Register',
            component: RegisterPage
        },
        {
            path: "/workouts",
            name: 'Workouts',
            component: WorkoutsPage
        },
        {
            path: "/addWorkouts",
            name: 'AddWorkouts',
            component: AddWorkout
        },
        {
            path: "/editWorkout/:id",
            name: 'EditWorkout',
            component: EditWorkout
        }
    ]
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');