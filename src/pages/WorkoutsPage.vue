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
        const workouts = reactive({ data: [] });
        const isLoading = ref(false); // 1. Initialize the loading state

        const globalStore = useGlobalStore();

        watch(
            () => globalStore.user.token,
            async (token) => {
                //if (!token) return; // Prevent unnecessary calls if the token is empty

                isLoading.value = true; // 2. Turn on the spinner
                
                try {
                    await globalStore.getUserDetails(token);
                    let { data } = await api.get("/workouts/getMyWorkouts");
                    workouts.data = data;
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                } finally {
                    isLoading.value = false; // 3. Turn off the spinner when done (or if it fails)
                }
            },
            { immediate: true },
        );

        return {
            workouts,
            globalStore,
            isLoading, 
        };
    },
};
</script>

<template>
    <!-- Show loading message while fetching data -->
    <div v-if="isLoading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    
    <template v-else>
        
        <UserView
            :workoutData="workouts.data.workouts"
        />
       
    </template>
</template>