# Casos de Uso Detallados - Rol Fundador/Propietario

## UC1: Registrarse como Propietario
**Actor:** Propietario
**Descripción:** El propietario se registra en RoomieHub como fundador de un piso.
**Precondiciones:** Ninguna
**Flujo Principal:**
1. El propietario accede a la página de registro
2. Selecciona el tipo de usuario "Propietario"
3. Proporciona información personal (nombre, email, contraseña)
4. Acepta términos y condiciones
5. El sistema crea la cuenta y envía email de verificación

**Postcondiciones:** El propietario tiene una cuenta activa en el sistema

---

## UC2: Crear Nuevo Piso
**Actor:** Propietario
**Descripción:** El propietario crea un nuevo piso en RoomieHub con toda la información necesaria.
**Precondiciones:** El propietario debe estar registrado y autenticado
**Flujo Principal:**
1. El propietario accede a la opción "Crear Nuevo Piso"
2. Completa el formulario con información del piso:
   - Nombre del piso
   - Dirección completa
   - Número de habitaciones y baños
   - Área en m²
   - Características (amueblado, internet, calefacción, A/C)
   - Servicios cercanos
   - Plano del piso (imagen)
   - Descripción
3. El sistema valida la información
4. El sistema crea el piso y lo asocia al propietario

**Postcondiciones:** El piso está creado y disponible para gestión

---

## UC3: Editar Información del Piso
**Actor:** Propietario
**Descripción:** El propietario modifica la información de un piso existente.
**Precondiciones:** El propietario debe ser el dueño del piso
**Flujo Principal:**
1. El propietario selecciona el piso a editar
2. Modifica la información deseada
3. Guarda los cambios
4. El sistema actualiza la información

**Postcondiciones:** La información del piso está actualizada

---

## UC4: Publicar Piso Disponible
**Actor:** Propietario
**Descripción:** El propietario publica un piso para que los estudiantes puedan verlo y solicitarlo.
**Precondiciones:** El piso debe estar creado en el sistema
**Flujo Principal:**
1. El propietario accede al piso
2. Marca habitaciones como disponibles
3. Establece precio y condiciones
4. Publica el anuncio
5. El sistema hace visible el piso a estudiantes

**Postcondiciones:** El piso es visible para estudiantes en búsqueda

---

## UC5: Gestionar Solicitudes de Estudiantes
**Actor:** Propietario
**Descripción:** El propietario revisa las solicitudes recibidas de estudiantes interesados.
**Precondiciones:** Debe haber solicitudes pendientes
**Flujo Principal:**
1. El propietario accede a "Solicitudes Pendientes"
2. Ve la lista de estudiantes interesados
3. Revisa el perfil de cada estudiante
4. Puede contactar al estudiante para más información

**Postcondiciones:** El propietario conoce los candidatos disponibles

---

## UC6: Aceptar/Rechazar Estudiantes
**Actor:** Propietario
**Descripción:** El propietario acepta o rechaza solicitudes de estudiantes.
**Precondiciones:** Debe haber solicitudes pendientes
**Flujo Principal:**
1. El propietario revisa una solicitud
2. Decide aceptar o rechazar
3. Si acepta: el estudiante se añade al piso
4. Si rechaza: se envía notificación al estudiante
5. El sistema actualiza el estado de la solicitud

**Postcondiciones:** La solicitud está procesada y el estudiante notificado

---

## UC7: Ver Lista de Inquilinos Actuales
**Actor:** Propietario
**Descripción:** El propietario visualiza todos los estudiantes que viven en el piso.
**Precondiciones:** El propietario debe tener un piso con inquilinos
**Flujo Principal:**
1. El propietario accede a "Mis Inquilinos"
2. Ve la lista completa de residentes
3. Puede ver detalles de cada inquilino

**Postcondiciones:** El propietario tiene visibilidad de sus inquilinos

---

## UC8: Gestionar Gastos del Piso
**Actor:** Propietario
**Descripción:** El propietario visualiza y gestiona todos los gastos asociados al piso.
**Precondiciones:** El propietario debe tener un piso activo
**Flujo Principal:**
1. El propietario accede a "Gastos"
2. Ve el listado de todos los gastos
3. Puede filtrar por categoría, fecha, o inquilino
4. Ve estadísticas de gastos

**Postcondiciones:** El propietario tiene control sobre los gastos

---

## UC9: Crear Gasto Común
**Actor:** Propietario
**Descripción:** El propietario crea un nuevo gasto que debe ser dividido entre los inquilinos.
**Precondiciones:** El propietario debe tener un piso con inquilinos
**Flujo Principal:**
1. El propietario accede a "Crear Gasto"
2. Completa el formulario:
   - Descripción del gasto
   - Cantidad total
   - Categoría
   - Fecha
   - Método de división (equitativo, proporcional, etc.)
