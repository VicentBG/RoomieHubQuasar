const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LandingPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'about', component: () => import('pages/About.vue') } ,
      { path: 'calendar', component: () => import('pages/CalendarPage.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'roomies', component: () => import('pages/RoomiesPage.vue') },
      { path: 'piso', component: () => import('pages/PisoPage.vue') },
      { path: 'tareas', component: () => import('pages/TareasPage.vue') },
      { path: 'gastos', component: () => import('pages/GastosPage.vue') },
      { path: 'compras', component: () => import('pages/ComprasPage.vue') },
      { path: 'eventos', component: () => import('pages/EventosPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
