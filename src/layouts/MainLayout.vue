<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Roomie Hub
        </q-toolbar-title>
        
        <q-btn-group stretch>
          <q-btn color="primary" size="sm" icon="home" glossy to="/" />
          <q-btn color="primary" size="sm" icon="login" stack glossy label="LogIn" to="/login" />
          <q-btn color="primary" size="sm" icon="app_registration" stack glossy label="Register" to="/register" />
        </q-btn-group>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
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
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Piso',
    caption: 'Toda la info de tu hogar',
    icon: 'apartment',
    to: 'piso'
  },
  {
    title: 'Roomies',
    caption: 'Tus compañeros de vivencias',
    icon: 'group',
    to: 'roomies'
  },
  {
    title: 'Eventos',
    caption: 'Que no falte la diversión',
    icon: 'event',
    to: 'eventos'
  },
  {
    title: 'Tareas',
    caption: 'El trabajo bien planificado',
    icon: 'task',
    to: 'tareas'
  },
  {
    title: 'Gastos',
    caption: 'Aquí vamos todos a "pachas"',
    icon: 'euro',
    to: 'gastos'
  },
  {
    title: 'Compras',
    caption: 'Que no falte nada en la nevera',
    icon: 'shopping_cart',
    to: 'compras'
  },
  {
    title: 'About',
    caption: 'Sobre mí',
    icon: 'info',
    to: 'about'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
