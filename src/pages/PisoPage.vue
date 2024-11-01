<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Detalles del Piso RoomieHub</h2>

    <div class="row q-col-gutter-md">
      <!-- Dirección y Características -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Dirección</div>
            <p>{{ piso.direccion }}</p>
            <p>{{ piso.codPostal }} {{ piso.ciudad }}</p>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-h6">Características</div>
            <q-list dense>
              <q-item v-for="(value, key) in piso.caracteristicas" :key="key">
                <q-item-section avatar>
                  <q-icon :name="getFeatureIcon(key)" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ formatFeatureLabel(key) }}: {{ value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Lista de Roomies -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Roomies</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-list>
              <q-item v-for="roomie in piso.roomies" :key="roomie.id">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="roomie.avatar">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ roomie.name }}</q-item-label>
                  <q-item-label caption>{{ roomie.occupation }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round color="primary" icon="chat" @click="openChat(roomie)" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Plano de Situación -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Plano de Situación</div>
          </q-card-section>

          <q-card-section>
            <q-img :src="piso.localizacion" spinner-color="primary" style="height: 400px;">
              <div class="absolute-bottom text-subtitle1 text-center">
                Plano del Piso
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>

      <!-- Servicios Cercanos -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Servicios Cercanos</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div v-for="service in piso.servicios" :key="service.name" class="col-6 col-sm-4 col-md-3">
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="service.icon" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ service.name }}</q-item-label>
                    <q-item-label caption>{{ service.distance }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Diálogo de Chat -->
    <q-dialog v-model="chatDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Chat con {{ selectedRoomie ? selectedRoomie.name : '' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Aquí iría la implementación del chat...
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const piso = ref({
  direccion: 'Calle Universidad, 123',
  codPostal: '28001',
  ciudad: 'Madrid',
  caracteristicas: {
    bedrooms: 4,
    bathrooms: 2,
    area: '120 m²',
    furnished: 'Sí',
    internet: 'Fibra 300Mb',
    heating: 'Calefacción central',
    airConditioning: 'Sí'
  },
  roomies: [
    { id: 1, name: 'Ana García', occupation: 'Estudiante de Psicología', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { id: 2, name: 'Carlos Rodríguez', occupation: 'Estudiante de Ingeniería', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    { id: 3, name: 'Elena Martínez', occupation: 'Estudiante de Medicina', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg' },
    { id: 4, name: 'David López', occupation: 'Estudiante de Economía', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg' }
  ],
  localizacion: 'src/assets/Plano.png', // Reemplazar con un plano real
  servicios: [
    { name: 'Supermercado', distance: '200m', icon: 'shopping_cart' },
    { name: 'Parada de Metro', distance: '500m', icon: 'subway' },
    { name: 'Gimnasio', distance: '1km', icon: 'fitness_center' },
    { name: 'Biblioteca', distance: '800m', icon: 'local_library' },
    { name: 'Parque', distance: '600m', icon: 'park' },
    { name: 'Farmacia', distance: '300m', icon: 'local_pharmacy' }
  ]
})

const chatDialog = ref(false)
const selectedRoomie = ref(null)

const getFeatureIcon = (feature) => {
  const icons = {
    bedrooms: 'bed',
    bathrooms: 'bathroom',
    area: 'square_foot',
    furnished: 'chair',
    internet: 'wifi',
    heating: 'hvac',
    airConditioning: 'ac_unit'
  }
  return icons[feature] || 'info'
}

const formatFeatureLabel = (feature) => {
  return feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')
}

const openChat = (roomie) => {
  selectedRoomie.value = roomie
  chatDialog.value = true
}
</script>
