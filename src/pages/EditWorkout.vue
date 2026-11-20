<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notyf } from "notyf";
import api from "../api.js";

const route = useRoute();
const router = useRouter();
const notyf = new Notyf();

const id = route.params.id;
const name = ref("");
const duration = ref("");
const isLoading = ref(true);

onBeforeMount(async () => {
    try {
        const { data } = await api.get("/workouts/getMyWorkouts");

        const workouts = Array.isArray(data) ? data : data.workouts || [];

        const workout = workouts.find((item) => item._id === id);

        if (workout) {
            name.value = workout.name;
            duration.value = workout.duration;
        } else {
            notyf.error("Workout not found");
        }
    } catch (e) {
        console.error(e);
        notyf.error("Failed to load workout");
    } finally {
        isLoading.value = false;
    }
});

async function handleSubmit() {
    try {
        await api.patch(`/workouts/updateWorkout/${id}`, {
            name: name.value,
            duration: duration.value,
        });

        notyf.success("Workout updated");
        router.push("/workouts");
    } catch (e) {
        console.error(e);
        notyf.error("Update failed");
    }
}
</script>

<template>
    <div class="container">
        <h1 class="my-5 text-primary text-center">Edit Workout</h1>
        <!-- Show loading message while fetching data -->
        <div v-if="isLoading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <form v-else v-on:submit.prevent="handleSubmit" class="col-md-6 mx-auto">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="name" />
            </div>
            <div class="mb-3">
                <label class="form-label">Duration</label>
                <input type="text" class="form-control" v-model="duration" />
            </div>
            <button type="submit" class="btn btn-primary">Update Workout</button>
        </form>
    </div>
</template>