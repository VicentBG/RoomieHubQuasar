<template>
  <q-page>
    <div class="q-pa-md">
      <!-- Header -->
      <div class="row items-center justify-between q-mb-lg">
        <div>
          <h1 class="text-h4 text-weight-bold q-mb-xs">Panel de Administración</h1>
          <p class="text-grey-7">Gestiona RoomieHub desde aquí</p>
        </div>
        <q-btn
          color="negative"
          label="Cerrar Sesión"
          icon="logout"
          flat
          @click="logout"
        />
      </div>

      <!-- Statistics Cards -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stat-card">
            <q-card-section>
              <div class="row items-center">
                <q-icon name="people" size="48px" color="primary" class="q-mr-md" />
                <div>
                  <div class="text-h4 text-weight-bold">{{ stats.totalUsers }}</div>
                  <div class="text-grey-7">Usuarios Totales</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stat-card">
            <q-card-section>
              <div class="row items-center">
                <q-icon name="home" size="48px" color="positive" class="q-mr-md" />
                <div>
                  <div class="text-h4 text-weight-bold">{{ stats.totalApartments }}</div>
                  <div class="text-grey-7">Pisos Totales</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stat-card">
            <q-card-section>
              <div class="row items-center">
                <q-icon name="report" size="48px" color="warning" class="q-mr-md" />
                <div>
                  <div class="text-h4 text-weight-bold">{{ stats.pendingReports }}</div>
                  <div class="text-grey-7">Reportes Pendientes</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-card class="stat-card">
            <q-card-section>
              <div class="row items-center">
                <q-icon name="pending_actions" size="48px" color="info" class="q-mr-md" />
                <div>
                  <div class="text-h4 text-weight-bold">{{ stats.pendingApprovals }}</div>
                  <div class="text-grey-7">Aprobaciones Pendientes</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Tabs for different management sections -->
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab name="users" icon="people" label="Usuarios" />
        <q-tab name="apartments" icon="home" label="Pisos" />
        <q-tab name="reports" icon="report" label="Reportes" />
        <q-tab name="statistics" icon="analytics" label="Estadísticas" />
        <q-tab name="notifications" icon="notifications" label="Notificaciones" />
      </q-tabs>

      <q-separator class="q-mb-md" />

      <!-- Tab Panels -->
      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="users">
          <UserManagement />
        </q-tab-panel>

        <q-tab-panel name="apartments">
          <ApartmentManagement />
        </q-tab-panel>

        <q-tab-panel name="reports">
          <ReportsManagement />
        </q-tab-panel>

        <q-tab-panel name="statistics">
          <StatisticsPanel />
        </q-tab-panel>

        <q-tab-panel name="notifications">
          <NotificationsManager />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import UserManagement from './UserManagement.vue'
import ApartmentManagement from './ApartmentManagement.vue'
import ReportsManagement from './ReportsManagement.vue'
import StatisticsPanel from './StatisticsPanel.vue'
import NotificationsManager from './NotificationsManager.vue'

const $q = useQuasar()
const activeTab = ref('users')

const stats = ref({
  totalUsers: 0,
  totalApartments: 0,
  pendingReports: 0,
  pendingApprovals: 0
})

onMounted(() => {
  loadStatistics()
})

const loadStatistics = () => {
  // TODO: Cargar estadísticas reales desde la API
  stats.value = {
    totalUsers: 1247,
    totalApartments: 389,
    pendingReports: 12,
    pendingApprovals: 8
  }
}

const logout = () => {
  $q.dialog({
    title: 'Cerrar Sesión',
    message: '¿Estás seguro de que quieres cerrar sesión?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // TODO: Implementar lógica de cierre de sesión
    $q.notify({
      color: 'positive',
      message: 'Sesión cerrada exitosamente',
      icon: 'check'
    })
  })
}
</script>

<style lang="scss" scoped>
.stat-card {
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}
</style>
