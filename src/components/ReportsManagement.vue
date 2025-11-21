<template>
  <div>
    <div class="row items-center justify-between q-mb-md">
      <h5 class="text-h5 text-weight-bold q-my-none">Gestión de Reportes</h5>
      <q-chip
        :color="pendingReports.length > 0 ? 'warning' : 'positive'"
        text-color="white"
      >
        {{ pendingReports.length }} reportes pendientes
      </q-chip>
    </div>

    <!-- Filters -->
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterType"
          outlined
          dense
          :options="typeOptions"
          label="Tipo de reporte"
          clearable
        />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterStatus"
          outlined
          dense
          :options="statusOptions"
          label="Estado"
          clearable
        />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterPriority"
          outlined
          dense
          :options="priorityOptions"
          label="Prioridad"
          clearable
        />
      </div>
    </div>

    <!-- Reports List -->
    <div class="row q-col-gutter-md">
      <div
        v-for="report in filteredReports"
        :key="report.id"
        class="col-12"
      >
        <q-card class="report-card">
          <q-card-section>
            <div class="row items-start">
              <div class="col">
                <div class="row items-center q-mb-sm">
                  <q-badge
                    :color="getPriorityColor(report.priority)"
                    :label="report.priority"
                    class="q-mr-sm"
                  />
                  <q-badge
                    :color="getTypeColor(report.type)"
                    :label="report.type"
                    class="q-mr-sm"
                  />
                  <q-badge
                    :color="getStatusColor(report.status)"
                    :label="report.status"
                  />
                  <q-space />
                  <span class="text-grey-7 text-caption">{{ report.date }}</span>
                </div>
                
                <div class="text-h6 text-weight-bold q-mb-xs">{{ report.title }}</div>
                <div class="text-body2 text-grey-8 q-mb-sm">{{ report.description }}</div>
                
                <div class="row items-center text-caption text-grey-7">
                  <q-icon name="person" size="16px" class="q-mr-xs" />
                  <span class="q-mr-md">Reportado por: {{ report.reporter }}</span>
                  <q-icon name="flag" size="16px" class="q-mr-xs" />
                  <span>Sujeto: {{ report.subject }}</span>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              v-if="report.status === 'Pendiente'"
              flat
              color="primary"
              label="Revisar"
              icon="visibility"
              @click="reviewReport(report)"
            />
            <q-btn
              v-if="report.status === 'Pendiente'"
              flat
              color="positive"
              label="Resolver"
              icon="check_circle"
              @click="resolveReport(report)"
            />
            <q-btn
              v-if="report.status === 'Pendiente'"
              flat
              color="negative"
              label="Rechazar"
              icon="cancel"
              @click="rejectReport(report)"
            />
            <q-btn
              flat
              color="grey"
              icon="more_vert"
            >
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="viewDetails(report)">
                    <q-item-section avatar>
                      <q-icon name="info" />
                    </q-item-section>
                    <q-item-section>Ver detalles</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="contactReporter(report)">
                    <q-item-section avatar>
                      <q-icon name="email" />
                    </q-item-section>
                    <q-item-section>Contactar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Review Dialog -->
    <q-dialog v-model="showReviewDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Revisar Reporte</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle2 q-mb-sm">{{ reviewingReport.title }}</div>
          <q-separator class="q-mb-md" />
          
          <q-input
            v-model="reviewNotes"
            label="Notas de revisión"
            type="textarea"
            outlined
            rows="4"
            class="q-mb-md"
          />

          <q-select
            v-model="reviewAction"
            :options="['Resolver', 'Rechazar', 'Requiere más información']"
            label="Acción"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn flat label="Guardar" color="primary" @click="saveReview" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const filterType = ref(null)
const filterStatus = ref(null)
const filterPriority = ref(null)
const showReviewDialog = ref(false)
const reviewingReport = ref({})
const reviewNotes = ref('')
const reviewAction = ref('')

const typeOptions = ['Usuario', 'Piso', 'Comentario', 'Comportamiento', 'Técnico']
const statusOptions = ['Pendiente', 'En Revisión', 'Resuelto', 'Rechazado']
const priorityOptions = ['Alta', 'Media', 'Baja']

