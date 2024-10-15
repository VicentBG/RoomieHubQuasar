<template>
    <q-page class="flex flex-center bg-grey-2">
      <q-card class="my-card" style="width: 400px; max-width: 90vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h5 text-center">Bienvenido a RoomieHub 🏠</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="email"
              label="Correo electrónico"
              type="email"
              :rules="[val => !!val || 'El correo es requerido', isValidEmail]"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
  
            <q-input
              filled
              v-model="password"
              label="Contraseña"
              :type="isPwd ? 'password' : 'text'"
              :rules="[val => !!val || 'La contraseña es requerida']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
  
            <div class="flex justify-between items-center">
              <q-checkbox v-model="rememberMe" label="Recordarme" />
              <q-btn flat color="primary" label="¿Olvidaste tu contraseña?" size="sm" />
            </div>
  
            <q-btn 
              label="Iniciar sesión" 
              type="submit" 
              color="primary" 
              class="full-width q-mt-md"
              to="/dashboard"
              @click="roomieStore.log"
            />
          </q-form>
        </q-card-section>
  
        <q-card-section class="text-center q-pa-none">
          <q-separator />
          <q-card-section>
            <p class="text-grey-8">
              ¿No tienes una cuenta?
              <q-btn flat color="primary" label="Regístrate" to="/register" />
            </p>
          </q-card-section>
        </q-card-section>
  
        <q-card-section class="bg-grey-2 text-center">
          <q-btn flat round color="primary" icon="fab fa-facebook" class="q-mx-sm" />
          <q-btn flat round color="primary" icon="fab fa-google" class="q-mx-sm" />
          <q-btn flat round color="primary" icon="fab fa-twitter" class="q-mx-sm" />
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { useRoomieStore } from 'src/stores/roomie-store'
  
  const $q = useQuasar()

  const roomieStore = useRoomieStore()
  
  const email = ref('')
  const password = ref('')
  const isPwd = ref(true)
  const rememberMe = ref(false)
  
  const isValidEmail = (val) => {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Ingresa un correo electrónico válido';
  }
  
  const onSubmit = () => {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Inicio de sesión exitoso'
    })
    // Aquí iría la lógica de autenticación real
  }
  </script>
  
  <style scoped>
  .my-card {
    width: 100%;
    max-width: 400px;
  }
  </style>