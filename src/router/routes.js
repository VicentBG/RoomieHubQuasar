const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Landing",
        component: () => import("pages/LandingPage.vue"),
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("pages/AdminDashboard.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("pages/AboutPage.vue"),
      },
      {
        path: "calendar",
        name: "Calendar",
        component: () => import("pages/CalendarPage.vue"),
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("pages/DashboardPage.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("pages/ProfilePage.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("pages/SettingsPage.vue"),
      },
      {
        path: "roomies",
        name: "Roomies",
        component: () => import("pages/RoomiesPage.vue"),
      },
      {
        path: "piso",
        name: "Piso",
        component: () => import("pages/PisoPage.vue"),
      },
      {
        path: "tareas",
        name: "Tareas",
        component: () => import("pages/TareasPage.vue"),
      },
      {
        path: "gastos",
        name: "Gastos",
        component: () => import("pages/GastosPage.vue"),
      },
      {
        path: "compras",
        name: "Compras",
        component: () => import("pages/ComprasPage.vue"),
      },
      {
        path: "eventos",
        name: "Eventos",
        component: () => import("pages/EventosPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