const reports = ref([
  {
    id: 1,
    title: 'Usuario con comportamiento inapropiado',
    description: 'El usuario ha estado enviando mensajes ofensivos a otros compañeros de piso.',
    type: 'Comportamiento',
    priority: 'Alta',
    status: 'Pendiente',
    reporter: 'María González',
    subject: 'Carlos Ruiz',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'Piso con información falsa',
    description: 'Las fotos del piso no coinciden con la realidad. Posible estafa.',
    type: 'Piso',
    priority: 'Alta',
    status: 'Pendiente',
    reporter: 'Juan Pérez',
    subject: 'Piso Calle Mayor 123',
    date: '2024-03-14'
  },
  {
    id: 3,
    title: 'Comentario spam',
    description: 'Usuario dejando comentarios publicitarios en múltiples pisos.',
    type: 'Comentario',
    priority: 'Media',
    status: 'En Revisión',
    reporter: 'Ana López',
    subject: 'Usuario spam_bot_2024',
    date: '2024-03-13'
  },
  {
    id: 4,
    title: 'Error al cargar imágenes',
    description: 'No se pueden subir imágenes del piso, el sistema muestra error 500.',
    type: 'Técnico',
    priority: 'Media',
    status: 'Pendiente',
    reporter: 'Pedro Martín',
    subject: 'Sistema',
    date: '2024-03-12'
  },
  {
    id: 5,
    title: 'Disputa entre compañeros',
    description: 'Conflicto sobre gastos compartidos no resueltos.',
    type: 'Usuario',
    priority: 'Baja',
    status: 'Resuelto',
    reporter: 'Laura Sánchez',
    subject: 'Piso compartido 456',
    date: '2024-03-10'
  }
])

const filteredReports = computed(() => {
  return reports.value.filter(report => {
    const matchesType = !filterType.value || report.type === filterType.value
    const matchesStatus = !filterStatus.value || report.status === filterStatus.value
    const matchesPriority = !filterPriority.value || report.priority === filterPriority.value
    
    return matchesType && matchesStatus && matchesPriority
  })
})

const pendingReports = computed(() => {
  return reports.value.filter(r => r.status === 'Pendiente')
})

const getPriorityColor = (priority) => {
  const colors = {
    'Alta': 'red',
    'Media': 'orange',
    'Baja': 'blue'
  }
  return colors[priority] || 'grey'
}

const getTypeColor = (type) => {
  const colors = {
    'Usuario': 'purple',
    'Piso': 'teal',
    'Comentario': 'indigo',
    'Comportamiento': 'deep-orange',
    'Técnico': 'blue-grey'
  }
  return colors[type] || 'grey'
}

const getStatusColor = (status) => {
  const colors = {
    'Pendiente': 'warning',
    'En Revisión': 'info',
    'Resuelto': 'positive',
    'Rechazado': 'grey'
  }
  return colors[status] || 'grey'
}

const reviewReport = (report) => {
  reviewingReport.value = { ...report }
  reviewNotes.value = ''
  reviewAction.value = ''
  showReviewDialog.value = true
}

const saveReview = () => {
  const index = reports.value.findIndex(r => r.id === reviewingReport.value.id)
  if (index !== -1) {
    if (reviewAction.value === 'Resolver') {
      reports.value[index].status = 'Resuelto'
    } else if (reviewAction.value === 'Rechazar') {
      reports.value[index].status = 'Rechazado'
    } else {
      reports.value[index].status = 'En Revisión'
    }
    
    $q.notify({
      color: 'positive',
      message: 'Reporte actualizado exitosamente',
      icon: 'check'
    })
  }
  showReviewDialog.value = false
}

const resolveReport = (report) => {
  $q.dialog({
    title: 'Resolver Reporte',
    message: '¿Marcar este reporte como resuelto?',
    cancel: true,
    persistent: true,
    prompt: {
      model: '',
      type: 'text',
      label: 'Resolución (opcional)'
    }
  }).onOk((resolution) => {
    report.status = 'Resuelto'
    $q.notify({
      color: 'positive',
      message: 'Reporte resuelto exitosamente',
      icon: 'check_circle'
    })
  })
}

const rejectReport = (report) => {
  $q.dialog({
    title: 'Rechazar Reporte',
    message: '¿Rechazar este reporte?',
    cancel: true,
    persistent: true,
    prompt: {
      model: '',
      type: 'text',
      label: 'Motivo del rechazo'
    }
  }).onOk((reason) => {
    report.status = 'Rechazado'
    $q.notify({
      color: 'info',
      message: 'Reporte rechazado',
      icon: 'cancel'
    })
  })
}

const viewDetails = (report) => {
  $q.notify({
    color: 'info',
    message: `Viendo detalles del reporte #${report.id}`,
    icon: 'info'
  })
}

const contactReporter = (report) => {
  $q.notify({
    color: 'info',
    message: `Contactando a ${report.reporter}`,
    icon: 'email'
  })
}
</script>

<style lang="scss" scoped>
.report-card {
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>
