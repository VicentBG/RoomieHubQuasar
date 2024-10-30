<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Lista de Compras RoomieHub</h2>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <q-input v-model="search" filled label="Buscar artículo" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-btn color="positive" icon="add" label="Añadir Artículo" @click="showNewItemForm" class="full-width" />
      </div>
    </div>

    <q-list bordered separator>
      <q-item v-for="item in filteredItems" :key="item.id" :class="{ 'bg-grey-2': item.purchased }">
        <q-item-section avatar>
          <q-checkbox v-model="item.purchased" @update:model-value="updateItemStatus(item)" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="{ 'text-strike': item.purchased }">{{ item.name }}</q-item-label>
          <q-item-label caption>
            Cantidad: {{ item.quantity }} {{ item.unit }} | Añadido por: {{ item.addedBy }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round color="primary" icon="edit" @click="editItem(item)" />
          <q-btn flat round color="negative" icon="delete" @click="deleteItem(item)" />
        </q-item-section>
      </q-item>
    </q-list>

    <AddCompra v-model="showNewItemFormDialog" :edit-item="itemToEdit" @item-created="addNewItem"
      @item-updated="updateItem" />

    <q-dialog v-model="deleteConfirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">¿Estás seguro de que quieres eliminar este artículo?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" color="negative" @click="confirmDeleteItem" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import AddCompra from 'components/AddCompra.vue'

const $q = useQuasar()

const shoppingItems = ref([
  {
    id: 1,
    name: 'Leche',
    quantity: 2,
    unit: 'litros',
    addedBy: 'Ana García',
    purchased: false
  },
  {
    id: 2,
    name: 'Pan',
    quantity: 1,
    unit: 'barra',
    addedBy: 'Carlos Rodríguez',
    purchased: true
  },
  {
    id: 3,
    name: 'Huevos',
    quantity: 12,
    unit: 'unidades',
    addedBy: 'Elena Martínez',
    purchased: false
  }
])

const search = ref('')
const showNewItemFormDialog = ref(false)
const itemToEdit = ref(null)
const deleteConfirmDialog = ref(false)
const itemToDelete = ref(null)

const filteredItems = computed(() => {
  return shoppingItems.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const showNewItemForm = () => {
  itemToEdit.value = null
  showNewItemFormDialog.value = true
}

const addNewItem = (newItem) => {
  shoppingItems.value.push({
    id: shoppingItems.value.length + 1,
    ...newItem,
    purchased: false
  })
  $q.notify({
    color: 'positive',
    message: 'Artículo añadido a la lista',
    icon: 'check'
  })
}

const editItem = (item) => {
  itemToEdit.value = { ...item }
  showNewItemFormDialog.value = true
}

const updateItem = (updatedItem) => {
  const index = shoppingItems.value.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    shoppingItems.value[index] = updatedItem
    $q.notify({
      color: 'positive',
      message: 'Artículo actualizado',
      icon: 'check'
    })
  }
}

const updateItemStatus = (item) => {
  const index = shoppingItems.value.findIndex(i => i.id === item.id)
  if (index !== -1) {
    shoppingItems.value[index] = { ...item }
    $q.notify({
      color: 'info',
      message: item.purchased ? 'Artículo marcado como comprado' : 'Artículo desmarcado',
      icon: 'info'
    })
  }
}

const deleteItem = (item) => {
  itemToDelete.value = item
  deleteConfirmDialog.value = true
}

const confirmDeleteItem = () => {
  shoppingItems.value = shoppingItems.value.filter(item => item.id !== itemToDelete.value.id)
  $q.notify({
    color: 'negative',
    message: 'Artículo eliminado de la lista',
    icon: 'delete'
  })
  itemToDelete.value = null
}
</script>

<style lang="scss" scoped>
.text-strike {
  text-decoration: line-through;
}
</style>
