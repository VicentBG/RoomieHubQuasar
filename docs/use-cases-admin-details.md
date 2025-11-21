# Casos de Uso Detallados - Rol Administrador

## UC1: Iniciar Sesión como Admin
**Actor:** Administrador
**Descripción:** El administrador inicia sesión en el panel de administración de RoomieHub.
**Precondiciones:** El administrador debe tener credenciales válidas
**Flujo Principal:**
1. El administrador accede a la URL del panel de admin
2. Ingresa sus credenciales (usuario y contraseña)
3. Completa autenticación de dos factores (2FA)
4. El sistema valida las credenciales
5. Accede al dashboard de administración

**Postcondiciones:** El administrador tiene acceso al panel de control

---

## UC2: Ver Dashboard de Administración
**Actor:** Administrador
**Descripción:** El administrador visualiza el dashboard principal con métricas clave.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede al dashboard
2. Ve métricas principales:
   - Total de usuarios activos
   - Pisos registrados
   - Reportes pendientes
   - Actividad reciente
   - Gráficos de crecimiento
3. Puede navegar a secciones específicas

**Postcondiciones:** El administrador tiene visión general del sistema

---

## UC3: Gestionar Usuarios
**Actor:** Administrador
**Descripción:** El administrador accede al módulo de gestión de usuarios.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede a "Gestión de Usuarios"
2. Ve opciones para:
   - Ver lista de usuarios
   - Buscar usuarios
   - Filtrar por tipo (estudiante/propietario)
   - Filtrar por estado (activo/suspendido)

**Postcondiciones:** El administrador puede gestionar usuarios

---

## UC4: Ver Lista de Usuarios
**Actor:** Administrador
**Descripción:** El administrador visualiza todos los usuarios registrados en RoomieHub.
**Precondiciones:** Debe haber usuarios registrados
**Flujo Principal:**
1. El administrador accede a "Lista de Usuarios"
2. Ve tabla con información de usuarios:
   - Nombre y email
   - Tipo de usuario
   - Fecha de registro
   - Estado de cuenta
   - Última actividad
3. Puede buscar y filtrar usuarios
4. Puede ordenar por diferentes columnas
5. Puede exportar la lista

**Postcondiciones:** El administrador visualiza todos los usuarios

---

## UC5: Suspender/Activar Usuario
**Actor:** Administrador
**Descripción:** El administrador suspende o activa una cuenta de usuario.
**Precondiciones:** El usuario debe existir en el sistema
**Flujo Principal:**
1. El administrador busca al usuario
2. Accede al perfil del usuario
3. Selecciona "Suspender Cuenta" o "Activar Cuenta"
4. Proporciona razón para la acción
5. Confirma la acción
6. El sistema actualiza el estado del usuario
7. Se notifica al usuario

**Postcondiciones:** El estado del usuario ha cambiado

---

## UC6: Eliminar Usuario
**Actor:** Administrador
**Descripción:** El administrador elimina permanentemente una cuenta de usuario.
**Precondiciones:** El usuario debe existir y cumplir criterios de eliminación
**Flujo Principal:**
1. El administrador busca al usuario
2. Selecciona "Eliminar Usuario"
3. El sistema verifica que no haya obligaciones pendientes
4. El administrador confirma la eliminación
5. El sistema elimina todos los datos del usuario
6. Se genera un log de auditoría

**Postcondiciones:** El usuario ha sido eliminado del sistema

---

## UC7: Verificar Identidad de Usuario
**Actor:** Administrador
**Descripción:** El administrador verifica la identidad de un usuario.
**Precondiciones:** El usuario debe haber solicitado verificación
**Flujo Principal:**
1. El administrador accede a "Solicitudes de Verificación"
2. Revisa documentos del usuario:
   - DNI/Pasaporte
   - Comprobante de matrícula universitaria
   - Foto de perfil
3. Valida la autenticidad de los documentos
4. Aprueba o rechaza la verificación
5. El sistema marca al usuario como verificado
6. Se notifica al usuario

**Postcondiciones:** El usuario tiene estado de verificación actualizado

---

## UC8: Gestionar Pisos
**Actor:** Administrador
**Descripción:** El administrador accede al módulo de gestión de pisos.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede a "Gestión de Pisos"
2. Ve opciones para:
   - Ver todos los pisos
   - Aprobar pisos pendientes
   - Buscar pisos
   - Ver pisos reportados

**Postcondiciones:** El administrador puede gestionar pisos

---

## UC9: Aprobar/Rechazar Pisos
**Actor:** Administrador
**Descripción:** El administrador revisa y aprueba o rechaza pisos nuevos.
**Precondiciones:** Debe haber pisos pendientes de aprobación
**Flujo Principal:**
1. El administrador accede a "Pisos Pendientes"
2. Revisa la información del piso:
   - Fotos y descripción
   - Información del propietario
   - Ubicación y características
