<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ isEditing ? 'Editar Artículo' : 'Añadir Nuevo Artículo' }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="itemForm.name" label="Nombre del artículo"
            :rules="[val => !!val || 'El nombre es requerido']" />

          <q-input v-model.number="itemForm.quantity" label="Cantidad" type="number" :rules="[
            val => !!val || 'La cantidad es requerida',
            val => val > 0 || 'La cantidad debe ser mayor que 0'
          ]" />

          <q-input v-model="itemForm.unit" label="Unidad" :rules="[val => !!val || 'La unidad es requerida']" />

          <q-input v-model="itemForm.addedBy" label="Añadido por"
            :rules="[val => !!val || 'El nombre de quien añade es requerido']" />

          <div>
            <q-btn label="Cancelar" color="negative" v-close-popup />
            <q-btn :label="isEditing ? 'Actualizar Artículo' : 'Añadir Artículo'" type="submit" color="primary"
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
  editItem: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'item-created', 'item-updated'])

const $q = useQuasar()

const showDialog = ref(props.modelValue)
const isEditing = computed(() => !!props.editItem)

const itemForm = ref({
  name: '',
  quantity: 1,
  unit: '',
  addedBy: ''
})

watch(() => props.modelValue, (newValue) => {
  showDialog.value = newValue
})

watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.editItem, (newValue) => {
  if (newValue) {
    itemForm.value = { ...newValue }
  } else {
    resetForm()
  }
})

const onSubmit = () => {
  if (isEditing.value) {
    emit('item-updated', { ...itemForm.value })
    $q.notify({
      color: 'positive',
      message: 'Artículo actualizado exitosamente',
      icon: 'check'
    })
  } else {
    emit('item-created', { ...itemForm.value })
    $q.notify({
      color: 'positive',
      message: 'Artículo añadido exitosamente',
      icon: 'check'
    })
  }
  showDialog.value = false
  resetForm()
}

const resetForm = () => {
  itemForm.value = {
    name: '',
    quantity: 1,
    unit: '',
    addedBy: ''
  }
}
</script>
