<template>
    <div class="container my-5" style="max-width: 500px">
        <h1 class="text-center">Add New Workout</h1>
        <form v-on:submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="workoutNameInput" class="form-label">Workout Name</label>
                <input type="text" class="form-control" id="workoutNameInput" v-model="name" />
            </div>
            <div class="mb-3">
                <label for="workoutDuration" class="form-label">Duration</label>
                <textarea
                    class="form-control"
                    id="workoutDuration"
                    v-model="duration"
                    rows="5"
                ></textarea>
            </div>
            <button type="submit" class="btn btn-primary" v-if="isEnabled">Add Workout</button>
            <button type="submit" class="btn btn-danger" disabled v-else>Add Workout</button>
        </form>
    </div>
</template>

<script setup>
    import { ref, watch } from "vue";
    import { Notyf } from "notyf";
    import { useRouter } from "vue-router";
    import { useGlobalStore } from "../stores/user";
    import api from "../api";

    const notyf = new Notyf();
    const router = useRouter();
    const { user } = useGlobalStore();

    const name = ref("");
    const duration = ref("");
    const isEnabled = ref(false);

    async function handleSubmit() {
        const workout = {
            name: name.value,
            duration: duration.value
        };

        try {
            const response = await api.post("/workouts/addWorkout", workout);

            if (response.status === 201) {
                notyf.success(response.data.message);

                router.push({ path: "/workouts" });
            } else {
                notyf.error(response.data.message);
            }
        } catch (error) {
            if (error.response.status === 409) {
                notyf.error(error.response.data.message);
            } else {
                console.error(error.response.data.message);
                notyf.error("Error adding workout. Please contact administrator.");
            }
        }
    }

    watch([name,duration], (currentValue, oldValue) => {
        if (currentValue.every((input) => input !== "")) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

</script>