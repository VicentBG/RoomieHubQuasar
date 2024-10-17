<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Calendario general</h2>
    <div class="col q-col-gutter-md justify-center">
      <div class="col-12 col-md-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Filtros</div>
            <q-option-group
              v-model="selectedTypes"
              :options="typeOptions"
              type="checkbox"
              color="primary"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <navigation-bar
          @today="onToday"
          @prev="onPrev"
          @next="onNext"
        />
      </div>
      <div class="col-12 col-md-9">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          :events="filteredEvents"
          @click-date="onDateClick"
          @click-event="onEventClick"
        >
          <template #day="{ scope: { timestamp } }">
            <template v-for="event in eventsMap[timestamp.date]" :key="event.id">
              <q-badge
                :color="getEventColor(event)"
                :text-color="event.textColor || 'white'"
                class="q-mb-xs cursor-pointer"
                style="width: 100%;"
                @click.stop="onEventClick({ event })"
              >
                <q-icon :name="getEventIcon(event)" size="xs" class="q-mr-xs" />
                {{ event.title }}
              </q-badge>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>

    <q-dialog v-model="eventDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ selectedEvent ? selectedEvent.title : 'Detalles del evento' }}</div>
        </q-card-section>

        <q-card-section v-if="selectedEvent">
          <p><strong>Fecha:</strong> {{ formatDate(selectedEvent.date) }}</p>
          <p><strong>Hora:</strong> {{ formatTime(selectedEvent.time) }}</p>
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
import { ref, computed, useTemplateRef, onMounted } from 'vue'
import { date } from 'quasar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import { QCalendarMonth, today, parseTimestamp, addToDate } from '@quasar/quasar-ui-qcalendar'
import navigationBar from 'components/NavigationBar.vue'
import { useRoomieStore } from 'src/stores/roomie-store'

const roomieStore = useRoomieStore()
const events = computed(() => roomieStore.events)

defineOptions({
  name: 'MainLayout'
})

const calendarRef = useTemplateRef('calendar')

const selectedDate = ref(today())
const eventDialog = ref(false)
const selectedEvent = ref(null)
const selectedTypes = ref(['tarea', 'pago', 'evento'])

const typeOptions = [
  { label: 'Tareas', value: 'tarea' },
  { label: 'Pagos', value: 'pago' },
  { label: 'Eventos', value: 'evento' }
]


const eventsMap = computed(() => {
  const map = {}
  if (events.value.length > 0) {
    events.value.forEach(event => {
      if (filteredEvents.value.includes(event)) (map[ event.date ] = (map[ event.date ] || [])).push(event)
    })
  }
  console.log(map)
  return map
})

const filteredEvents = computed(() => {
  const filtered = events.value.filter(event => selectedTypes.value.includes(event.type))
  console.log(filtered); // Verificar qué eventos se filtran
  return filtered
})

const getEventColor = (event) => {
  return event.bgcolor
}

const getEventIcon = (event) => {
  switch (event.type) {
    case 'tarea':
      return 'task'
    case 'pago':
      return 'euro'
    case 'evento':
      return 'event'
    default:
      return 'event_note'
  }
}

const onDateClick = (data) => {
  console.log('Fecha seleccionada:', data.scope)
}

const onEventClick = (data) => {
  selectedEvent.value = data.event
  eventDialog.value = true
}

const onToday = () => {
  calendarRef.value.moveToToday()
}

const onPrev = () => {
  calendarRef.value.prev()
}

const onNext = () => {
  calendarRef.value.next()
}


const formatDate = (dateString) => {
  return date.formatDate(dateString, 'DD/MM/YYYY')
}

const formatTime = (timeString) => {
  return date.formatDate(`2024-01-01T${timeString}`, 'HH:mm')
}

onMounted(() => {
  events.value = roomieStore.events
  console.log(events); // Verificar qué eventos se filtran
})

</script>

<style lang="scss">
.q-calendar-month {
  .q-badge {
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>