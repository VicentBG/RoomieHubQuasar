# Diagrama de Entidad-Relación - RoomieHub

## Diagrama ER

\`\`\`mermaid
erDiagram
    USER ||--o{ APARTMENT : "posee (propietario)"
    USER }o--|| APARTMENT : "vive en"
    APARTMENT ||--o{ EXPENSE : "tiene"
    USER ||--o{ EXPENSE : "crea/paga"
    APARTMENT ||--o{ SHOPPING_ITEM : "tiene"
    USER ||--o{ SHOPPING_ITEM : "añade"
    APARTMENT ||--o{ TASK : "tiene"
    USER ||--o{ TASK : "asignado a"
    USER ||--o{ REVIEW : "escribe"
    USER ||--o{ REVIEW : "recibe"
    APARTMENT ||--o{ SERVICE : "cerca de"
    
    USER {
        int id PK
        string name
        string email UK
        string password
        string phone
        date birthDate
        string gender
        string userType "estudiante/propietario/ambos"
        string university
        string degree
        int studyYear
        string bio
        string avatar
        string[] interests
        string sleepSchedule
        string cleanlinessLevel
        string personalityType
        boolean smokingAllowed
        boolean petsAllowed
        date createdAt
    }
    
    APARTMENT {
        int id PK
        int ownerId FK
        string name
        string address
        string postalCode
        string city
        int rooms
        int bathrooms
        float area
        boolean furnished
        string internetType
        boolean heating
        boolean airConditioning
        string floorPlan "imagen URL"
        string description
        float rent
        date availableFrom
        string[] photos
        date createdAt
    }
    
    EXPENSE {
        int id PK
        int apartmentId FK
        int createdByUserId FK
        string description
        float amount
        string category "Alimentación/Servicios/Entretenimiento/Otros"
        string paidBy
        date date
        string[] splitBetween "IDs de usuarios"
        float[] splitAmounts
        boolean settled
        date createdAt
    }
    
    SHOPPING_ITEM {
        int id PK
        int apartmentId FK
        int addedByUserId FK
        string name
        int quantity
        string category "Alimentación/Limpieza/Otros"
        string priority "Baja/Media/Alta"
        boolean purchased
        date purchasedDate
        int purchasedByUserId FK
        date createdAt
    }
    
    TASK {
        int id PK
        int apartmentId FK
        int createdByUserId FK
        string title
        string description
        int[] assignedToUserIds FK
        string frequency "Única/Diaria/Semanal/Mensual"
        date dueDate
        string status "Pendiente/En Progreso/Completada"
        string priority "Baja/Media/Alta"
        date completedDate
        int completedByUserId FK
        date createdAt
    }
    
    REVIEW {
        int id PK
        int reviewerId FK "quien escribe"
        int reviewedUserId FK "quien recibe"
        int rating "1-5"
        string comment
        string[] tags "Limpio/Ruidoso/Amigable/etc"
        date createdAt
    }
    
    SERVICE {
        int id PK
        int apartmentId FK
        string name
        string type "Supermercado/Transporte/Universidad/etc"
        string distance
    }
\`\`\`

## Descripción de Entidades

### USER (Usuario)
Almacena toda la información de los usuarios de RoomieHub, incluyendo estudiantes y propietarios. Contiene datos personales, preferencias de convivencia y estilo de vida.

### APARTMENT (Apartamento/Piso)
Información completa sobre los pisos disponibles, incluyendo características físicas, servicios y ubicación. Cada apartamento pertenece a un propietario (USER) y puede albergar múltiples roommates.

### EXPENSE (Gasto)
Gastos compartidos entre los roommates de un apartamento. Permite dividir costos y realizar seguimiento de pagos.

### SHOPPING_ITEM (Artículo de Compra)
Lista de compras compartida para el apartamento. Los roommates pueden añadir artículos necesarios y marcarlos como comprados.

### TASK (Tarea)
Tareas del hogar asignadas a los roommates. Incluye frecuencia, prioridad y estado de completitud.

### REVIEW (Reseña)
Valoraciones y comentarios que los usuarios pueden dejarse entre sí para ayudar a futuros roommates a tomar decisiones informadas.

### SERVICE (Servicio Cercano)
Servicios y lugares de interés cercanos al apartamento (supermercados, transporte público, universidades, etc.).

## Relaciones Principales

1. **USER - APARTMENT (Propiedad)**: Un propietario puede tener múltiples apartamentos.
2. **USER - APARTMENT (Residencia)**: Un usuario vive en un apartamento, y un apartamento puede tener múltiples roommates.
3. **APARTMENT - EXPENSE**: Un apartamento tiene múltiples gastos compartidos.
4. **USER - EXPENSE**: Un usuario crea y/o paga gastos.
5. **APARTMENT - SHOPPING_ITEM**: Un apartamento tiene una lista de compras compartida.
6. **APARTMENT - TASK**: Un apartamento tiene múltiples tareas asignadas.
7. **USER - TASK**: Un usuario puede ser asignado a múltiples tareas.
8. **USER - REVIEW**: Un usuario puede escribir y recibir múltiples reseñas.
9. **APARTMENT - SERVICE**: Un apartamento tiene múltiples servicios cercanos.

## Notas de Diseño

- **PK**: Primary Key (Clave Primaria)
- **FK**: Foreign Key (Clave Foránea)
- **UK**: Unique Key (Clave Única)
- Las fechas se almacenan en formato ISO 8601
- Los arrays se pueden implementar como tablas relacionales separadas o como tipos de array en bases de datos que lo soporten (PostgreSQL, MongoDB)
- Las contraseñas deben almacenarse hasheadas (bcrypt, Argon2)
- Las URLs de imágenes pueden apuntar a un servicio de almacenamiento externo (AWS S3, Cloudinary, etc.)
