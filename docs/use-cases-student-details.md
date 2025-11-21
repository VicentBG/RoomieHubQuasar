# Casos de Uso Detallados - Rol Estudiante

## UC1: Registrarse como Estudiante
**Actor:** Estudiante
**Descripción:** El estudiante se registra en RoomieHub para buscar piso o gestionar su vivienda actual.
**Precondiciones:** Ninguna
**Flujo Principal:**
1. El estudiante accede a la página de registro
2. Selecciona el tipo de usuario "Estudiante"
3. Proporciona información personal (nombre, email, contraseña)
4. Acepta términos y condiciones
5. El sistema crea la cuenta y envía email de verificación

**Postcondiciones:** El estudiante tiene una cuenta activa en el sistema

---

## UC2: Crear Perfil de Estudiante
**Actor:** Estudiante
**Descripción:** El estudiante completa su perfil con información personal y preferencias.
**Precondiciones:** El estudiante debe estar registrado
**Flujo Principal:**
1. El estudiante accede a "Mi Perfil"
2. Añade información como:
   - Universidad y carrera
   - Año académico
   - Foto de perfil
   - Hobbies e intereses
   - Preferencias de convivencia (fumador/no fumador, mascotas, etc.)
   - Presupuesto disponible
3. Guarda el perfil
4. El sistema valida y almacena la información

**Postcondiciones:** El perfil del estudiante está completo y visible para propietarios

---

## UC3: Buscar Pisos Disponibles
**Actor:** Estudiante
**Descripción:** El estudiante busca pisos disponibles en RoomieHub.
**Precondiciones:** El estudiante debe estar autenticado
**Flujo Principal:**
1. El estudiante accede a "Buscar Pisos"
2. El sistema muestra todos los pisos disponibles
3. Ve información básica de cada piso (fotos, precio, ubicación)
4. Puede guardar pisos como favoritos

**Postcondiciones:** El estudiante visualiza opciones de vivienda

---

## UC4: Filtrar Búsqueda de Pisos
**Actor:** Estudiante
**Descripción:** El estudiante aplica filtros para refinar su búsqueda de pisos.
**Precondiciones:** El estudiante debe estar en la página de búsqueda
**Flujo Principal:**
1. El estudiante accede a los filtros
2. Aplica criterios como:
   - Rango de precio
   - Ubicación/ciudad
   - Número de habitaciones
   - Servicios (amueblado, internet, etc.)
   - Distancia a universidad
3. El sistema muestra solo pisos que cumplen los criterios

**Postcondiciones:** La búsqueda está refinada según preferencias

---

## UC5: Ver Detalles de Piso
**Actor:** Estudiante
**Descripción:** El estudiante visualiza información detallada de un piso específico.
**Precondiciones:** Debe haber pisos disponibles
**Flujo Principal:**
1. El estudiante selecciona un piso
2. Ve información completa:
   - Fotos y plano
   - Descripción detallada
   - Características y servicios
   - Ubicación en mapa
   - Información del propietario
   - Reseñas de inquilinos anteriores
   - Precio y condiciones

**Postcondiciones:** El estudiante tiene información completa para decidir

---

## UC6: Solicitar Unirse a Piso
**Actor:** Estudiante
**Descripción:** El estudiante envía una solicitud para unirse a un piso.
**Precondiciones:** El estudiante debe haber visto el detalle del piso
**Flujo Principal:**
1. El estudiante hace clic en "Solicitar Habitación"
2. Completa un formulario con:
   - Mensaje para el propietario
   - Fecha de entrada deseada
   - Duración de estadía estimada
3. Envía la solicitud
4. El sistema notifica al propietario
5. El estudiante recibe confirmación

**Postcondiciones:** La solicitud está enviada y pendiente de aprobación

---

## UC7: Ver Estado de Solicitudes
**Actor:** Estudiante
**Descripción:** El estudiante revisa el estado de sus solicitudes enviadas.
**Precondiciones:** El estudiante debe haber enviado solicitudes
**Flujo Principal:**
1. El estudiante accede a "Mis Solicitudes"
2. Ve una lista de todas sus solicitudes
3. Ve el estado de cada una (pendiente, aceptada, rechazada)
4. Puede cancelar solicitudes pendientes

**Postcondiciones:** El estudiante conoce el estado de sus aplicaciones

---

## UC8: Aceptar Invitación a Piso
**Actor:** Estudiante
**Descripción:** El estudiante acepta una invitación de un propietario.
**Precondiciones:** El propietario debe haber aceptado la solicitud
**Flujo Principal:**
1. El estudiante recibe notificación de aceptación
2. Revisa los detalles finales
3. Acepta la invitación
4. El sistema lo añade al piso
5. Obtiene acceso a las funcionalidades del piso

