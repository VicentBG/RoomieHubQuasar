<template>
    <q-page class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <h1 class="text-h3 text-primary q-mb-md">¡Hola, Roomie! 🎉</h1>
        </div>
  
        <div class="col-12 col-md-8">
          <q-card class="bg-orange-1">
            <q-card-section>
              <div class="text-h6">Próximas Tareas</div>
            </q-card-section>
            <q-card-section>
              <q-list bordered separator>
                <q-item v-for="task in tasks" :key="task.id" clickable v-ripple>
                  <q-item-section avatar>
                    <q-checkbox v-model="task.done" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ task.name }}</q-item-label>
                    <q-item-label caption>{{ task.date }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon :name="getTaskIcon(task)" color="primary" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
  
        <div class="col-12 col-md-4">
          <q-card class="bg-green-1">
            <q-card-section>
              <div class="text-h6">Gastos del Mes</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-center">
                <q-circular-progress
                  :value="expensesProgress"
                  size="150px"
                  :thickness="0.2"
                  color="primary"
                  center-color="grey-3"
                  track-color="transparent"
                  class="q-ma-md"
                >
                  <div class="text-subtitle1">{{ expensesProgress }}%</div>
                </q-circular-progress>
                <div class="text-h5 q-mt-sm">
                  ${{ currentExpenses }} / ${{ totalBudget }}
                </div>
                <div class="text-caption text-grey">
                  Gastos actuales / Presupuesto total
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
  
        <div class="col-12 col-md-6">
          <q-card class="bg-blue-1">
            <q-card-section>
              <div class="text-h6">Eventos Próximos</div>
            </q-card-section>
            <q-card-section>
              <q-list bordered separator>
                <q-item v-for="event in events" :key="event.id" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon :name="getEventIcon(event)" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ event.name }}</q-item-label>
                    <q-item-label caption>{{ event.date }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
  
        <div class="col-12 col-md-6">
          <q-card class="bg-purple-1">
            <q-card-section>
              <div class="text-h6">Compañeros de Piso</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row q-col-gutter-sm items-center justify-center">
                <div v-for="roommate in roommates" :key="roommate.id" class="col-auto">
                  <q-avatar size="80px" class="cursor-pointer">
                    <img :src="roommate.avatar" :alt="roommate.name">
                    <q-tooltip>{{ roommate.name }}</q-tooltip>
                  </q-avatar>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const expensesProgress = ref(65)
  const currentExpenses = ref(650)
  const totalBudget = ref(1000)
  
  const tasks = ref([
    { id: 1, name: 'Limpiar la cocina', date: 'Hoy', icon: 'kitchen', done: false },
    { id: 2, name: 'Comprar papel higiénico', date: 'Mañana', icon: 'shopping_cart', done: false },
    { id: 3, name: 'Pagar la factura de luz', date: 'En 3 días', icon: 'bolt', done: false },
  ])
  
  const events = ref([
    { id: 1, name: 'Fiesta de cumpleaños de Ana', date: '15 de Mayo', icon: 'cake' },
    { id: 2, name: 'Noche de películas', date: '18 de Mayo', icon: 'movie' },
    { id: 3, name: 'Examen de Matemáticas', date: '20 de Mayo', icon: 'school' },
  ])
  
  const roommates = ref([
    { id: 1, name: 'Ana', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { id: 2, name: 'Carlos', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    { id: 3, name: 'Elena', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg' },
    { id: 4, name: 'David', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg' },
  ])
  
  const getTaskIcon = (task) => {
    switch (task.icon) {
      case 'kitchen':
        return 'kitchen'
      case 'shopping_cart':
        return 'shopping_cart'
      case 'bolt':
        return 'bolt'
      default:
        return 'assignment'
    }
  }
  
  const getEventIcon = (event) => {
    switch (event.icon) {
      case 'cake':
        return 'cake'
      case 'movie':
        return 'movie'
      case 'school':
        return 'school'
      default:
        return 'event'
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .q-card {
    transition: all 0.3s ease-in-out;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  }
  
  .q-avatar {
    transition: all 0.3s ease-in-out;
  
    &:hover {
      transform: scale(1.1);
    }
  }
  </style>