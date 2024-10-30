<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea' }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="taskForm.title" label="Título de la tarea"
            :rules="[val => !!val || 'El título es requerido']" />

          <q-input v-model="taskForm.description" label="Descripción" type="textarea"
            :rules="[val => !!val || 'La descripción es requerida']" />

          <q-input v-model="taskForm.assignedTo" label="Asignado a"
            :rules="[val => !!val || 'El responsable es requerido']" />

          <q-input v-model="taskForm.dueDate" label="Fecha límite" type="date"
            :rules="[val => !!val || 'La fecha límite es requerida']" />

          <div>
            <q-btn label="Cancelar" color="negative" v-close-popup />
            <q-btn :label="isEditing ? 'Actualizar Tarea' : 'Crear Tarea'" type="submit" color="primary"
              class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  editTask: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'task-created', 'task-updated'])

const $q = useQuasar()

const showDialog = ref(props.modelValue)
const isEditing = computed(() => !!props.editTask)

const taskForm = ref({
  title: '',
  description: '',
  assignedTo: '',
  dueDate: ''
})

watch(() => props.modelValue, (newValue) => {
  showDialog.value = newValue
})

watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.editTask, (newValue) => {
  if (newValue) {
    taskForm.value = { ...newValue }
  } else {
    resetForm()
  }
})

const onSubmit = () => {
  if (isEditing.value) {
    emit('task-updated', { ...taskForm.value })
    $q.notify({
      color: 'positive',
      message: 'Tarea actualizada exitosamente',
      icon: 'check'
    })
  } else {
    emit('task-created', { ...taskForm.value })
    $q.notify({
      color: 'positive',
      message: 'Tarea creada exitosamente',
      icon: 'check'
    })
  }
  showDialog.value = false
  resetForm()
}

const resetForm = () => {
  taskForm.value = {
    title: '',
    description: '',
    assignedTo: '',
    dueDate: ''
  }
}
</script>