**Postcondiciones:** El estudiante forma parte del piso

---

## UC9: Ver Lista de Compañeros de Piso
**Actor:** Estudiante
**Descripción:** El estudiante visualiza información de sus compañeros de piso.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Mis Compañeros"
2. Ve la lista de todos los residentes
3. Puede ver perfiles básicos de cada compañero
4. Puede contactar a sus compañeros

**Postcondiciones:** El estudiante conoce a sus compañeros

---

## UC10: Gestionar Lista de Compras
**Actor:** Estudiante
**Descripción:** El estudiante visualiza y gestiona la lista de compras compartida del piso.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Lista de Compras"
2. Ve todos los artículos pendientes
3. Puede buscar artículos específicos
4. Ve quién añadió cada artículo

**Postcondiciones:** El estudiante tiene visibilidad de lo que se necesita comprar

---

## UC11: Añadir Artículo a Lista de Compras
**Actor:** Estudiante
**Descripción:** El estudiante añade un nuevo artículo a la lista de compras compartida.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Lista de Compras"
2. Hace clic en "Añadir Artículo"
3. Completa el formulario:
   - Nombre del artículo
   - Cantidad
   - Categoría
   - Notas adicionales (opcional)
4. Guarda el artículo
5. El sistema notifica a los demás compañeros

**Postcondiciones:** El artículo está en la lista compartida

---

## UC12: Marcar Artículo como Comprado
**Actor:** Estudiante
**Descripción:** El estudiante marca un artículo de la lista como comprado.
**Precondiciones:** Debe haber artículos en la lista
**Flujo Principal:**
1. El estudiante accede a la lista de compras
2. Selecciona el artículo comprado
3. Lo marca como "Comprado"
4. Opcionalmente añade el precio pagado
5. El sistema actualiza la lista y notifica a los compañeros

**Postcondiciones:** El artículo está marcado como comprado

---

## UC13: Ver Gastos del Piso
**Actor:** Estudiante
**Descripción:** El estudiante visualiza todos los gastos del piso.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Gastos"
2. Ve el listado de todos los gastos
3. Puede filtrar por categoría o fecha
4. Ve quién pagó cada gasto
5. Ve su parte en cada gasto

**Postcondiciones:** El estudiante conoce los gastos del piso

---

## UC14: Crear Gasto Compartido
**Actor:** Estudiante
**Descripción:** El estudiante registra un gasto que debe ser compartido.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Crear Gasto"
2. Completa el formulario:
   - Descripción del gasto
   - Cantidad pagada
   - Categoría
   - Fecha
   - Método de división
3. Guarda el gasto
4. El sistema calcula la parte de cada compañero
5. Se notifica a todos los involucrados

**Postcondiciones:** El gasto está registrado y los compañeros notificados

---

## UC15: Marcar Gasto como Pagado
**Actor:** Estudiante
**Descripción:** El estudiante indica que ha pagado su parte de un gasto.
**Precondiciones:** Debe tener gastos pendientes
**Flujo Principal:**
1. El estudiante accede a "Mis Gastos Pendientes"
2. Selecciona el gasto pagado
3. Lo marca como "Pagado"
4. Opcionalmente añade comprobante o nota
5. El sistema actualiza el balance

**Postcondiciones:** El gasto está marcado como pagado

---

## UC16: Ver Balance Personal
**Actor:** Estudiante
**Descripción:** El estudiante visualiza su balance de deudas y pagos.
**Precondiciones:** Debe haber gastos registrados
**Flujo Principal:**
1. El estudiante accede a "Mi Balance"
2. Ve cuánto debe en total
3. Ve a quién le debe y cuánto
4. Ve quién le debe dinero
5. Ve historial de pagos

**Postcondiciones:** El estudiante conoce su situación financiera

---

## UC17: Gestionar Tareas del Hogar
**Actor:** Estudiante
**Descripción:** El estudiante visualiza las tareas del hogar del piso.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Tareas"
2. Ve todas las tareas (pendientes, en progreso, completadas)
3. Ve quién está asignado a cada tarea
4. Puede filtrar por estado o responsable

**Postcondiciones:** El estudiante conoce las tareas del hogar

---

## UC18: Crear Tarea
**Actor:** Estudiante
**Descripción:** El estudiante crea una nueva tarea del hogar.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Crear Tarea"
2. Completa el formulario:
   - Título de la tarea
   - Descripción
   - Prioridad
   - Fecha límite
3. Guarda la tarea
4. El sistema notifica a los compañeros

**Postcondiciones:** La tarea está creada y visible para todos

---

