<template>
    <q-page class="flex flex-center bg-grey-2">
      <q-card class="my-card" style="width: 400px; max-width: 90vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h5 text-center">Únete a RoomieHub 🎉</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="Correo electrónico"
              type="email"
              :rules="[val => !!val || 'El correo es requerido']"
            />
  
            <q-input
              filled
              v-model="password"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              :rules="[val => !!val || 'La contraseña es requerida']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
  
            <q-radio v-model="joinOption" val="join" label="Unirme a un piso existente" />
            <q-radio v-model="joinOption" val="create" label="Crear un nuevo piso" />
  
            <template v-if="joinOption === 'join'">
              <q-input
                filled
                v-model="apartmentCode"
                label="Código del piso"
                :rules="[val => !!val || 'El código del piso es requerido']"
              />
            </template>
  
            <template v-else>
              <q-input
                filled
                v-model="newApartmentCode"
                label="Código del nuevo piso"
                :rules="[val => !!val || 'El código del nuevo piso es requerido']"
              />
              <q-input
                filled
                v-model="apartmentName"
                label="Nombre del nuevo piso"
                :rules="[val => !!val || 'El nombre del piso es requerido']"
              />
              <q-input
                filled
                v-model="apartmentAddress"
                label="Dirección del nuevo piso"
                :rules="[val => !!val || 'La dirección del piso es requerida']"
              />
            </template>
  
            <div>
              <q-btn label="Registrarse" type="submit" color="primary" class="full-width" />
            </div>
          </q-form>
        </q-card-section>
  
        <q-card-section class="text-center">
          <p class="text-grey-8">
            ¿Ya tienes una cuenta?
            <q-btn flat color="primary" label="Inicia sesión" to="/login" />
          </p>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  
  const $q = useQuasar()
  
  const email = ref('')
  const password = ref('')
  const isPwd = ref(true)
  const joinOption = ref('join')
  const apartmentCode = ref('')
  const newApartmentCode = ref('')
  const apartmentName = ref('')
  const apartmentAddress = ref('')
  
  const onSubmit = () => {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Registro exitoso'
    })
  }
  </script>
  
  <style scoped>
  .my-card {
    width: 100%;
    max-width: 400px;
  }
  </style>