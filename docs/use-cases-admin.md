---
title: Casos de Uso - Rol Administrador
---
graph TB
    subgraph "Sistema RoomieHub"
        UC1[Iniciar Sesión como Admin]
        UC2[Ver Dashboard de Administración]
        UC3[Gestionar Usuarios]
        UC4[Ver Lista de Usuarios]
        UC5[Suspender/Activar Usuario]
        UC6[Eliminar Usuario]
        UC7[Verificar Identidad de Usuario]
        UC8[Gestionar Pisos]
        UC9[Aprobar/Rechazar Pisos]
        UC10[Editar Información de Piso]
        UC11[Eliminar Piso]
        UC12[Destacar Piso]
        UC13[Gestionar Reportes]
        UC14[Ver Reportes de Usuarios]
        UC15[Investigar Reporte]
        UC16[Resolver/Cerrar Reporte]
        UC17[Tomar Acción sobre Reporte]
        UC18[Gestionar Reseñas]
        UC19[Moderar Reseñas]
        UC20[Eliminar Reseña Inapropiada]
        UC21[Ver Estadísticas del Sistema]
        UC22[Generar Reportes]
        UC23[Ver Métricas de Uso]
        UC24[Analizar Tendencias]
        UC25[Gestionar Contenido]
        UC26[Crear Anuncios del Sistema]
        UC27[Enviar Notificaciones Masivas]
        UC28[Actualizar Términos y Condiciones]
        UC29[Gestionar Categorías]
        UC30[Configurar Sistema]
        UC31[Gestionar Permisos de Admin]
        UC32[Ver Logs del Sistema]
        UC33[Configurar Parámetros Globales]
        UC34[Gestionar Pagos y Facturación]
        UC35[Soporte Técnico]
    end
    
    Admin((Administrador))
    
    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
    Admin --> UC13
    Admin --> UC14
    Admin --> UC15
    Admin --> UC16
    Admin --> UC17
    Admin --> UC18
    Admin --> UC19
    Admin --> UC20
    Admin --> UC21
    Admin --> UC22
    Admin --> UC23
    Admin --> UC24
    Admin --> UC25
    Admin --> UC26
    Admin --> UC27
    Admin --> UC28
    Admin --> UC29
    Admin --> UC30
    Admin --> UC31
    Admin --> UC32
    Admin --> UC33
    Admin --> UC34
    Admin --> UC35