## UC19: Asignar Tarea a Compañero
**Actor:** Estudiante
**Descripción:** El estudiante asigna una tarea a un compañero de piso.
**Precondiciones:** Debe haber tareas sin asignar
**Flujo Principal:**
1. El estudiante selecciona una tarea
2. Elige al compañero responsable
3. Opcionalmente añade un comentario
4. Asigna la tarea
5. El sistema notifica al compañero asignado

**Postcondiciones:** La tarea tiene un responsable asignado

---

## UC20: Marcar Tarea como Completada
**Actor:** Estudiante
**Descripción:** El estudiante marca una tarea como completada.
**Precondiciones:** Debe tener tareas asignadas
**Flujo Principal:**
1. El estudiante accede a "Mis Tareas"
2. Selecciona la tarea completada
3. La marca como "Completada"
4. Opcionalmente añade comentario o foto
5. El sistema actualiza el estado y notifica a los demás

**Postcondiciones:** La tarea está marcada como completada

---

## UC21: Dejar Reseña al Propietario
**Actor:** Estudiante
**Descripción:** El estudiante deja una reseña sobre el propietario y el piso.
**Precondiciones:** El estudiante debe haber vivido en el piso
**Flujo Principal:**
1. El estudiante accede al perfil del propietario
2. Hace clic en "Dejar Reseña"
3. Completa el formulario:
   - Calificación general (estrellas)
   - Calidad del piso
   - Comunicación con el propietario
   - Relación calidad-precio
   - Comentario detallado
4. Publica la reseña
5. El sistema asocia la reseña al propietario

**Postcondiciones:** La reseña está publicada y visible

---

## UC22: Dejar Reseña a Compañero de Piso
**Actor:** Estudiante
**Descripción:** El estudiante deja una reseña sobre un compañero de piso.
**Precondiciones:** Debe haber convivido con el compañero
**Flujo Principal:**
1. El estudiante accede al perfil del compañero
2. Hace clic en "Dejar Reseña"
3. Completa el formulario:
   - Calificación (estrellas)
   - Limpieza
   - Respeto
   - Convivencia
   - Comentario
4. Publica la reseña

**Postcondiciones:** La reseña está asociada al perfil del compañero

---

## UC23: Ver Reseñas Recibidas
**Actor:** Estudiante
**Descripción:** El estudiante visualiza las reseñas que ha recibido.
**Precondiciones:** Debe haber reseñas publicadas sobre él
**Flujo Principal:**
1. El estudiante accede a "Mis Reseñas"
2. Ve todas las reseñas recibidas
3. Puede filtrar por tipo (de propietarios o compañeros)
4. Puede responder a las reseñas

**Postcondiciones:** El estudiante conoce su reputación

---

## UC24: Actualizar Perfil Personal
**Actor:** Estudiante
**Descripción:** El estudiante modifica su información personal.
**Precondiciones:** El estudiante debe estar registrado
**Flujo Principal:**
1. El estudiante accede a "Editar Perfil"
2. Modifica la información deseada
3. Guarda los cambios
4. El sistema valida y actualiza la información

**Postcondiciones:** El perfil está actualizado

---

## UC25: Abandonar Piso
**Actor:** Estudiante
**Descripción:** El estudiante se da de baja de un piso.
**Precondiciones:** El estudiante debe pertenecer a un piso
**Flujo Principal:**
1. El estudiante accede a "Configuración del Piso"
2. Selecciona "Abandonar Piso"
3. Proporciona fecha de salida
4. Confirma la acción
5. El sistema verifica que no haya deudas pendientes
6. Si todo está correcto, se elimina del piso
7. Se notifica al propietario y compañeros

**Postcondiciones:** El estudiante ya no forma parte del piso

---

## UC26: Ver Estadísticas Personales
**Actor:** Estudiante
**Descripción:** El estudiante visualiza estadísticas sobre su participación.
**Precondiciones:** Debe haber datos históricos
**Flujo Principal:**
1. El estudiante accede a "Mis Estadísticas"
2. Ve métricas como:
   - Gastos mensuales promedio
   - Tareas completadas
   - Puntualidad de pagos
   - Calificación promedio recibida
3. Puede ver gráficos y tendencias

**Postcondiciones:** El estudiante tiene insights sobre su participación

---

## UC27: Configurar Notificaciones
**Actor:** Estudiante
**Descripción:** El estudiante personaliza sus preferencias de notificaciones.
**Precondiciones:** El estudiante debe estar registrado
**Flujo Principal:**
1. El estudiante accede a "Configuración de Notificaciones"
2. Selecciona qué tipo de notificaciones recibir:
   - Nuevos gastos
   - Tareas asignadas
   - Mensajes de compañeros
   - Recordatorios de pago
3. Elige el medio (email, push, en app)
4. Guarda las preferencias

**Postcondiciones:** Las notificaciones están configuradas según preferencias
