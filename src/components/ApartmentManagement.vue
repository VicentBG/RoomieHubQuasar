<template>
  <div>
    <div class="row items-center justify-between q-mb-md">
      <h5 class="text-h5 text-weight-bold q-my-none">Gestión de Pisos</h5>
      <q-input
        v-model="search"
        outlined
        dense
        placeholder="Buscar pisos..."
        style="min-width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- Filters -->
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterStatus"
          outlined
          dense
          :options="statusOptions"
          label="Filtrar por estado"
          clearable
        />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterCity"
          outlined
          dense
          :options="cityOptions"
          label="Filtrar por ciudad"
          clearable
        />
      </div>
    </div>

    <!-- Apartments Grid -->
    <div class="row q-col-gutter-md">
      <div
        v-for="apartment in filteredApartments"
        :key="apartment.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card class="apartment-card">
          <q-img
            :src="apartment.image"
            :ratio="16/9"
          >
            <div class="absolute-top-right q-ma-sm">
              <q-badge
                :color="getStatusColor(apartment.status)"
                :label="apartment.status"
              />
            </div>
          </q-img>

          <q-card-section>
            <div class="text-h6 text-weight-bold">{{ apartment.name }}</div>
            <div class="text-grey-7 q-mt-xs">
              <q-icon name="location_on" size="16px" />
              {{ apartment.address }}, {{ apartment.city }}
            </div>
            <div class="row items-center q-mt-sm">
              <q-icon name="bed" size="20px" class="q-mr-xs" />
              <span class="q-mr-md">{{ apartment.rooms }} hab.</span>
              <q-icon name="bathtub" size="20px" class="q-mr-xs" />
              <span class="q-mr-md">{{ apartment.bathrooms }} baños</span>
              <q-icon name="square_foot" size="20px" class="q-mr-xs" />
              <span>{{ apartment.area }} m²</span>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-caption text-grey-7">Propietario</div>
            <div class="text-weight-medium">{{ apartment.owner }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-if="apartment.status === 'Pendiente'"
              flat
              color="positive"
              label="Aprobar"
              icon="check_circle"
              @click="approveApartment(apartment)"
            />
            <q-btn
              v-if="apartment.status === 'Pendiente'"
              flat
              color="negative"
              label="Rechazar"
              icon="cancel"
              @click="rejectApartment(apartment)"
            />
            <q-btn
              flat
              color="primary"
              label="Editar"
              icon="edit"
              @click="editApartment(apartment)"
            />
            <q-btn
              flat
              color="negative"
              icon="delete"
              @click="deleteApartment(apartment)"
            >
              <q-tooltip>Eliminar piso</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Edit Apartment Dialog -->
    <q-dialog v-model="showEditDialog" persistent maximized transition-show="slide-up">
      <q-card>
        <q-bar class="bg-primary text-white">
          <q-space />
          <div class="text-h6">Editar Piso</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>

        <q-card-section class="q-pa-lg">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="editingApartment.name"
                label="Nombre del Piso"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="editingApartment.status"
                :options="['Activo', 'Pendiente', 'Rechazado', 'Suspendido']"
                label="Estado"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="editingApartment.address"
                label="Dirección"
                outlined
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="editingApartment.rooms"
                label="Habitaciones"
                type="number"
                outlined
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="editingApartment.bathrooms"
                label="Baños"
                type="number"
                outlined
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="editingApartment.area"
                label="Área (m²)"
                type="number"
                outlined
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn flat label="Guardar Cambios" color="primary" @click="saveApartment" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const search = ref('')
const filterStatus = ref(null)
const filterCity = ref(null)
const showEditDialog = ref(false)
const editingApartment = ref({})

const statusOptions = ['Activo', 'Pendiente', 'Rechazado', 'Suspendido']
const cityOptions = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla']

const apartments = ref([
  {
    id: 1,
    name: 'Piso Luminoso Centro',
    address: 'Calle Mayor 123',
    city: 'Madrid',
    rooms: 3,
    bathrooms: 2,
    area: 85,
    status: 'Activo',
    owner: 'Ana Martínez',
    image: '/placeholder.svg?height=300&width=400'
  },
  {
    id: 2,
    name: 'Apartamento Estudiantes',
    address: 'Av. Universidad 45',
    city: 'Barcelona',
    rooms: 4,
    bathrooms: 2,
    area: 95,
    status: 'Pendiente',
    owner: 'Pedro Sánchez',
    image: '/placeholder.svg?height=300&width=400'
  },
  {
    id: 3,
    name: 'Piso Moderno Playa',
    address: 'Paseo Marítimo 78',
    city: 'Valencia',
    rooms: 2,
    bathrooms: 1,
    area: 65,
    status: 'Activo',
    owner: 'Laura Fernández',
    image: '/placeholder.svg?height=300&width=400'
  }
])

const filteredApartments = computed(() => {
  return apartments.value.filter(apartment => {
    const matchesSearch = apartment.name.toLowerCase().includes(search.value.toLowerCase()) ||
                         apartment.address.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = !filterStatus.value || apartment.status === filterStatus.value
    const matchesCity = !filterCity.value || apartment.city === filterCity.value
    
    return matchesSearch && matchesStatus && matchesCity
  })
})

const getStatusColor = (status) => {
  const colors = {
    'Activo': 'positive',
    'Pendiente': 'warning',
    'Rechazado': 'negative',
    'Suspendido': 'grey'
  }
  return colors[status] || 'grey'
}

const approveApartment = (apartment) => {
  $q.dialog({
    title: 'Aprobar Piso',
    message: `¿Aprobar el piso "${apartment.name}"?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    apartment.status = 'Activo'
    $q.notify({
      color: 'positive',
      message: 'Piso aprobado exitosamente',
      icon: 'check_circle'
    })
  })
}

const rejectApartment = (apartment) => {
  $q.dialog({
    title: 'Rechazar Piso',
    message: `¿Rechazar el piso "${apartment.name}"?`,
    cancel: true,
    persistent: true,
    prompt: {
      model: '',
      type: 'text',
      label: 'Motivo del rechazo'
    }
  }).onOk((reason) => {
    apartment.status = 'Rechazado'
    $q.notify({
      color: 'negative',
      message: `Piso rechazado: ${reason}`,
      icon: 'cancel'
    })
  })
}

const editApartment = (apartment) => {
  editingApartment.value = { ...apartment }
  showEditDialog.value = true
}

const saveApartment = () => {
  const index = apartments.value.findIndex(a => a.id === editingApartment.value.id)
  if (index !== -1) {
    apartments.value[index] = { ...editingApartment.value }
    $q.notify({
      color: 'positive',
      message: 'Piso actualizado exitosamente',
      icon: 'check'
    })
  }
  showEditDialog.value = false
}

const deleteApartment = (apartment) => {
  $q.dialog({
    title: 'Eliminar Piso',
    message: `¿Eliminar el piso "${apartment.name}"? Esta acción no se puede deshacer.`,
    cancel: true,
    persistent: true,
    ok: {
      color: 'negative',
      label: 'Eliminar'
    }
  }).onOk(() => {
    apartments.value = apartments.value.filter(a => a.id !== apartment.id)
    $q.notify({
      color: 'negative',
      message: 'Piso eliminado exitosamente',
      icon: 'delete'
    })
  })
}
</script>

<style lang="scss" scoped>
.apartment-card {
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
}
</style>
