<template>
  <div>
    <div class="row items-center justify-between q-mb-md">
      <h5 class="text-h5 text-weight-bold q-my-none">Gestión de Notificaciones</h5>
      <q-btn
        color="primary"
        label="Nueva Notificación"
        icon="add"
        @click="showNewNotificationDialog = true"
      />
    </div>

    <!-- Notification Templates -->
    <div class="q-mb-lg">
      <div class="text-subtitle1 text-weight-medium q-mb-sm">Plantillas Rápidas</div>
      <div class="row q-col-gutter-sm">
        <div class="col-auto" v-for="template in templates" :key="template.id">
          <q-btn
            outline
            color="primary"
            :label="template.name"
            @click="useTemplate(template)"
          />
        </div>
      </div>
    </div>

    <!-- Sent Notifications History -->
    <div>
      <div class="text-subtitle1 text-weight-medium q-mb-md">Historial de Notificaciones</div>
      <q-list separator bordered>
        <q-item v-for="notification in notifications" :key="notification.id">
          <q-item-section avatar>
            <q-avatar :color="getNotificationColor(notification.type)" text-color="white" :icon="getNotificationIcon(notification.type)" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-medium">{{ notification.title }}</q-item-label>
            <q-item-label caption>{{ notification.message }}</q-item-label>
            <q-item-label caption class="q-mt-xs">
              <q-icon name="schedule" size="14px" />
              {{ notification.sentDate }} • {{ notification.recipients }} destinatarios
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="column items-end">
              <q-badge :color="getStatusColor(notification.status)" :label="notification.status" />
              <div class="text-caption text-grey-7 q-mt-xs">
                {{ notification.opened }} abiertos
              </div>
            </div>
          </q-item-section>

          <q-item-section side>
            <q-btn
              flat
              round
              dense
              icon="more_vert"
            >
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="viewAnalytics(notification)">
                    <q-item-section avatar>
                      <q-icon name="analytics" />
                    </q-item-section>
                    <q-item-section>Ver analíticas</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="duplicateNotification(notification)">
                    <q-item-section avatar>
                      <q-icon name="content_copy" />
                    </q-item-section>
                    <q-item-section>Duplicar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- New Notification Dialog -->
    <q-dialog v-model="showNewNotificationDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Crear Nueva Notificación</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            v-model="newNotification.type"
            :options="notificationTypes"
            label="Tipo de Notificación"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="newNotification.title"
            label="Título"
            outlined
            class="q-mb-md"
            :rules="[val => !!val || 'El título es requerido']"
          />

          <q-input
            v-model="newNotification.message"
            label="Mensaje"
            type="textarea"
            outlined
            rows="4"
            class="q-mb-md"
            :rules="[val => !!val || 'El mensaje es requerido']"
          />

          <q-select
            v-model="newNotification.target"
            :options="targetOptions"
            label="Destinatarios"
            outlined
            class="q-mb-md"
            multiple
            emit-value
            map-options
          />

          <q-toggle
            v-model="newNotification.sendEmail"
            label="Enviar también por email"
            class="q-mb-sm"
          />

          <q-toggle
            v-model="newNotification.sendNow"
            label="Enviar inmediatamente"
          />

          <q-input
            v-if="!newNotification.sendNow"
            v-model="newNotification.scheduledDate"
            label="Fecha y hora de envío"
            type="datetime-local"
            outlined
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn
            flat
            :label="newNotification.sendNow ? 'Enviar Ahora' : 'Programar'"
            color="primary"
            @click="sendNotification"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const showNewNotificationDialog = ref(false)

const notificationTypes = [
  'Información',
  'Actualización',
  'Alerta',
  'Promoción',
  'Recordatorio'
]

const targetOptions = [
  { label: 'Todos los usuarios', value: 'all' },
  { label: 'Solo estudiantes', value: 'students' },
  { label: 'Solo propietarios', value: 'owners' },
  { label: 'Usuarios activos', value: 'active' },
  { label: 'Usuarios inactivos', value: 'inactive' }
]

const templates = ref([
  {
    id: 1,
    name: 'Mantenimiento Programado',
    type: 'Alerta',
    title: 'Mantenimiento del Sistema',
    message: 'Realizaremos mantenimiento el [FECHA]. El servicio estará temporalmente no disponible.'
  },
  {
    id: 2,
    name: 'Nueva Característica',
    type: 'Actualización',
    title: 'Nueva Función Disponible',
    message: 'Hemos añadido [CARACTERÍSTICA] para mejorar tu experiencia en RoomieHub.'
  },
  {
    id: 3,
    name: 'Recordatorio de Pago',
    type: 'Recordatorio',
    title: 'Recordatorio de Pago',
    message: 'Recuerda que tu pago vence el [FECHA]. Por favor, realiza el pago a tiempo.'
  }
])

