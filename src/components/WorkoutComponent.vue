<template>
	<div class="col-md-4">
		<div id="WorkoutCard" class="card p-2 h-100">
			<img 
                class="card-img-top"
                :src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(workoutData.name)}`"
                :alt="workoutData.name"
            >
			<div class="card-body">
				<h4 class="card-title">
					{{ workoutData.name }}
				</h4>
				<p class="card-text mt-3">
					{{ workoutData.duration }}
				</p>

				<div class="mt-auto text-center d-grid">
					<router-link :to="{path: `/editWorkout/${workoutData._id}`}" class="btn btn-outline-primary btn-block">Edit Workout</router-link>
					<button type="button" class="btn btn-danger mt-3" @click="deleteWorkout">
						Delete Workout
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import api from "../api.js";
import { Notyf } from "notyf";

const notyf = new Notyf();

const props = defineProps({
	workoutData: Object,
});

const emit = defineEmits(["workout-deleted"]);

async function deleteWorkout() {
	if (!confirm("Are you sure you want to delete this workout?")) return;
	try {
		await api.delete(`/workouts/deleteWorkout/${props.workoutData._id}`);

		notyf.success("Workout deleted");
		emit("workout-deleted", props.workoutData._id);
	} catch (e) {
		console.error(e);
		notyf.error("Failed to delete workout");
	}
}
</script>
