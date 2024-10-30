<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Eventos de RoomieHub</h2>
    <q-btn color="primary" icon="add" label="Nuevo Evento" @click="showNewEventForm" class="q-mb-md" />
    <div class="row q-col-gutter-md">
      <div v-for="event in events" :key="event.id" class="col-12 col-sm-6 col-md-4">
        <q-card class="event-card">
          <q-img :src="event.image" :alt="event.title" height="200px">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                No se pudo cargar la imagen
              </div>
            </template>
          </q-img>
          <q-card-section>
            <div class="text-h6">{{ event.title }}</div>
            <div class="text-subtitle2">{{ formatDate(event.date) }}</div>
          </q-card-section>
          <q-card-section>
            <q-icon name="place" /> {{ event.location }}
          </q-card-section>
          <q-card-section>{{ event.description }}</q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Más detalles" @click="showEventDetails(event)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="eventDetailsDialog">
      <q-card v-if="selectedEvent" style="min-width: 350px">
        <q-img :src="selectedEvent.image" :alt="selectedEvent.title" height="200px">
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              No se pudo cargar la imagen
            </div>
          </template>
        </q-img>
        <q-card-section>
          <div class="text-h6">{{ selectedEvent.title }}</div>
          <div class="text-subtitle2">{{ formatDate(selectedEvent.date) }}</div>
        </q-card-section>
        <q-card-section>
          <q-icon name="place" /> {{ selectedEvent.location }}
        </q-card-section>
        <q-card-section>{{ selectedEvent.description }}</q-card-section>
        <q-card-section>
          <q-icon name="person" /> Organizador: {{ selectedEvent.organizer }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <AddEvento v-model="showNewEventFormDialog" @event-created="addNewEvent" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { date } from 'quasar'
import AddEvento from 'components/AddEvento.vue'

const events = ref([
  {
    id: 1,
    title: 'Noche de Películas',
    date: '2023-05-20',
    location: 'Sala común',
    description: 'Maratón de películas de Marvel. ¡Traed palomitas!',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
    organizer: 'Ana García'
  },
  {
    id: 2,
    title: 'Cena de Fin de Exámenes',
    date: '2023-06-15',
    location: 'Terraza',
    description: 'Celebremos el fin de los exámenes con una barbacoa.',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg',
    organizer: 'Carlos Rodríguez'
  },
  {
    id: 3,
    title: 'Torneo de Videojuegos',
    date: '2023-05-28',
    location: 'Sala de estar',
    description: 'Competición amistosa de Mario Kart y Super Smash Bros.',
    image: 'https://cdn.quasar.dev/img/mountains.jpg',
    organizer: 'Elena Martínez'
  }
])

const eventDetailsDialog = ref(false)
const selectedEvent = ref(null)
const showNewEventFormDialog = ref(false)

const formatDate = (dateString) => {
  return date.formatDate(dateString, 'DD/MM/YYYY')
}

const showEventDetails = (event) => {
  selectedEvent.value = event
  eventDetailsDialog.value = true
}

const showNewEventForm = () => {
  showNewEventFormDialog.value = true
}

const addNewEvent = (newEvent) => {
  events.value.push({
    id: events.value.length + 1,
    ...newEvent
  })
}
</script>

<style lang="scss" scoped>
.event-card {
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}
</style>