const newNotification = ref({
  type: '',
  title: '',
  message: '',
  target: ['all'],
  sendEmail: false,
  sendNow: true,
  scheduledDate: ''
})

const notifications = ref([
  {
    id: 1,
    type: 'Información',
    title: 'Bienvenida a nuevos usuarios',
    message: 'Bienvenidos a RoomieHub. Estamos encantados de teneros aquí.',
    sentDate: '2024-03-15 10:30',
    recipients: 156,
    opened: 123,
    status: 'Enviada'
  },
  {
    id: 2,
    type: 'Actualización',
    title: 'Nueva función de chat',
    message: 'Ahora puedes chatear directamente con compañeros de piso potenciales.',
    sentDate: '2024-03-14 15:00',
    recipients: 1247,
    opened: 890,
    status: 'Enviada'
  },
  {
    id: 3,
    type: 'Alerta',
    title: 'Mantenimiento programado',
    message: 'El sistema estará en mantenimiento el domingo de 2AM a 6AM.',
    sentDate: '2024-03-13 09:00',
    recipients: 1247,
    opened: 1100,
    status: 'Enviada'
  },
  {
    id: 4,
    type: 'Promoción',
    title: 'Descuento para propietarios',
    message: '¡20% de descuento en publicaciones premium este mes!',
    sentDate: '2024-03-12 12:00',
    recipients: 389,
    opened: 245,
    status: 'Programada'
  },
  {
    id: 5,
    type: 'Recordatorio',
    title: 'Completa tu perfil',
    message: 'Completa tu perfil para obtener mejores coincidencias.',
    sentDate: '2024-03-11 18:00',
    recipients: 567,
    opened: 0,
    status: 'Programada'
  }
])

const getNotificationIcon = (type) => {
  const icons = {
    'Información': 'info',
    'Actualización': 'update',
    'Alerta': 'warning',
    'Promoción': 'local_offer',
    'Recordatorio': 'alarm'
  }
  return icons[type] || 'notifications'
}

const getNotificationColor = (type) => {
  const colors = {
    'Información': 'info',
    'Actualización': 'primary',
    'Alerta': 'warning',
    'Promoción': 'positive',
    'Recordatorio': 'purple'
  }
  return colors[type] || 'grey'
}

const getStatusColor = (status) => {
  const colors = {
    'Enviada': 'positive',
    'Programada': 'warning',
    'Borrador': 'grey'
  }
  return colors[status] || 'grey'
}

const useTemplate = (template) => {
  newNotification.value = {
    type: template.type,
    title: template.title,
    message: template.message,
    target: ['all'],
    sendEmail: false,
    sendNow: true,
    scheduledDate: ''
  }
  showNewNotificationDialog.value = true
}

const sendNotification = () => {
  if (!newNotification.value.title || !newNotification.value.message) {
    $q.notify({
      color: 'negative',
      message: 'Por favor completa todos los campos requeridos',
      icon: 'warning'
    })
    return
  }

  const notification = {
    id: notifications.value.length + 1,
    type: newNotification.value.type,
    title: newNotification.value.title,
    message: newNotification.value.message,
    sentDate: newNotification.value.sendNow ? new Date().toLocaleString('es-ES') : newNotification.value.scheduledDate,
    recipients: 1247, // TODO: Calcular según destinatarios seleccionados
    opened: 0,
    status: newNotification.value.sendNow ? 'Enviada' : 'Programada'
  }

  notifications.value.unshift(notification)

  $q.notify({
    color: 'positive',
    message: newNotification.value.sendNow ? 'Notificación enviada exitosamente' : 'Notificación programada exitosamente',
    icon: 'check'
  })

  showNewNotificationDialog.value = false
  newNotification.value = {
    type: '',
    title: '',
    message: '',
    target: ['all'],
    sendEmail: false,
    sendNow: true,
    scheduledDate: ''
  }
}

const viewAnalytics = (notification) => {
  $q.notify({
    color: 'info',
    message: `Viendo analíticas de: ${notification.title}`,
    icon: 'analytics'
  })
}

const duplicateNotification = (notification) => {
  newNotification.value = {
    type: notification.type,
    title: `Copia de ${notification.title}`,
    message: notification.message,
    target: ['all'],
    sendEmail: false,
    sendNow: true,
    scheduledDate: ''
  }
  showNewNotificationDialog.value = true
}
</script>
