<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Detalles del Piso RoomieHub</h2>

    <div class="row q-col-gutter-md">
      <!-- Dirección y Características -->
      <div class="col-12 col-md-6">
        <q-card>
          <img src="https://cdn.quasar.dev/img/parallax1.jpg">
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
import { useRoomieStore } from 'src/stores/roomie-store';

const roomieStore = useRoomieStore()

const piso = ref(roomieStore.piso)

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
