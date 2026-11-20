<template>
    <div class="container">
        <div class="row">
            <router-link :to="{ name: 'AddWorkouts' }" class="btn btn-primary mt-5  ">+ Add Workout</router-link>
            <div class="col my-5">
                <h1 class="text-center text-primary py-1">
                    Workouts
                </h1>
                <p class="text-center">
                    Select a workout
                </p>
            </div>
        </div>

        <div class="row g-4">
            <template
                v-for="workout in workoutData"
                :key="workout._id"
            >
                <WorkoutComponent :workoutData="workout"
                @workout-deleted="$emit('workout-deleted', $event)" 
                @workout-completed="$emit('workout-completed', $event)" />

            </template>
        </div>
    </div>
</template>

<script setup>
import WorkoutComponent from './WorkoutComponent.vue';
defineProps({
    workoutData: {
        type: Array,
        required: true,
    },
});
</script>