<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Tareas de RoomieHub</h2>
    <q-btn color="primary" icon="add" label="Nueva Tarea" @click="showNewTaskForm" class="q-mb-md" />
    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="task.id" :class="{ 'bg-grey-2': task.completed }">
        <q-item-section avatar>
          <q-checkbox v-model="task.completed" @update:model-value="updateTaskStatus(task)" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="{ 'text-strike': task.completed }">{{ task.title }}</q-item-label>
          <q-item-label caption>
            Asignado a: {{ task.assignedTo }} | Fecha límite: {{ formatDate(task.dueDate) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round color="primary" icon="info" @click="showTaskDetails(task)" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="taskDetailsDialog">
      <q-card v-if="selectedTask" style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ selectedTask.title }}</div>
        </q-card-section>
        <q-card-section>
          <p><strong>Descripción:</strong> {{ selectedTask.description }}</p>
          <p><strong>Asignado a:</strong> {{ selectedTask.assignedTo }}</p>
          <p><strong>Fecha límite:</strong> {{ formatDate(selectedTask.dueDate) }}</p>
          <p><strong>Estado:</strong> {{ selectedTask.completed ? 'Completada' : 'Pendiente' }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
          <q-btn flat label="Editar" color="secondary" @click="editTask(selectedTask)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <AddTarea v-model="showNewTaskFormDialog" :edit-task="taskToEdit" @task-created="addNewTask"
      @task-updated="updateTask" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { date } from 'quasar'
import AddTarea from 'components/AddTarea.vue'

const tasks = ref([
  {
    id: 1,
    title: 'Limpiar la cocina',
    description: 'Limpiar la encimera, fregar los platos y barrer el suelo',
    assignedTo: 'Ana García',
    dueDate: '2023-05-20',
    completed: false
  },
  {
    id: 2,
    title: 'Comprar suministros',
    description: 'Comprar papel higiénico, detergente y bolsas de basura',
    assignedTo: 'Carlos Rodríguez',
    dueDate: '2023-05-22',
    completed: false
  },
  {
    id: 3,
    title: 'Pagar la factura de internet',
    description: 'Transferir el dinero para la factura mensual de internet',
    assignedTo: 'Elena Martínez',
    dueDate: '2023-05-25',
    completed: true
  }
])

const taskDetailsDialog = ref(false)
const selectedTask = ref(null)
const showNewTaskFormDialog = ref(false)
const taskToEdit = ref(null)

const formatDate = (dateString) => {
  return date.formatDate(dateString, 'DD/MM/YYYY')
}

const showTaskDetails = (task) => {
  selectedTask.value = task
  taskDetailsDialog.value = true
}

const showNewTaskForm = () => {
  taskToEdit.value = null
  showNewTaskFormDialog.value = true
}

const addNewTask = (newTask) => {
  tasks.value.push({
    id: tasks.value.length + 1,
    ...newTask,
    completed: false
  })
}

const updateTaskStatus = (task) => {
  const index = tasks.value.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasks.value[index] = { ...task }
  }
}

const editTask = (task) => {
  taskToEdit.value = { ...task }
  showNewTaskFormDialog.value = true
  taskDetailsDialog.value = false
}

const updateTask = (updatedTask) => {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
}
</script>

<style lang="scss" scoped>
.text-strike {
  text-decoration: line-through;
}
</style>