3. Verifica que cumple políticas de RoomieHub
4. Aprueba o rechaza el piso
5. Si rechaza, proporciona razón
6. El sistema actualiza el estado
7. Se notifica al propietario

**Postcondiciones:** El piso está aprobado o rechazado

---

## UC10: Editar Información de Piso
**Actor:** Administrador
**Descripción:** El administrador modifica información de un piso.
**Precondiciones:** El piso debe existir en el sistema
**Flujo Principal:**
1. El administrador busca el piso
2. Accede a "Editar Piso"
3. Modifica la información necesaria
4. Guarda los cambios
5. El sistema registra quién hizo el cambio
6. Se notifica al propietario

**Postcondiciones:** La información del piso está actualizada

---

## UC11: Eliminar Piso
**Actor:** Administrador
**Descripción:** El administrador elimina un piso del sistema.
**Precondiciones:** El piso debe existir y cumplir criterios de eliminación
**Flujo Principal:**
1. El administrador busca el piso
2. Verifica que no haya inquilinos activos
3. Selecciona "Eliminar Piso"
4. Proporciona razón
5. Confirma la eliminación
6. El sistema elimina el piso
7. Se notifica al propietario

**Postcondiciones:** El piso ha sido eliminado

---

## UC12: Destacar Piso
**Actor:** Administrador
**Descripción:** El administrador marca un piso como destacado para darle mayor visibilidad.
**Precondiciones:** El piso debe estar aprobado
**Flujo Principal:**
1. El administrador busca el piso
2. Selecciona "Destacar Piso"
3. Define período de destacado
4. Confirma la acción
5. El piso aparece en sección destacada
6. Se notifica al propietario

**Postcondiciones:** El piso está destacado en la plataforma

---

## UC13: Gestionar Reportes
**Actor:** Administrador
**Descripción:** El administrador accede al módulo de gestión de reportes.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede a "Gestión de Reportes"
2. Ve dashboard de reportes:
   - Reportes pendientes
   - Reportes en investigación
   - Reportes resueltos
   - Prioridad de cada reporte

**Postcondiciones:** El administrador puede gestionar reportes

---

## UC14: Ver Reportes de Usuarios
**Actor:** Administrador
**Descripción:** El administrador visualiza todos los reportes realizados por usuarios.
**Precondiciones:** Debe haber reportes en el sistema
**Flujo Principal:**
1. El administrador accede a "Reportes"
2. Ve lista de reportes con:
   - Usuario que reporta
   - Usuario/piso reportado
   - Tipo de reporte
   - Fecha y estado
   - Nivel de prioridad
3. Puede filtrar por estado o tipo
4. Puede asignar reportes a investigación

**Postcondiciones:** El administrador visualiza los reportes

---

## UC15: Investigar Reporte
**Actor:** Administrador
**Descripción:** El administrador investiga un reporte en detalle.
**Precondiciones:** Debe existir un reporte
**Flujo Principal:**
1. El administrador selecciona un reporte
2. Revisa la información proporcionada
3. Accede a perfiles involucrados
4. Revisa historial de interacciones
5. Puede contactar a las partes para más información
6. Documenta hallazgos
7. Cambia estado a "En Investigación"

**Postcondiciones:** El reporte está siendo investigado

---

## UC16: Resolver/Cerrar Reporte
**Actor:** Administrador
**Descripción:** El administrador resuelve y cierra un reporte.
**Precondiciones:** El reporte debe haber sido investigado
**Flujo Principal:**
1. El administrador completa la investigación
2. Toma una decisión sobre el reporte
3. Documenta la resolución
4. Marca el reporte como "Resuelto"
5. Se notifica a las partes involucradas

**Postcondiciones:** El reporte está cerrado

---

## UC17: Tomar Acción sobre Reporte
**Actor:** Administrador
**Descripción:** El administrador toma medidas basadas en un reporte.
**Precondiciones:** El reporte debe ser válido
**Flujo Principal:**
1. El administrador determina acción necesaria:
   - Advertencia al usuario
   - Suspensión temporal
   - Eliminación de contenido
   - Ban permanente
2. Ejecuta la acción
3. Documenta la decisión
4. Notifica a las partes
5. Cierra el reporte

**Postcondiciones:** Se ha tomado acción correctiva

---

## UC18: Gestionar Reseñas
**Actor:** Administrador
**Descripción:** El administrador accede al módulo de gestión de reseñas.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede a "Gestión de Reseñas"
2. Ve todas las reseñas del sistema
3. Puede filtrar por:
   - Reseñas reportadas
   - Calificación
   - Fecha
   - Usuario

