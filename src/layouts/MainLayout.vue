<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Roomie Hub
        </q-toolbar-title>

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
        narrow-indicator
        dense
        indicator-color="purple"
        :breakpoint="0"
        align="center">
          <q-route-tab to="/" label="Home" icon="home" />
          <q-route-tab to="/login" label="Login" icon="login" />
          <q-route-tab to="/register" label="Register" icon="app_registration" />
        </q-tabs>

        <q-tabs
        v-else
        class="bg-grey-9"
        narrow-indicator
        dense
        indicator-color="purple"
        outside-arrows
        mobile-arrows
        :breakpoint="0"
        align="center">
          <q-route-tab class="text-orange" to="/piso" label="Piso" icon="home" />
          <q-route-tab class="text-teal" to="/roomies" label="Roomies" icon="groups" />
          <q-route-tab class="text-purple" to="/eventos" label="Eventos" icon="calendar_month" />
          <q-route-tab class="text-green" to="/tareas" label="Tareas" icon="task" />
          <q-route-tab class="text-red" to="/gastos" label="Gastos" icon="payments" />
          <q-route-tab class="text-blue" to="/compras" label="Compras" icon="shopping_cart" />
        </q-tabs>
        
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const logged = true
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
</script>
