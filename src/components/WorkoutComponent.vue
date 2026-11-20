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
					<router-link :to="{path: `/workouts/${workoutData._id}`}" class="btn btn-outline-primary btn-block">View Workout</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, watch } from "vue";

export default {
	props: {
		workoutData: Object,
	},
	setup({ workoutData }) {
		
		return {
			workoutData,
			
		};
	},
	
};

</script>