**Postcondiciones:** El administrador puede gestionar reseñas

---

## UC19: Moderar Reseñas
**Actor:** Administrador
**Descripción:** El administrador revisa reseñas reportadas o sospechosas.
**Precondiciones:** Debe haber reseñas para moderar
**Flujo Principal:**
1. El administrador accede a "Reseñas Pendientes de Moderación"
2. Revisa el contenido de cada reseña
3. Verifica si cumple políticas de contenido
4. Determina si es apropiada
5. Aprueba o marca para eliminación

**Postcondiciones:** Las reseñas están moderadas

---

## UC20: Eliminar Reseña Inapropiada
**Actor:** Administrador
**Descripción:** El administrador elimina una reseña que viola políticas.
**Precondiciones:** La reseña debe existir
**Flujo Principal:**
1. El administrador identifica reseña inapropiada
2. Documenta la razón de eliminación
3. Elimina la reseña
4. Notifica al autor
5. Si es reincidente, aplica sanción al usuario
6. Registra la acción en logs

**Postcondiciones:** La reseña ha sido eliminada

---

## UC21: Ver Estadísticas del Sistema
**Actor:** Administrador
**Descripción:** El administrador visualiza estadísticas generales de RoomieHub.
**Precondiciones:** Debe haber datos en el sistema
**Flujo Principal:**
1. El administrador accede a "Estadísticas"
2. Ve métricas como:
   - Usuarios registrados (total y nuevos)
   - Pisos activos
   - Tasa de ocupación
   - Gastos promedio
   - Actividad por región
   - Crecimiento temporal
3. Puede seleccionar período de tiempo

**Postcondiciones:** El administrador visualiza estadísticas

---

## UC22: Generar Reportes
**Actor:** Administrador
**Descripción:** El administrador genera reportes personalizados del sistema.
**Precondiciones:** Debe haber datos para reportar
**Flujo Principal:**
1. El administrador accede a "Generar Reportes"
2. Selecciona tipo de reporte:
   - Actividad de usuarios
   - Pisos publicados
   - Transacciones
   - Reportes de problemas
3. Define parámetros y filtros
4. Genera el reporte
5. Puede exportar en diferentes formatos (PDF, Excel, CSV)

**Postcondiciones:** El reporte está generado

---

## UC23: Ver Métricas de Uso
**Actor:** Administrador
**Descripción:** El administrador visualiza métricas de uso de la plataforma.
**Precondiciones:** El sistema debe estar recopilando métricas
**Flujo Principal:**
1. El administrador accede a "Métricas de Uso"
2. Ve información como:
   - Usuarios activos diarios/mensuales
   - Páginas más visitadas
   - Tiempo promedio de sesión
   - Tasa de conversión
   - Funcionalidades más usadas
3. Ve gráficos y tendencias

**Postcondiciones:** El administrador conoce el uso de la plataforma

---

## UC24: Analizar Tendencias
**Actor:** Administrador
**Descripción:** El administrador analiza tendencias y patrones en los datos.
**Precondiciones:** Debe haber datos históricos
**Flujo Principal:**
1. El administrador accede a "Análisis de Tendencias"
2. Selecciona métricas a analizar
3. Ve visualizaciones de tendencias:
   - Crecimiento de usuarios
   - Patrones estacionales
   - Comportamiento de búsqueda
   - Preferencias de ubicación
4. Identifica insights para mejorar el servicio

**Postcondiciones:** El administrador tiene insights del negocio

---

## UC25: Gestionar Contenido
**Actor:** Administrador
**Descripción:** El administrador gestiona el contenido de la plataforma.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede a "Gestión de Contenido"
2. Puede editar:
   - Página de inicio
   - Sección FAQ
   - Blog/Noticias
   - Políticas de privacidad
   - Términos de servicio

**Postcondiciones:** El contenido está actualizado

---

## UC26: Crear Anuncios del Sistema
**Actor:** Administrador
**Descripción:** El administrador crea anuncios para mostrar a los usuarios.
**Precondiciones:** El administrador debe tener permisos
**Flujo Principal:**
1. El administrador accede a "Crear Anuncio"
2. Define:
   - Título y mensaje
   - Tipo de anuncio (información, advertencia, mantenimiento)
   - Audiencia objetivo (todos, estudiantes, propietarios)
   - Duración de visualización
3. Publica el anuncio
4. El sistema muestra el anuncio a los usuarios

**Postcondiciones:** El anuncio está publicado

---

