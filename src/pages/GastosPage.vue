<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Gastos de RoomieHub</h2>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <q-card class="bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Total de Gastos</div>
            <div class="text-h4">{{ totalExpenses.toFixed(2) }} €</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-btn color="positive" icon="add" label="Nuevo Gasto" @click="showNewExpenseForm" class="full-width" />
      </div>
    </div>
    <q-table :rows="expenses" :columns="columns" row-key="id" :pagination="initialPagination">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="amount" :props="props">
            {{ props.row.amount.toFixed(2) }} €
          </q-td>
          <q-td key="category" :props="props">
            <q-chip :color="getCategoryColor(props.row.category)" text-color="white">
              {{ props.row.category }}
            </q-chip>
          </q-td>
          <q-td key="paidBy" :props="props">
            {{ props.row.paidBy }}
          </q-td>
          <q-td key="date" :props="props">
            {{ formatDate(props.row.date) }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn flat round color="primary" icon="edit" @click="editExpense(props.row)" />
            <q-btn flat round color="negative" icon="delete" @click="deleteExpense(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <AddGasto v-model="showNewExpenseFormDialog" :edit-expense="expenseToEdit" @expense-created="addNewExpense"
      @expense-updated="updateExpense" />

    <q-dialog v-model="deleteConfirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">¿Estás seguro de que quieres eliminar este gasto?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" color="negative" @click="confirmDeleteExpense" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { date } from 'quasar'
import AddGasto from 'components/AddGasto.vue'

const expenses = ref([
  {
    id: 1,
    description: 'Compra semanal',
    amount: 75.50,
    category: 'Alimentación',
    paidBy: 'Ana García',
    date: '2023-05-15'
  },
  {
    id: 2,
    description: 'Factura de luz',
    amount: 60.00,
    category: 'Servicios',
    paidBy: 'Carlos Rodríguez',
    date: '2023-05-10'
  },
  {
    id: 3,
    description: 'Netflix',
    amount: 11.99,
    category: 'Entretenimiento',
    paidBy: 'Elena Martínez',
    date: '2023-05-05'
  }
])

const columns = [
  { name: 'description', required: true, label: 'Descripción', align: 'left', field: 'description', sortable: true },
  { name: 'amount', required: true, label: 'Cantidad', align: 'right', field: 'amount', sortable: true },
  { name: 'category', required: true, label: 'Categoría', align: 'center', field: 'category', sortable: true },
  { name: 'paidBy', required: true, label: 'Pagado por', align: 'left', field: 'paidBy', sortable: true },
  { name: 'date', required: true, label: 'Fecha', align: 'left', field: 'date', sortable: true },
  { name: 'actions', required: true, label: 'Acciones', align: 'center', field: 'actions' }
]

const initialPagination = {
  sortBy: 'date',
  descending: true,
  page: 1,
  rowsPerPage: 10
}

const showNewExpenseFormDialog = ref(false)
const expenseToEdit = ref(null)
const deleteConfirmDialog = ref(false)
const expenseToDelete = ref(null)

const totalExpenses = computed(() => {
  return expenses.value.reduce((total, expense) => total + expense.amount, 0)
})

const formatDate = (dateString) => {
  return date.formatDate(dateString, 'DD/MM/YYYY')
}

const getCategoryColor = (category) => {
  const colors = {
    'Alimentación': 'green',
    'Servicios': 'blue',
    'Entretenimiento': 'purple',
    'Otros': 'orange'
  }
  return colors[category] || 'grey'
}

const showNewExpenseForm = () => {
  expenseToEdit.value = null
  showNewExpenseFormDialog.value = true
}

const addNewExpense = (newExpense) => {
  expenses.value.push({
    id: expenses.value.length + 1,
    ...newExpense
  })
}

const editExpense = (expense) => {
  expenseToEdit.value = { ...expense }
  showNewExpenseFormDialog.value = true
}

const updateExpense = (updatedExpense) => {
  const index = expenses.value.findIndex(e => e.id === updatedExpense.id)
  if (index !== -1) {
    expenses.value[index] = updatedExpense
  }
}

const deleteExpense = (expense) => {
  expenseToDelete.value = expense
  deleteConfirmDialog.value = true
}

const confirmDeleteExpense = () => {
  expenses.value = expenses.value.filter(e => e.id !== expenseToDelete.value.id)
  expenseToDelete.value = null
}
</script>
