<template>
  <q-dialog v-model="showDialog" persistent maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="column full-height">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Crear Nuevo Piso RoomieHub</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup aria-label="Cerrar" />
      </q-card-section>

      <q-card-section class="q-pa-md overflow-auto">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <!-- Información básica -->
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.name" label="Nombre del piso"
                :rules="[val => !!val || 'El nombre es requerido']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.address" label="Dirección"
                :rules="[val => !!val || 'La dirección es requerida']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.postalCode" label="Código Postal"
                :rules="[val => !!val || 'El código postal es requerido']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.city" label="Ciudad"
                :rules="[val => !!val || 'La ciudad es requerida']" />
            </div>

            <!-- Características -->
            <div class="col-12 col-md-6">
              <q-input v-model.number="apartmentForm.bedrooms" type="number" label="Número de habitaciones"
                :rules="[val => val > 0 || 'Debe tener al menos una habitación']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model.number="apartmentForm.bathrooms" type="number" label="Número de baños"
                :rules="[val => val > 0 || 'Debe tener al menos un baño']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.area" label="Área (m²)" type="number"
                :rules="[val => val > 0 || 'El área debe ser mayor que 0']" />
            </div>
            <div class="col-12 col-md-6">
              <q-select v-model="apartmentForm.furnished" :options="['Sí', 'No']" label="Amueblado" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.internet" label="Internet" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="apartmentForm.heating" label="Calefacción" />
            </div>
            <div class="col-12 col-md-6">
              <q-select v-model="apartmentForm.airConditioning" :options="['Sí', 'No']" label="Aire acondicionado" />
            </div>

            <!-- Plano del piso -->
            <div class="col-12">
              <q-file v-model="apartmentForm.floorPlan" label="Plano del piso" accept="image/*">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>

            <!-- Servicios cercanos -->
            <div class="col-12">
              <q-input v-model="newService.name" label="Nombre del servicio cercano" class="q-mr-sm">
                <template v-slot:append>
                  <q-btn round dense flat icon="add" @click="addNearbyService" />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-list bordered separator>
                <q-item v-for="(service, index) in apartmentForm.nearbyServices" :key="index">
                  <q-item-section>
                    <q-item-label>{{ service.name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat round dense color="negative" icon="delete" @click="removeNearbyService(index)" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Descripción -->
            <div class="col-12">
              <q-input v-model="apartmentForm.description" type="textarea" label="Descripción del piso"
                :rules="[val => !!val || 'La descripción es requerida']" />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Crear Piso" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'create-apartment'])

const showDialog = ref(props.modelValue)

const apartmentForm = ref({
  name: '',
  address: '',
  postalCode: '',
  city: '',
  bedrooms: 1,
  bathrooms: 1,
  area: 0,
  furnished: 'No',
  internet: '',
  heating: '',
  airConditioning: 'No',
  floorPlan: null,
  nearbyServices: [],
  description: ''
})

const newService = ref({
  name: ''
})

const addNearbyService = () => {
  if (newService.value.name) {
    apartmentForm.value.nearbyServices.push({ name: newService.value.name })
    newService.value.name = ''
  }
}

const removeNearbyService = (index) => {
  apartmentForm.value.nearbyServices.splice(index, 1)
}

const onSubmit = () => {
  // Aquí iría la lógica para crear el nuevo piso
  console.log('Nuevo piso:', apartmentForm.value)

  $q.notify({
    color: 'positive',
    message: 'Piso creado exitosamente',
    icon: 'check'
  })

  emit('create-apartment', apartmentForm.value)
  showDialog.value = false
}

// Observar cambios en el prop modelValue y actualizar showDialog
watch(() => props.modelValue, (newValue) => {
  showDialog.value = newValue
})

// Emitir cambios en showDialog al componente padre
watch(showDialog, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
