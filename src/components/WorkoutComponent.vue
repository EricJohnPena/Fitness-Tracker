<template>
	<div class="col-md-4 mb-4">
		<div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
			<img
				class="card-img-top"
				:src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(workoutData.name)}`"
				:alt="workoutData.name"
			/>
			<div class="card-body d-flex flex-column p-3">
				<div class="d-flex justify-content-between align-items-start gap-2 mb-2">
					<h5 class="card-title fw-semibold mb-0">
						{{ workoutData.name }}
					</h5>
					<span
						class="badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2 text-capitalize"
						:class="
							isCompleted
								? 'bg-success-subtle text-success border border-success-subtle'
								: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle'
						"
					>
						<i :class="isCompleted ? 'bi bi-check-circle-fill' : 'bi bi-hourglass-split'"></i>
						{{ workoutData.status || "pending" }}
					</span>
				</div>

				<p class="card-text text-muted small mb-4">
					<i class="bi bi-clock me-1"></i>
					{{ workoutData.duration }}
				</p>

				<div class="mt-auto d-grid gap-2">
					<button
						v-if="!isCompleted"
						type="button"
						class="btn btn-success"
						:disabled="isUpdating"
						@click="completeWorkout"
					>
						<i class="bi bi-check2-circle me-1"></i>
						{{ isUpdating ? "Updating..." : "Mark as Completed" }}
					</button>

					<div class="d-flex gap-2">
						<router-link
							:to="{ path: `/editWorkout/${workoutData._id}` }"
							class="btn btn-outline-primary flex-fill"
						>
							<i class="bi bi-pencil-square me-1"></i>Edit
						</router-link>
						<button
							type="button"
							class="btn btn-outline-danger flex-fill"
							@click="deleteWorkout"
						>
							<i class="bi bi-trash me-1"></i>Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";
import api from "../api.js";
import { Notyf } from "notyf";

const notyf = new Notyf();

const props = defineProps({
	workoutData: Object,
});

const emit = defineEmits(["workout-deleted", "workout-completed"]);

const isUpdating = ref(false);

const isCompleted = computed(
	() => props.workoutData.status?.toLowerCase() === "completed"
);

async function completeWorkout() {
	isUpdating.value = true;
	try {
		// Verify this endpoint matches your Express route
		await api.patch(`/workouts/completeWorkoutStatus/${props.workoutData._id}`);

		notyf.success("Workout marked as completed!");
		emit("workout-completed", props.workoutData._id);
	} catch (e) {
		console.error(e);
		notyf.error("Failed to update workout status");
	} finally {
		isUpdating.value = false;
	}
}

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