3. El sistema calcula la parte de cada inquilino
4. Se notifica a los inquilinos

**Postcondiciones:** El gasto está registrado y los inquilinos notificados

---

## UC10: Ver Balance de Pagos
**Actor:** Propietario
**Descripción:** El propietario visualiza el balance de pagos de cada inquilino.
**Precondiciones:** Debe haber gastos registrados
**Flujo Principal:**
1. El propietario accede a "Balance de Pagos"
2. Ve quién debe dinero y cuánto
3. Ve quién ha pagado su parte
4. Puede marcar pagos como recibidos

**Postcondiciones:** El propietario conoce el estado financiero del piso

---

## UC11: Enviar Recordatorios de Pago
**Actor:** Propietario
**Descripción:** El propietario envía recordatorios a inquilinos con pagos pendientes.
**Precondiciones:** Debe haber pagos pendientes
**Flujo Principal:**
1. El propietario identifica inquilinos con deudas
2. Selecciona a quién enviar recordatorio
3. Personaliza el mensaje (opcional)
4. Envía el recordatorio
5. El sistema notifica al inquilino

**Postcondiciones:** El inquilino recibe el recordatorio

---

## UC12: Ver Reseñas de Estudiantes
**Actor:** Propietario
**Descripción:** El propietario visualiza las reseñas que ha recibido de estudiantes.
**Precondiciones:** Debe haber reseñas publicadas
**Flujo Principal:**
1. El propietario accede a "Mis Reseñas"
2. Ve todas las reseñas recibidas
3. Puede responder a las reseñas

**Postcondiciones:** El propietario conoce su reputación

---

## UC13: Dejar Reseña a Estudiante
**Actor:** Propietario
**Descripción:** El propietario deja una reseña sobre un estudiante que vivió en su piso.
**Precondiciones:** El estudiante debe haber sido inquilino
**Flujo Principal:**
1. El propietario selecciona al estudiante
2. Completa el formulario de reseña:
   - Calificación (estrellas)
   - Comentario sobre comportamiento
   - Puntualidad de pagos
   - Cuidado del piso
3. Publica la reseña
4. El sistema asocia la reseña al perfil del estudiante

**Postcondiciones:** La reseña está publicada y visible para otros propietarios

---

## UC14: Gestionar Servicios del Piso
**Actor:** Propietario
**Descripción:** El propietario añade, edita o elimina servicios cercanos al piso.
**Precondiciones:** El piso debe estar creado
**Flujo Principal:**
1. El propietario accede a "Servicios"
2. Añade nuevos servicios cercanos (supermercados, transporte, etc.)
3. Edita servicios existentes
4. Elimina servicios que ya no aplican

**Postcondiciones:** La información de servicios está actualizada

---

## UC15: Actualizar Disponibilidad de Habitaciones
**Actor:** Propietario
**Descripción:** El propietario marca habitaciones como disponibles u ocupadas.
**Precondiciones:** El piso debe tener habitaciones registradas
**Flujo Principal:**
1. El propietario accede a "Habitaciones"
2. Selecciona una habitación
3. Cambia su estado (disponible/ocupada)
4. Actualiza precio si es necesario
5. El sistema actualiza la disponibilidad

**Postcondiciones:** La disponibilidad está actualizada

---

## UC16: Ver Estadísticas del Piso
**Actor:** Propietario
**Descripción:** El propietario visualiza estadísticas y métricas del piso.
**Precondiciones:** Debe haber datos históricos
**Flujo Principal:**
1. El propietario accede a "Estadísticas"
2. Ve métricas como:
   - Tasa de ocupación
   - Gastos mensuales promedio
   - Tiempo promedio de estadía
   - Calificación promedio
3. Puede filtrar por período de tiempo

**Postcondiciones:** El propietario tiene insights sobre su piso

---

## UC17: Configurar Reglas del Piso
**Actor:** Propietario
**Descripción:** El propietario establece reglas y políticas del piso.
**Precondiciones:** El piso debe estar creado
**Flujo Principal:**
1. El propietario accede a "Reglas del Piso"
2. Define reglas como:
   - Horarios de silencio
   - Política de visitas
   - Uso de áreas comunes
   - Política de limpieza
3. Guarda las reglas
4. Los inquilinos son notificados

**Postcondiciones:** Las reglas están establecidas y comunicadas

---

## UC18: Eliminar Inquilino
**Actor:** Propietario
**Descripción:** El propietario elimina a un inquilino del piso.
**Precondiciones:** El inquilino debe estar registrado en el piso
**Flujo Principal:**
1. El propietario selecciona al inquilino
2. Solicita eliminación
3. Proporciona razón (opcional)
4. Confirma la acción
5. El sistema elimina al inquilino y libera la habitación
6. Se notifica al inquilino

**Postcondiciones:** El inquilino ya no forma parte del piso
