<template>
    <div class="q-pa-md">
      <h2 class="text-h4 text-primary q-mb-md">Mis Roomies</h2>
      <div class="row q-col-gutter-md">
        <div v-for="roomie in roomies" :key="roomie.id" class="col-12 col-sm-6 col-md-4">
          <q-card class="roomie-card">
            <q-img :src="roomie.avatar" :alt="roomie.name" height="200px">
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  No se pudo cargar la imagen
                </div>
              </template>
            </q-img>
            <q-card-section>
              <div class="text-h6">{{ roomie.name }}</div>
              <div class="text-subtitle2">{{ roomie.occupation }}</div>
            </q-card-section>
            <q-card-section>
              <q-list dense>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="cake" color="primary" />
                  </q-item-section>
                  <q-item-section>{{ roomie.birthday }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="school" color="primary" />
                  </q-item-section>
                  <q-item-section>{{ roomie.university }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="favorite" color="primary" />
                  </q-item-section>
                  <q-item-section>{{ roomie.interests.join(', ') }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" label="Enviar mensaje" @click="sendMessage(roomie)" />
              <q-btn flat color="secondary" icon="more_vert">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="viewProfile(roomie)">
                      <q-item-section>Ver perfil</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="editRoomie(roomie)">
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
  
      <q-dialog v-model="messageDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Enviar mensaje a {{ selectedRoomie ? selectedRoomie.name : '' }}</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="message" type="textarea" label="Mensaje" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Enviar" color="primary" @click="confirmSendMessage" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  
  const $q = useQuasar()
  
  const roomies = ref([
    {
      id: 1,
      name: 'Ana García',
      occupation: 'Estudiante de Psicología',
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      birthday: '15 de Mayo',
      university: 'Universidad Autónoma de Madrid',
      interests: ['Lectura', 'Yoga', 'Cocina']
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      occupation: 'Estudiante de Ingeniería',
      avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
      birthday: '22 de Septiembre',
      university: 'Universidad Politécnica de Madrid',
      interests: ['Videojuegos', 'Fútbol', 'Programación']
    },
    {
      id: 3,
      name: 'Elena Martínez',
      occupation: 'Estudiante de Medicina',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      birthday: '7 de Enero',
      university: 'Universidad Complutense de Madrid',
      interests: ['Música', 'Voluntariado', 'Cine']
    },
    {
      id: 4,
      name: 'David López',
      occupation: 'Estudiante de Economía',
      avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
      birthday: '30 de Noviembre',
      university: 'Universidad Carlos III de Madrid',
      interests: ['Deportes', 'Viajes', 'Fotografía']
    }
  ])
  
  const messageDialog = ref(false)
  const selectedRoomie = ref(null)
  const message = ref('')
  
  const sendMessage = (roomie) => {
    selectedRoomie.value = roomie
    messageDialog.value = true
  }
  
  const confirmSendMessage = () => {
    $q.notify({
      message: `Mensaje enviado a ${selectedRoomie.value.name}`,
      color: 'positive'
    })
    message.value = ''
  }
  
  const viewProfile = (roomie) => {
    $q.notify({
      message: `Ver perfil de ${roomie.name}`,
      color: 'info'
    })
  }
  
  const editRoomie = (roomie) => {
    $q.notify({
      message: `Editar perfil de ${roomie.name}`,
      color: 'warning'
    })
  }
  </script>
  
  <style lang="scss" scoped>
  .roomie-card {
    transition: all 0.3s ease-in-out;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  }
  </style>