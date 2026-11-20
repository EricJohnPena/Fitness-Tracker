<template>
    <!-- Use userStore.user.email to keep reactivity alive -->
    <div class="container-fluid" v-if="userStore.user.email">
        <h1 class="my-5 pt-3 text-primary text-center">Profile Page</h1> 
        <!-- Show loading message while fetching data -->
        <div v-if="isLoading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5">

                <ul>
                    <li>Email: {{ profile.email }}</li>
                    
                </ul>
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onBeforeMount, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/user.js';
    import api from '../api.js';
    import { Notyf } from 'notyf';

    const notyf = new Notyf();
    
    const userStore = useGlobalStore(); 
    
    const profile = ref({}); 
    const router = useRouter();
    const isLoading = ref(true);
    
    const fetchProfile = async () => {
        try {
            const response = await api.get("users/details");
            
            profile.value = response.data.user || response.data || {};
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to load profile data.";
            notyf.error(errorMessage);
        }finally{
            isLoading.value = false;
        }
    }
    onBeforeMount(() => {
        fetchProfile();
        
        if(!userStore.user.email){
            router.push({path: '/login'})
        }
    })
    
</script>