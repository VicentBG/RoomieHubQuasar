---
title: Casos de Uso - Rol Estudiante
---
graph TB
    subgraph "Sistema RoomieHub"
        UC1[Registrarse como Estudiante]
        UC2[Crear Perfil de Estudiante]
        UC3[Buscar Pisos Disponibles]
        UC4[Filtrar Búsqueda de Pisos]
        UC5[Ver Detalles de Piso]
        UC6[Solicitar Unirse a Piso]
        UC7[Ver Estado de Solicitudes]
        UC8[Aceptar Invitación a Piso]
        UC9[Ver Lista de Compañeros de Piso]
        UC10[Gestionar Lista de Compras]
        UC11[Añadir Artículo a Lista de Compras]
        UC12[Marcar Artículo como Comprado]
        UC13[Ver Gastos del Piso]
        UC14[Crear Gasto Compartido]
        UC15[Marcar Gasto como Pagado]
        UC16[Ver Balance Personal]
        UC17[Gestionar Tareas del Hogar]
        UC18[Crear Tarea]
        UC19[Asignar Tarea a Compañero]
        UC20[Marcar Tarea como Completada]
        UC21[Dejar Reseña al Propietario]
        UC22[Dejar Reseña a Compañero de Piso]
        UC23[Ver Reseñas Recibidas]
        UC24[Actualizar Perfil Personal]
        UC25[Abandonar Piso]
        UC26[Ver Estadísticas Personales]
        UC27[Configurar Notificaciones]
    end
    
    Estudiante((Estudiante))
    
    Estudiante --> UC1
    Estudiante --> UC2
    Estudiante --> UC3
    Estudiante --> UC4
    Estudiante --> UC5
    Estudiante --> UC6
    Estudiante --> UC7
    Estudiante --> UC8
    Estudiante --> UC9
    Estudiante --> UC10
    Estudiante --> UC11
    Estudiante --> UC12
    Estudiante --> UC13
    Estudiante --> UC14
    Estudiante --> UC15
    Estudiante --> UC16
    Estudiante --> UC17
    Estudiante --> UC18
    Estudiante --> UC19
    Estudiante --> UC20
    Estudiante --> UC21
    Estudiante --> UC22
    Estudiante --> UC23
    Estudiante --> UC24
    Estudiante --> UC25
    Estudiante --> UC26
    Estudiante --> UC27
