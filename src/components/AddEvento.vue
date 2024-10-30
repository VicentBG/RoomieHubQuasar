<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Crear Nuevo Evento</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="eventForm.title" label="Título del evento"
            :rules="[val => !!val || 'El título es requerido']" />

          <q-input v-model="eventForm.date" label="Fecha del evento" type="date"
            :rules="[val => !!val || 'La fecha es requerida']" />

          <q-input v-model="eventForm.location" label="Ubicación"
            :rules="[val => !!val || 'La ubicación es requerida']" />

          <q-input v-model="eventForm.description" label="Descripción" type="textarea"
            :rules="[val => !!val || 'La descripción es requerida']" />

          <q-input v-model="eventForm.image" label="URL de la imagen"
            :rules="[val => !!val || 'La URL de la imagen es requerida']" />

          <q-input v-model="eventForm.organizer" label="Organizador"
            :rules="[val => !!val || 'El organizador es requerido']" />

          <div>
            <q-btn label="Cancelar" color="negative" v-close-popup />
            <q-btn label="Crear Evento" type="submit" color="primary" class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'event-created'])

const $q = useQuasar()

const showDialog = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  showDialog.value = newValue
})

watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue)
})

const eventForm = ref({
  title: '',
  date: '',
  location: '',
  description: '',
  image: '',
  organizer: ''
})

const onSubmit = () => {
  emit('event-created', { ...eventForm.value })
  $q.notify({
    color: 'positive',
    message: 'Evento creado exitosamente',
    icon: 'check'
  })
  showDialog.value = false
  resetForm()
}

const resetForm = () => {
  eventForm.value = {
    title: '',
    date: '',
    location: '',
    description: '',
    image: '',
    organizer: ''
  }
}
</script>
