<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Roomie Hub
        </q-toolbar-title>

        <q-btn-dropdown v-if="logged" stretch flat icon="person">
          <q-list>
            <q-item clickable to="/profile" v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="account_circle" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item clickable v-close-popup tabindex="0" @click="do_logout">
              <q-item-section avatar>
                <q-avatar icon="logout" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown v-else stretch flat icon="person_off">
          <q-list>
            <q-item clickable to="/login" v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="login" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item clickable to="/register" v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="app_registration" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Register</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />

      </q-toolbar>

    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menú principal
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="primary text-white">
        <q-tabs
        v-if="!logged"
        class="bg-grey-6"
        narrow-indicator
        dense
        indicator-color="purple"
        :breakpoint="0"
        align="center">
          <q-route-tab class="text-indigo" to="/" label="Home" icon="home" />
          <q-route-tab class="text-orange" to="/login" label="Login" icon="login" />
          <q-route-tab class="text-teal" to="/register" label="Register" icon="app_registration" />
        </q-tabs>

        <q-tabs
        v-else
        class="bg-grey-6"
        narrow-indicator
        dense
        indicator-color="purple"
        outside-arrows
        mobile-arrows
        :breakpoint="0"
        align="center">
          <q-route-tab class="text-indigo" to="/dashboard" label="Home" icon="home" />
          <q-route-tab class="text-orange" to="/piso" label="Piso" icon="apartment" />
          <q-route-tab class="text-teal" to="/roomies" label="Roomies" icon="groups" />
          <q-route-tab class="text-purple" to="/eventos" label="Eventos" icon="event" />
          <q-route-tab class="text-green" to="/tareas" label="Tareas" icon="task" />
          <q-route-tab class="text-red" to="/gastos" label="Gastos" icon="payments" />
          <q-route-tab class="text-blue" to="/compras" label="Compras" icon="shopping_cart" />
          <q-route-tab class="text-yellow" to="/calendar" label="Calendario" icon="calendar_month" />
        </q-tabs>
        
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRoomieStore } from 'src/stores/roomie-store'

defineOptions({
  name: 'MainLayout'
})

const roomieStore = useRoomieStore()

const logged = computed(() => roomieStore.logged)

const linksList = [
  {
    title: 'Piso',
    caption: 'Toda la info de tu hogar',
    icon: 'apartment',
    to: '/piso'
  },
  {
    title: 'Roomies',
    caption: 'Tus compañeros de vivencias',
    icon: 'group',
    to: '/roomies'
  },
  {
    title: 'Eventos',
    caption: 'Que no falte la diversión',
    icon: 'event',
    to: '/eventos'
  },
  {
    title: 'Tareas',
    caption: 'El trabajo bien planificado',
    icon: 'task',
    to: '/tareas'
  },
  {
    title: 'Gastos',
    caption: 'Aquí vamos todos a "pachas"',
    icon: 'euro',
    to: '/gastos'
  },
  {
    title: 'Compras',
    caption: 'Que no falte nada en la nevera',
    icon: 'shopping_cart',
    to: '/compras'
  },
  {
    title: 'Calendario',
    caption: 'Para que no te pierdas nada',
    icon: 'calendar_month',
    to: '/calendar'
  },
  {
    title: 'About',
    caption: 'Sobre mí',
    icon: 'info',
    to: '/about'
  }
]

const rightDrawerOpen = ref(false)

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const do_logout = () => {
  roomieStore.logout()
  window.location.reload()
}

</script>
