<template>
  <div>
    <h5 class="text-h5 text-weight-bold q-mb-md">Estadísticas y Análisis</h5>

    <!-- Time Period Selector -->
    <div class="row items-center q-mb-lg">
      <q-btn-toggle
        v-model="timePeriod"
        toggle-color="primary"
        :options="[
          {label: 'Semana', value: 'week'},
          {label: 'Mes', value: 'month'},
          {label: 'Año', value: 'year'}
        ]"
      />
    </div>

    <!-- Key Metrics -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="metric-card">
          <q-card-section>
            <div class="text-grey-7 text-caption q-mb-xs">Nuevos Usuarios</div>
            <div class="text-h4 text-weight-bold text-primary">+{{ stats.newUsers }}</div>
            <div class="text-positive text-caption">
              <q-icon name="trending_up" size="16px" />
              +12% vs período anterior
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="metric-card">
          <q-card-section>
            <div class="text-grey-7 text-caption q-mb-xs">Nuevos Pisos</div>
            <div class="text-h4 text-weight-bold text-positive">+{{ stats.newApartments }}</div>
            <div class="text-positive text-caption">
              <q-icon name="trending_up" size="16px" />
              +8% vs período anterior
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="metric-card">
          <q-card-section>
            <div class="text-grey-7 text-caption q-mb-xs">Tasa de Actividad</div>
            <div class="text-h4 text-weight-bold text-info">{{ stats.activityRate }}%</div>
            <div class="text-positive text-caption">
              <q-icon name="trending_up" size="16px" />
              +3% vs período anterior
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="metric-card">
          <q-card-section>
            <div class="text-grey-7 text-caption q-mb-xs">Satisfacción</div>
            <div class="text-h4 text-weight-bold text-warning">{{ stats.satisfaction }}/5</div>
            <div class="text-grey-7 text-caption">
              <q-icon name="star" size="16px" color="warning" />
              Basado en {{ stats.reviews }} reseñas
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Charts -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Crecimiento de Usuarios</div>
            <div class="chart-placeholder">
              <q-icon name="show_chart" size="64px" color="grey-5" />
              <div class="text-grey-7 q-mt-md">Gráfico de líneas mostrando el crecimiento</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Distribución por Rol</div>
            <div class="chart-placeholder">
              <q-icon name="pie_chart" size="64px" color="grey-5" />
              <div class="text-grey-7 q-mt-md">Gráfico circular de roles</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Detailed Tables -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Ciudades Más Activas</div>
            <q-list separator>
              <q-item v-for="city in topCities" :key="city.name">
                <q-item-section>
                  <q-item-label>{{ city.name }}</q-item-label>
                  <q-item-label caption>{{ city.apartments }} pisos</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge color="primary" :label="city.users + ' usuarios'" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">Actividad Reciente</div>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="activity in recentActivities"
                :key="activity.id"
                :title="activity.title"
                :subtitle="activity.time"
                :icon="activity.icon"
              >
                {{ activity.description }}
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const timePeriod = ref('month')

const stats = ref({
  newUsers: 234,
  newApartments: 45,
  activityRate: 67,
  satisfaction: 4.2,
  reviews: 1523
})

const topCities = ref([
  { name: 'Madrid', apartments: 125, users: 456 },
  { name: 'Barcelona', apartments: 98, users: 389 },
  { name: 'Valencia', apartments: 67, users: 245 },
  { name: 'Sevilla', apartments: 54, users: 198 },
  { name: 'Málaga', apartments: 45, users: 167 }
])

const recentActivities = ref([
  {
    id: 1,
    title: 'Nuevo usuario registrado',
    description: 'María García se ha unido como estudiante',
    time: 'Hace 5 minutos',
    icon: 'person_add'
  },
  {
    id: 2,
    title: 'Piso aprobado',
    description: 'Piso en Calle Mayor 123 ha sido aprobado',
    time: 'Hace 15 minutos',
    icon: 'check_circle'
  },
  {
    id: 3,
    title: 'Reporte resuelto',
    description: 'Reporte #234 ha sido resuelto',
    time: 'Hace 1 hora',
    icon: 'task_alt'
  },
  {
    id: 4,
    title: 'Nueva reseña',
    description: 'Juan Pérez dejó una reseña de 5 estrellas',
    time: 'Hace 2 horas',
    icon: 'star'
  }
])
</script>

<style lang="scss" scoped>
.metric-card {
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}
</style>