## UC27: Enviar Notificaciones Masivas
**Actor:** Administrador
**Descripción:** El administrador envía notificaciones a múltiples usuarios.
**Precondiciones:** Debe haber usuarios registrados
**Flujo Principal:**
1. El administrador accede a "Notificaciones Masivas"
2. Define:
   - Destinatarios (criterios de filtrado)
   - Mensaje
   - Canal (email, push, in-app)
   - Programación (inmediata o programada)
3. Revisa la notificación
4. Envía la notificación
5. El sistema entrega las notificaciones

**Postcondiciones:** Los usuarios reciben la notificación

---

## UC28: Actualizar Términos y Condiciones
**Actor:** Administrador
**Descripción:** El administrador actualiza los términos y condiciones de RoomieHub.
**Precondiciones:** El administrador debe tener permisos
**Flujo Principal:**
1. El administrador accede a "Términos y Condiciones"
2. Edita el contenido
3. Marca la versión
4. Publica los nuevos términos
5. El sistema notifica a todos los usuarios
6. Los usuarios deben aceptar nuevamente

**Postcondiciones:** Los términos están actualizados

---

## UC29: Gestionar Categorías
**Actor:** Administrador
**Descripción:** El administrador gestiona las categorías de gastos, servicios, etc.
**Precondiciones:** El administrador debe estar autenticado
**Flujo Principal:**
1. El administrador accede a "Gestión de Categorías"
2. Puede:
   - Crear nueva categoría
   - Editar categoría existente
   - Eliminar categoría
   - Reordenar categorías
3. Guarda los cambios
4. Las categorías se actualizan en toda la plataforma

**Postcondiciones:** Las categorías están actualizadas

---

## UC30: Configurar Sistema
**Actor:** Administrador
**Descripción:** El administrador accede a la configuración general del sistema.
**Precondiciones:** El administrador debe tener permisos de configuración
**Flujo Principal:**
1. El administrador accede a "Configuración del Sistema"
2. Ve opciones de configuración:
   - Parámetros generales
   - Integraciones
   - Seguridad
   - Mantenimiento

**Postcondiciones:** El administrador puede configurar el sistema

---

## UC31: Gestionar Permisos de Admin
**Actor:** Administrador Principal
**Descripción:** El administrador principal gestiona permisos de otros administradores.
**Precondiciones:** El administrador debe tener rol principal
**Flujo Principal:**
1. El administrador accede a "Gestión de Administradores"
2. Ve lista de administradores
3. Puede:
   - Añadir nuevo administrador
   - Modificar permisos
   - Desactivar administrador
4. Define roles y permisos específicos
5. Guarda los cambios

**Postcondiciones:** Los permisos están actualizados

---

## UC32: Ver Logs del Sistema
**Actor:** Administrador
**Descripción:** El administrador visualiza los logs de actividad del sistema.
**Precondiciones:** El sistema debe estar registrando logs
**Flujo Principal:**
1. El administrador accede a "Logs del Sistema"
2. Ve registros de:
   - Accesos al sistema
   - Cambios realizados
   - Errores
   - Actividad de usuarios
3. Puede filtrar por tipo, fecha o usuario
4. Puede exportar logs

**Postcondiciones:** El administrador visualiza la actividad del sistema

---

## UC33: Configurar Parámetros Globales
**Actor:** Administrador
**Descripción:** El administrador configura parámetros globales de RoomieHub.
**Precondiciones:** El administrador debe tener permisos
**Flujo Principal:**
1. El administrador accede a "Parámetros Globales"
2. Configura valores como:
   - Comisión de RoomieHub
   - Límites de búsqueda
   - Políticas de cancelación
   - Tiempo de verificación
3. Guarda los cambios
4. El sistema aplica los nuevos parámetros

**Postcondiciones:** Los parámetros están configurados

---

## UC34: Gestionar Pagos y Facturación
**Actor:** Administrador
**Descripción:** El administrador gestiona aspectos de pagos y facturación.
**Precondiciones:** Debe haber transacciones en el sistema
**Flujo Principal:**
1. El administrador accede a "Pagos y Facturación"
2. Ve:
   - Transacciones recientes
   - Comisiones generadas
   - Pagos pendientes a propietarios
   - Facturas emitidas
3. Puede procesar pagos manuales
4. Puede generar reportes financieros

**Postcondiciones:** El administrador gestiona la parte financiera

---

## UC35: Soporte Técnico
**Actor:** Administrador
**Descripción:** El administrador proporciona soporte técnico a usuarios.
**Precondiciones:** Debe haber tickets de soporte
**Flujo Principal:**
1. El administrador accede a "Tickets de Soporte"
2. Ve lista de tickets pendientes
3. Selecciona un ticket
4. Revisa el problema del usuario
5. Proporciona solución o respuesta
6. Marca el ticket como resuelto
7. Se notifica al usuario

**Postcondiciones:** El problema del usuario está atendido
