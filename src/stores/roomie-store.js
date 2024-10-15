import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRoomieStore = defineStore('roomie',() => {

    /* state */
    const users = ref([])
    const logged = ref(false)

    /* actions */
    function log() {
        logged.value = true
    }

    function logout() {
        logged.value = false
    }

    function addUser(user) {
        users.value.push(user)  
    }

    return { 
        /* state */
        users, 
        logged, 

        /* actions */
        log, 
        logout, 
        addUser 
    }
});
