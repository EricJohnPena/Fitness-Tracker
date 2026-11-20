<script>
import api from "../api.js";
import { ref, reactive, watch } from "vue";
import { useGlobalStore } from "../stores/user.js";
import UserView from "../components/UserView.vue";

export default {
    components: {
        UserView
    },
    setup() {
        const workouts = reactive({ data: { workouts: [] } });
        const isLoading = ref(false);

        const globalStore = useGlobalStore();

        watch(
            () => globalStore.user.token,
            async (token) => {
                isLoading.value = true;
                
                try {
                    await globalStore.getUserDetails(token);
                    let { data } = await api.get("/workouts/getMyWorkouts");
                    workouts.data = data;
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                } finally {
                    isLoading.value = false;
                }
            },
            { immediate: true },
        );

        function handleWorkoutDeleted(deletedId) {
            if (workouts.data && workouts.data.workouts) {
                workouts.data.workouts = workouts.data.workouts.filter(
                    (workout) => workout._id !== deletedId
                );
            }
        }

        return {
            workouts,
            globalStore,
            isLoading,
            handleWorkoutDeleted,
        };
    },
};
</script>

<template>
    <div v-if="isLoading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    
    <template v-else>
        <UserView
            :workoutData="workouts.data.workouts"
            @workout-deleted="handleWorkoutDeleted"
        />
    </template>
</template>