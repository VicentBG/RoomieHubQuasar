<template>
  <div class="q-pa-md">
    <h2 class="text-h4 text-primary q-mb-md">Mi Perfil RoomieHub</h2>

    <q-card class="user-profile-card q-mb-md">
      <q-card-section>
        <div class="row items-center q-col-gutter-md">
          <div class="col-12 col-sm-4">
            <q-avatar size="150px">
              <img :src="userProfile.avatar">
              <q-badge floating color="teal" icon="edit" rounded>
                <q-file v-model="newAvatar" accept="image/*" style="display: none">
                  <template v-slot:append>
                    <q-icon name="add_a_photo" @click.stop.prevent="selectNewAvatar" />
                  </template>
                </q-file>
              </q-badge>
            </q-avatar>
          </div>
          <div class="col-12 col-sm-8">
            <div class="text-h5">{{ userProfile.name }}</div>
            <div class="text-subtitle1">{{ userProfile.email }}</div>
            <q-btn color="primary" icon="edit" label="Editar Perfil" @click="editMode = true" class="q-mt-sm"
              v-if="!editMode" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="userProfile.name" label="Nombre completo" :readonly="!editMode"
                :rules="[val => !!val || 'El nombre es requerido']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="userProfile.alias" label="Alias" :readonly="!editMode"
                :rules="[val => !!val || 'El alias es requerido']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="userProfile.email" label="Correo electrónico" type="email" :readonly="!editMode"
                :rules="[val => !!val || 'El correo es requerido', val => isValidEmail(val) || 'Correo inválido']" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="userProfile.phone" label="Teléfono" :readonly="!editMode"
                :rules="[val => !!val || 'El teléfono es requerido']" />
            </div>
            <div class="col-12">
              <q-input v-model="userProfile.bio" label="Biografía" type="textarea" :readonly="!editMode" />
            </div>
            <div class="col-12">
              <q-toggle v-model="userProfile.darkMode" label="Modo oscuro" :disable="!editMode" />
            </div>
          </div>

          <div class="row justify-end q-gutter-sm" v-if="editMode">
            <q-btn label="Cancelar" color="negative" @click="cancelEdit" />
            <q-btn label="Guardar" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRoomieStore } from 'src/stores/roomie-store';

const roomieStore = useRoomieStore()

const userProfile = ref(roomieStore.userProfile)

const $q = useQuasar()

const editMode = ref(false)
const newAvatar = ref(null)

const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val)
}

const onSubmit = () => {
  // Aquí iría la lógica para guardar los cambios en el perfil
  $q.notify({
    color: 'positive',
    message: 'Perfil actualizado exitosamente',
    icon: 'check'
  })
  editMode.value = false
}

const cancelEdit = () => {
  // Aquí podrías revertir los cambios si es necesario
  editMode.value = false
}

const selectNewAvatar = () => {
  // Simula un clic en el input de archivo oculto
  document.querySelector('input[type=file]').click()
}

watch(newAvatar, (newValue) => {
  if (newValue) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userProfile.value.avatar = e.target.result
    }
    reader.readAsDataURL(newValue)
  }
})

// Observa los cambios en darkMode y aplica el tema correspondiente
watch(() => userProfile.value.darkMode, (newValue) => {
  $q.dark.set(newValue)
})
</script>

<style lang="scss" scoped>
.user-profile-card {
  background-color: #f0f0f0;
  transition: all 0.3s ease;

  .q-avatar {
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

:deep(.q-field__native) {
  cursor: text !important;
}
</style>
