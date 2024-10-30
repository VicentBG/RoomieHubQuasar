<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ isEditing ? 'Editar Gasto' : 'Crear Nuevo Gasto' }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="expenseForm.description" label="Descripción"
            :rules="[val => !!val || 'La descripción es requerida']" />

          <q-input v-model.number="expenseForm.amount" label="Cantidad" type="number" step="0.01" prefix="€" :rules="[
            val => !!val || 'La cantidad es requerida',
            val => val > 0 || 'La cantidad debe ser mayor que 0'
          ]" />

          <q-select v-model="expenseForm.category" :options="categoryOptions" label="Categoría"
            :rules="[val => !!val || 'La categoría es requerida']" />

          <q-input v-model="expenseForm.paidBy" label="Pagado por"
            :rules="[val => !!val || 'El pagador es requerido']" />

          <q-input v-model="expenseForm.date" label="Fecha" type="date"
            :rules="[val => !!val || 'La fecha es requerida']" />

          <div>
            <q-btn label="Cancelar" color="negative" v-close-popup />
            <q-btn :label="isEditing ? 'Actualizar Gasto' : 'Crear Gasto'" type="submit" color="primary"
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
  editExpense: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'expense-created', 'expense-updated'])

const $q = useQuasar()

const showDialog = ref(props.modelValue)
const isEditing = computed(() => !!props.editExpense)

const categoryOptions = [
  'Alimentación',
  'Servicios',
  'Entretenimiento',
  'Otros'
]

const expenseForm = ref({
  description: '',
  amount: 0,
  category: '',
  paidBy: '',
  date: ''
})

watch(() => props.modelValue, (newValue) => {
  showDialog.value = newValue
})

watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.editExpense, (newValue) => {
  if (newValue) {
    expenseForm.value = { ...newValue }
  } else {
    resetForm()
  }
})

const onSubmit = () => {
  if (isEditing.value) {
    emit('expense-updated', { ...expenseForm.value })
    $q.notify({
      color: 'positive',
      message: 'Gasto actualizado exitosamente',
      icon: 'check'
    })
  } else {
    emit('expense-created', { ...expenseForm.value })
    $q.notify({
      color: 'positive',
      message: 'Gasto creado exitosamente',
      icon: 'check'
    })
  }
  showDialog.value = false
  resetForm()
}

const resetForm = () => {
  expenseForm.value = {
    description: '',
    amount: 0,
    category: '',
    paidBy: '',
    date: ''
  }
}
</script>
