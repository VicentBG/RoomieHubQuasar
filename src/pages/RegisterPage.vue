<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="register-card" style="width: 400px; max-width: 90vw;">
      <q-card-section class="bg-primary text-white">
        <div class="text-h5 text-center">Registro en RoomieHub</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="name" label="Nombre completo" hint="Ingresa tu nombre completo" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor ingresa tu nombre']" />

          <q-input filled v-model="email" label="Correo electrónico" hint="Ingresa tu correo electrónico" lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor ingresa tu correo electrónico']" />

          <q-input filled type="password" v-model="password" label="Contraseña" hint="Ingresa tu contraseña" lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Por favor ingresa tu contraseña',
              val => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
            ]" />

          <q-select filled v-model="userType" :options="userTypeOptions" label="Tipo de usuario"
            hint="Selecciona tu tipo de usuario" />

          <template v-if="userType === 'Fundador'">
            <q-btn label="Crear nuevo piso" color="secondary" @click="showNewApartmentForm = true"
              class="full-width q-mb-md" />

            <q-select filled v-model="selectedApartment" :options="apartmentOptions" label="Seleccionar piso existente"
              hint="Selecciona un piso existente o crea uno nuevo" />
          </template>

          <div>
            <q-btn label="Registrarse" type="submit" color="primary" />
            <q-btn label="Volver" to="/" color="secondary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <AddPiso v-model="showNewApartmentForm" @create-apartment="handleNewApartment" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useRoomieStore } from 'src/stores/roomie-store'
import AddPiso from 'src/components/AddPiso.vue';

const $q = useQuasar()
const router = useRouter()
const roomieStore = useRoomieStore()

const name = ref('')
const email = ref('')
const password = ref('')
const userType = ref('Estudiante')
const userTypeOptions = ['Estudiante', 'Fundador']
const selectedApartment = ref(null)
const apartmentOptions = ref([
  { label: 'Piso 1', value: 1 },
  { label: 'Piso 2', value: 2 },
  // Aquí puedes agregar más opciones de pisos existentes
])

const showNewApartmentForm = ref(false)

const onSubmit = () => {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Registro exitoso'
  })

  roomieStore.addRoomie({
    email: email.value,
    password: password.value
  })
  roomieStore.log()
  router.push('/dashboard')
}

const handleNewApartment = (newApartment) => {
  // Aquí iría la lógica para manejar el nuevo apartamento creado
  console.log('Nuevo apartamento creado:', newApartment)

  // Añadir el nuevo apartamento a las opciones
  apartmentOptions.value.push({
    label: newApartment.name,
    value: apartmentOptions.value.length + 1 // Esto es simplificado, normalmente usarías un ID único del backend
  })

  // Seleccionar automáticamente el nuevo apartamento
  selectedApartment.value = apartmentOptions.value[apartmentOptions.value.length - 1].value

  $q.notify({
    color: 'positive',
    message: 'Nuevo piso añadido exitosamente',
    icon: 'check'
  })
}
</script>

<style scoped>
.register-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
