import { defineStore } from "pinia";
import { ref } from "vue";
import {
  roomiesData,
  eventsData,
  pisoData,
  tasksData,
  expensesData,
  shoppingItemsData,
} from "./data.js";

export const useRoomieStore = defineStore("roomie", () => {
  /* state */
  const roomies = ref([
    {
      email: "1234@1234.com",
      password: "1234vbg",
    },
  ]);
  const logged = ref(false);
  const roomiesExamples = ref(roomiesData);
  const piso = ref(pisoData);
  const events = ref(eventsData);
  const tasks = ref(tasksData);
  const expenses = ref(expensesData);
  const shoppingItems = ref(shoppingItemsData);

  /* actions */
  function log() {
    logged.value = true;
  }

  function logout() {
    logged.value = false;
  }

  function addRoomie(roomie) {
    roomies.value.push(roomie);
  }

  function addEvent(event) {
    events.value.push(event);
  }

  return {
    /* state */
    roomies,
    logged,
    roomiesExamples,
    piso,
    events,
    tasks,
    expenses,
    shoppingItems,

    /* actions */
    log,
    logout,
    addRoomie,
    addEvent,
  };
});
