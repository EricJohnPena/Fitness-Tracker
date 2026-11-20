<script>
import api from "../api.js";
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/user.js";
import UserView from "../components/UserView.vue";

export default {
    components: {
        UserView,
    },
    setup() {
        const workouts = reactive({ data: { workouts: [] } });
        const isLoading = ref(false);

        const router = useRouter();
        const globalStore = useGlobalStore();

        watch(
            () => globalStore.user.token,
            async (token) => {
                const activeToken = token || localStorage.getItem("token");

                if (!activeToken) {
                    router.replace("/login");
                    return;
                }

                isLoading.value = true;

                try {
                    await globalStore.getUserDetails(activeToken);
                    let { data } = await api.get("/workouts/getMyWorkouts");
                    workouts.data = data;
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem("token");
                        router.replace("/login");
                    }
                } finally {
                    isLoading.value = false;
                }
            },
            { immediate: true },
        );

        function handleWorkoutCompleted(completedId) {
            if (workouts.data && workouts.data.workouts) {
                const target = workouts.data.workouts.find(
                    (workout) => workout._id === completedId,
                );
                if (target) {
                    target.status = "completed";
                }
            }
        }

        function handleWorkoutDeleted(deletedId) {
            if (workouts.data && workouts.data.workouts) {
                workouts.data.workouts = workouts.data.workouts.filter(
                    (workout) => workout._id !== deletedId,
                );
            }
        }

        return {
            workouts,
            globalStore,
            isLoading,
            handleWorkoutDeleted,
            handleWorkoutCompleted,
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
            @workout-completed="handleWorkoutCompleted"
        />
    </template>
</template>