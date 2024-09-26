<template>
    <div class="q-pa-md">
      <h2 class="text-h4 text-primary q-mb-md">Calendario de RoomieHub</h2>
      <q-calendar
        v-model="selectedDate"
        view="month"
        :events="events"
        @click-date="onDateClick"
        @click-event="onEventClick"
      >
        <template #event="{ event }">
          <q-badge
            :color="getEventColor(event)"
            :text-color="event.textColor"
            :label="event.title"
            class="full-width q-pa-xs"
          >
            <q-icon :name="getEventIcon(event)" size="xs" class="q-mr-xs" />
            {{ event.title }}
          </q-badge>
        </template>
      </q-calendar>
  
      <q-dialog v-model="eventDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">{{ selectedEvent ? selectedEvent.title : 'Detalles del evento' }}</div>
          </q-card-section>
  
          <q-card-section v-if="selectedEvent">
            <p><strong>Fecha:</strong> {{ formatDate(selectedEvent.date) }}</p>
            <p><strong>Tipo:</strong> {{ selectedEvent.type }}</p>
            <p><strong>Descripción:</strong> {{ selectedEvent.description }}</p>
            <p v-if="selectedEvent.assignedTo"><strong>Asignado a:</strong> {{ selectedEvent.assignedTo }}</p>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { date } from 'quasar'
  
  const selectedDate = ref(new Date())
  const eventDialog = ref(false)
  const selectedEvent = ref(null)
  
  const events = [
    {
      title: 'Limpiar la cocina',
      date: '2023-05-15',
      type: 'tarea',
      description: 'Limpiar a fondo la cocina, incluyendo el horno y la nevera.',
      assignedTo: 'Ana',
      color: 'orange'
    },
    {
      title: 'Pagar el alquiler',
      date: '2023-05-01',
      type: 'pago',
      description: 'Transferir el dinero del alquiler al propietario.',
      color: 'red'
    },
    {
      title: 'Fiesta de cumpleaños de Carlos',
      date: '2023-05-20',
      type: 'evento',
      description: 'Celebración del cumpleaños de Carlos en el salón común.',
      color: 'green'
    },
    {
      title: 'Comprar suministros',
      date: '2023-05-10',
      type: 'tarea',
      description: 'Comprar papel higiénico, detergente y otros suministros para el piso.',
      assignedTo: 'Elena',
      color: 'blue'
    },
    {
      title: 'Noche de películas',
      date: '2023-05-25',
      type: 'evento',
      description: 'Noche de películas con todos los compañeros de piso.',
      color: 'purple'
    }
  ]
  
  const getEventColor = (event) => {
    switch (event.type) {
      case 'tarea':
        return 'orange'
      case 'pago':
        return 'red'
      case 'evento':
        return 'green'
      default:
        return 'blue'
    }
  }
  
  const getEventIcon = (event) => {
    switch (event.type) {
      case 'tarea':
        return 'assignment'
      case 'pago':
        return 'attach_money'
      case 'evento':
        return 'event'
      default:
        return 'event_note'
    }
  }
  
  const onDateClick = (data) => {
    console.log('Fecha seleccionada:', data.date)
  }
  
  const onEventClick = (data) => {
    selectedEvent.value = data.event
    eventDialog.value = true
  }
  
  const formatDate = (dateString) => {
    return date.formatDate(dateString, 'DD/MM/YYYY')
  }
  </script>
  
  <style lang="scss">
  .q-calendar-month {
    .q-badge {
      cursor: pointer;
      transition: all 0.3s;
  
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  </style>