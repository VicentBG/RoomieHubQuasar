---
title: Casos de Uso - Rol Fundador/Propietario
---
graph TB
    subgraph "Sistema RoomieHub"
        UC1[Registrarse como Propietario]
        UC2[Crear Nuevo Piso]
        UC3[Editar Información del Piso]
        UC4[Publicar Piso Disponible]
        UC5[Gestionar Solicitudes de Estudiantes]
        UC6[Aceptar/Rechazar Estudiantes]
        UC7[Ver Lista de Inquilinos Actuales]
        UC8[Gestionar Gastos del Piso]
        UC9[Crear Gasto Común]
        UC10[Ver Balance de Pagos]
        UC11[Enviar Recordatorios de Pago]
        UC12[Ver Reseñas de Estudiantes]
        UC13[Dejar Reseña a Estudiante]
        UC14[Gestionar Servicios del Piso]
        UC15[Actualizar Disponibilidad de Habitaciones]
        UC16[Ver Estadísticas del Piso]
        UC17[Configurar Reglas del Piso]
        UC18[Eliminar Inquilino]
    end
    
    Propietario((Propietario/Fundador))
    
    Propietario --> UC1
    Propietario --> UC2
    Propietario --> UC3
    Propietario --> UC4
    Propietario --> UC5
    Propietario --> UC6
    Propietario --> UC7
    Propietario --> UC8
    Propietario --> UC9
    Propietario --> UC10
    Propietario --> UC11
    Propietario --> UC12
    Propietario --> UC13
    Propietario --> UC14
    Propietario --> UC15
    Propietario --> UC16
    Propietario --> UC17
    Propietario --> UC18
