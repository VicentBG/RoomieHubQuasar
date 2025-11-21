<template>
  <div>
    <div class="row items-center justify-between q-mb-md">
      <h5 class="text-h5 text-weight-bold q-my-none">Gestión de Usuarios</h5>
      <q-input
        v-model="search"
        outlined
        dense
        placeholder="Buscar usuarios..."
        style="min-width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- Filters -->
    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterRole"
          outlined
          dense
          :options="roleOptions"
          label="Filtrar por rol"
          clearable
        />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          v-model="filterStatus"
          outlined
          dense
          :options="statusOptions"
          label="Filtrar por estado"
          clearable
        />
      </div>
    </div>

    <!-- Users Table -->
    <q-table
      :rows="filteredUsers"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :loading="loading"
      flat
      bordered
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div class="row items-center">
            <q-avatar size="32px" class="q-mr-sm">
              <img :src="props.row.avatar || '/placeholder.svg?height=32&width=32'" />
            </q-avatar>
            <div>
              <div class="text-weight-medium">{{ props.row.name }}</div>
              <div class="text-caption text-grey-7">{{ props.row.email }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-role="props">
        <q-td :props="props">
          <q-badge
            :color="getRoleColor(props.row.role)"
            :label="props.row.role"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="getStatusColor(props.row.status)"
            :label="props.row.status"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            icon="edit"
            color="primary"
            @click="editUser(props.row)"
          >
            <q-tooltip>Editar usuario</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            dense
            :icon="props.row.status === 'Activo' ? 'block' : 'check_circle'"
            :color="props.row.status === 'Activo' ? 'warning' : 'positive'"
            @click="toggleUserStatus(props.row)"
          >
            <q-tooltip>{{ props.row.status === 'Activo' ? 'Suspender' : 'Activar' }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            dense
            icon="delete"
            color="negative"
            @click="deleteUser(props.row)"
          >
            <q-tooltip>Eliminar usuario</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Edit User Dialog -->
    <q-dialog v-model="showEditDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Editar Usuario</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="editingUser.name"
            label="Nombre"
            outlined
            class="q-mb-md"
          />
          <q-input
            v-model="editingUser.email"
            label="Email"
            outlined
            class="q-mb-md"
          />
          <q-select
            v-model="editingUser.role"
            :options="['Estudiante', 'Propietario', 'Administrador']"
            label="Rol"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn flat label="Guardar" color="primary" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const search = ref('')
const filterRole = ref(null)
const filterStatus = ref(null)
const loading = ref(false)
const showEditDialog = ref(false)
const editingUser = ref({})

const roleOptions = ['Estudiante', 'Propietario', 'Administrador']
const statusOptions = ['Activo', 'Suspendido', 'Inactivo']

const columns = [
  {
    name: 'name',
    label: 'Usuario',
    align: 'left',
    field: 'name',
    sortable: true
  },
  {
    name: 'role',
    label: 'Rol',
    align: 'center',
    field: 'role',
    sortable: true
  },
  {
    name: 'status',
    label: 'Estado',
    align: 'center',
    field: 'status',
    sortable: true
  },
  {
    name: 'registrationDate',
    label: 'Fecha de Registro',
    align: 'center',
    field: 'registrationDate',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center'
  }
]

const users = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'Estudiante',
    status: 'Activo',
    registrationDate: '2024-01-15',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    role: 'Propietario',
    status: 'Activo',
    registrationDate: '2024-02-20',
    avatar: '/placeholder.svg?height=32&width=32'
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@example.com',
    role: 'Estudiante',
    status: 'Suspendido',
    registrationDate: '2024-03-10',
    avatar: '/placeholder.svg?height=32&width=32'
  }
])

const pagination = ref({
  rowsPerPage: 10
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.value.toLowerCase())
    const matchesRole = !filterRole.value || user.role === filterRole.value
    const matchesStatus = !filterStatus.value || user.status === filterStatus.value
    
    return matchesSearch && matchesRole && matchesStatus
  })
})

const getRoleColor = (role) => {
  const colors = {
    'Estudiante': 'info',
    'Propietario': 'purple',
    'Administrador': 'deep-orange'
  }
  return colors[role] || 'grey'
}

const getStatusColor = (status) => {
  const colors = {
    'Activo': 'positive',
    'Suspendido': 'warning',
    'Inactivo': 'grey'
  }
  return colors[status] || 'grey'
}

const editUser = (user) => {
  editingUser.value = { ...user }
  showEditDialog.value = true
}

const saveUser = () => {
  const index = users.value.findIndex(u => u.id === editingUser.value.id)
  if (index !== -1) {
    users.value[index] = { ...editingUser.value }
    $q.notify({
      color: 'positive',
      message: 'Usuario actualizado exitosamente',
      icon: 'check'
    })
  }
  showEditDialog.value = false
}

const toggleUserStatus = (user) => {
  const newStatus = user.status === 'Activo' ? 'Suspendido' : 'Activo'
  const action = newStatus === 'Suspendido' ? 'suspender' : 'activar'
  
  $q.dialog({
    title: 'Confirmar Acción',
    message: `¿Estás seguro de que quieres ${action} a ${user.name}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    user.status = newStatus
    $q.notify({
      color: 'positive',
      message: `Usuario ${action === 'suspender' ? 'suspendido' : 'activado'} exitosamente`,
      icon: 'check'
    })
  })
}

const deleteUser = (user) => {
  $q.dialog({
    title: 'Eliminar Usuario',
    message: `¿Estás seguro de que quieres eliminar a ${user.name}? Esta acción no se puede deshacer.`,
    cancel: true,
    persistent: true,
    ok: {
      color: 'negative',
      label: 'Eliminar'
    }
  }).onOk(() => {
    users.value = users.value.filter(u => u.id !== user.id)
    $q.notify({
      color: 'negative',
      message: 'Usuario eliminado exitosamente',
      icon: 'delete'
    })
  })
}
</script>
