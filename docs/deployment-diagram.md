# Diagrama de Despliegue - RoomieHub

## Arquitectura General

\`\`\`mermaid
graph TB
    subgraph "Cliente"
        Browser[Navegador Web<br/>Chrome, Firefox, Safari]
        Mobile[Aplicación Móvil<br/>iOS/Android]
    end

    subgraph "CDN - Cloudflare/Vercel"
        CDN[CDN<br/>Contenido Estático<br/>Imágenes, CSS, JS]
    end

    subgraph "Frontend Server - Vercel/Netlify"
        Frontend[Quasar App<br/>Vue 3 + TypeScript<br/>SPA/PWA]
    end

    subgraph "Backend Server - Node.js"
        API[API REST<br/>Express.js<br/>Node.js 18+]
        Auth[Servicio de<br/>Autenticación<br/>JWT]
        FileUpload[Servicio de<br/>Subida de Archivos]
        Notifications[Servicio de<br/>Notificaciones]
    end

    subgraph "Base de Datos"
        DB[(PostgreSQL 14+<br/>Base de Datos Principal)]
        Redis[(Redis<br/>Caché y Sesiones)]
    end

    subgraph "Almacenamiento"
        S3[AWS S3 / Cloudinary<br/>Imágenes y Documentos<br/>Planos de pisos<br/>Avatares]
    end

    subgraph "Servicios Externos"
        Email[Servicio de Email<br/>SendGrid/Mailgun<br/>Notificaciones]
        SMS[Servicio de SMS<br/>Twilio<br/>Verificación]
        Maps[Google Maps API<br/>Geolocalización<br/>Servicios cercanos]
        Payment[Stripe<br/>Pagos y Suscripciones]
    end

    subgraph "Monitoreo y Logs"
        Monitor[Sentry<br/>Monitoreo de Errores]
        Analytics[Google Analytics<br/>Analítica Web]
        Logs[Winston/Morgan<br/>Sistema de Logs]
    end

    Browser --> CDN
    Mobile --> CDN
    Browser --> Frontend
    Mobile --> Frontend
    
    Frontend --> API
    Frontend --> CDN
    
    API --> Auth
    API --> FileUpload
    API --> Notifications
    API --> DB
    API --> Redis
    
    FileUpload --> S3
    Notifications --> Email
    Notifications --> SMS
    API --> Maps
    API --> Payment
    
    Frontend --> Monitor
    API --> Monitor
    API --> Analytics
    API --> Logs
    
    style Browser fill:#4CAF50
    style Mobile fill:#4CAF50
    style Frontend fill:#2196F3
    style API fill:#FF9800
    style DB fill:#9C27B0
    style Redis fill:#F44336
    style S3 fill:#00BCD4
    style CDN fill:#607D8B
\`\`\`

## Diagrama de Componentes Físicos

\`\`\`mermaid
C4Deployment
    title Diagrama de Despliegue - RoomieHub

    Deployment_Node(client, "Dispositivo Cliente", "Windows/Mac/Linux/iOS/Android"){
        Container(browser, "Navegador Web", "Chrome, Firefox, Safari", "Interfaz de usuario")
        Container(mobile_app, "App Móvil", "Quasar Capacitor", "Aplicación nativa")
    }

    Deployment_Node(cdn, "Red CDN", "Cloudflare/Vercel CDN"){
        Container(static, "Contenido Estático", "CDN", "JS, CSS, Imágenes optimizadas")
    }

    Deployment_Node(frontend_server, "Servidor Frontend", "Vercel/Netlify"){
        Container(spa, "Quasar SPA", "Vue 3 + Quasar", "Aplicación de página única")
    }

    Deployment_Node(backend_server, "Servidor Backend", "AWS EC2/DigitalOcean"){
        Container(api_server, "API Server", "Node.js + Express", "API REST principal")
        Container(auth_service, "Auth Service", "JWT + bcrypt", "Autenticación")
        Container(websocket, "WebSocket Server", "Socket.io", "Comunicación en tiempo real")
    }

    Deployment_Node(database_server, "Servidor de Base de Datos", "AWS RDS/Managed DB"){
        ContainerDb(postgres, "PostgreSQL", "PostgreSQL 14+", "Almacenamiento persistente")
        ContainerDb(redis_cache, "Redis Cache", "Redis 7+", "Caché y sesiones")
    }

    Deployment_Node(storage, "Almacenamiento de Archivos", "AWS S3/Cloudinary"){
        Container(object_storage, "Object Storage", "S3/Cloudinary", "Imágenes y documentos")
    }

    Rel(browser, static, "Carga recursos", "HTTPS")
    Rel(browser, spa, "Usa", "HTTPS")
    Rel(mobile_app, spa, "Usa", "HTTPS")
    Rel(spa, api_server, "Llama API", "HTTPS/REST")
    Rel(api_server, auth_service, "Valida", "Internal")
    Rel(api_server, postgres, "Lee/Escribe", "TCP/5432")
    Rel(api_server, redis_cache, "Cachea", "TCP/6379")
    Rel(api_server, object_storage, "Sube/Descarga", "HTTPS")
    Rel(websocket, browser, "Push notifications", "WSS")
\`\`\`

## Infraestructura Detallada por Entorno

### Producción

\`\`\`mermaid
graph LR
    subgraph "Load Balancer - AWS ELB"
        LB[Load Balancer<br/>SSL/TLS Termination<br/>Health Checks]
    end

    subgraph "Frontend Tier"
        F1[Frontend Server 1<br/>Vercel Edge Network]
        F2[Frontend Server 2<br/>Vercel Edge Network]
    end

    subgraph "Application Tier - Auto Scaling Group"
        A1[API Server 1<br/>t3.medium<br/>2 vCPU, 4GB RAM]
        A2[API Server 2<br/>t3.medium<br/>2 vCPU, 4GB RAM]
        A3[API Server 3<br/>t3.medium<br/>2 vCPU, 4GB RAM]
    end

    subgraph "Data Tier"
        DBM[(PostgreSQL Master<br/>db.t3.large<br/>2 vCPU, 8GB RAM<br/>100GB SSD)]
        DBR[(PostgreSQL Replica<br/>db.t3.large<br/>Read Only)]
        RC[(Redis Cluster<br/>cache.t3.medium<br/>2 Nodes)]
    end

    LB --> F1
    LB --> F2
    F1 --> A1
    F1 --> A2
    F2 --> A2
    F2 --> A3
    
    A1 --> DBM
    A2 --> DBM
    A3 --> DBM
    A1 --> DBR
    A2 --> DBR
    A3 --> DBR
    A1 --> RC
    A2 --> RC
    A3 --> RC

    style LB fill:#FF6B6B
    style F1 fill:#4ECDC4
    style F2 fill:#4ECDC4
    style A1 fill:#95E1D3
    style A2 fill:#95E1D3
    style A3 fill:#95E1D3
    style DBM fill:#F38181
    style DBR fill:#F38181
    style RC fill:#AA96DA
\`\`\`

### Desarrollo

\`\`\`mermaid
graph TB
    subgraph "Entorno de Desarrollo Local"
        DevMachine[Máquina del Desarrollador<br/>Docker Compose]
        
        subgraph "Contenedores Docker"
            FrontDev[Frontend Dev<br/>Quasar Dev Server<br/>Puerto 9000]
            BackDev[Backend Dev<br/>Node.js + Nodemon<br/>Puerto 3000]
            DBDev[(PostgreSQL Dev<br/>Puerto 5432)]
            RedisDev[(Redis Dev<br/>Puerto 6379)]
        end
    end

    DevMachine --> FrontDev
    DevMachine --> BackDev
    BackDev --> DBDev
    BackDev --> RedisDev
    FrontDev --> BackDev

    style DevMachine fill:#FFD93D
    style FrontDev fill:#6BCB77
    style BackDev fill:#4D96FF
    style DBDev fill:#FF6B9D
    style RedisDev fill:#C780FA
\`\`\`

## Especificaciones de Hardware/Cloud

### Producción

| Componente | Especificación | Escalado |
|------------|---------------|----------|
| **Frontend** | Vercel Edge Network | Automático |
| **API Servers** | AWS EC2 t3.medium (2 vCPU, 4GB RAM) | Auto-scaling: 2-5 instancias |
| **Base de Datos** | AWS RDS PostgreSQL db.t3.large (2 vCPU, 8GB RAM, 100GB SSD) | Vertical scaling |
| **Redis Cache** | AWS ElastiCache cache.t3.medium (2 nodos) | Horizontal scaling |
| **Object Storage** | AWS S3 Standard (ilimitado) | Automático |
| **CDN** | Cloudflare/Vercel CDN | Global |

### Desarrollo

| Componente | Especificación |
|------------|---------------|
| **Frontend** | Docker container, 512MB RAM |
| **Backend** | Docker container, 1GB RAM |
| **PostgreSQL** | Docker container, 512MB RAM |
| **Redis** | Docker container, 256MB RAM |

## Protocolos y Puertos

\`\`\`mermaid
graph LR
    Client[Cliente] -->|HTTPS:443| LB[Load Balancer]
    Client -->|WSS:443| WS[WebSocket Server]
    LB -->|HTTP:3000| API[API Servers]
    API -->|TCP:5432| DB[(PostgreSQL)]
    API -->|TCP:6379| Redis[(Redis)]
    API -->|HTTPS:443| S3[S3 Storage]
    API -->|HTTPS:443| External[Servicios Externos]

    style Client fill:#4CAF50
    style LB fill:#FF9800
    style API fill:#2196F3
    style DB fill:#9C27B0
    style Redis fill:#F44336
    style S3 fill:#00BCD4
\`\`\`

## Seguridad

\`\`\`mermaid
graph TB
    subgraph "Capa de Seguridad"
        WAF[WAF - Web Application Firewall<br/>Cloudflare/AWS WAF]
        SSL[SSL/TLS Certificates<br/>Let's Encrypt/AWS ACM]
        VPC[Virtual Private Cloud<br/>AWS VPC]
    end

    subgraph "Autenticación y Autorización"
        JWT[JWT Tokens<br/>Access + Refresh]
        OAuth[OAuth 2.0<br/>Google, Facebook]
        MFA[Multi-Factor Auth<br/>SMS/Email]
    end

    subgraph "Encriptación"
        Transit[En Tránsito<br/>TLS 1.3]
        Rest[En Reposo<br/>AES-256]
        Hash[Contraseñas<br/>bcrypt]
    end

    subgraph "Monitoreo de Seguridad"
        IDS[Sistema de Detección<br/>de Intrusiones]
        Audit[Logs de Auditoría<br/>CloudWatch/Datadog]
        Backup[Backups Automáticos<br/>Diarios + Retención 30 días]
    end

    WAF --> SSL
    SSL --> VPC
    VPC --> JWT
    JWT --> OAuth
    OAuth --> MFA
    
    Transit --> Rest
    Rest --> Hash
    
    IDS --> Audit
    Audit --> Backup

    style WAF fill:#E91E63
    style SSL fill:#9C27B0
    style VPC fill:#673AB7
    style JWT fill:#3F51B5
    style Transit fill:#00BCD4
    style IDS fill:#FF5722
\`\`\`

## Flujo de Despliegue CI/CD

\`\`\`mermaid
graph LR
    Dev[Desarrollador<br/>Commit Code] --> Git[GitHub Repository]
    Git --> CI[GitHub Actions<br/>CI Pipeline]
    
    CI --> Test[Tests Automáticos<br/>Unit + Integration]
    Test --> Build[Build & Bundle<br/>Webpack/Vite]
    Build --> Quality[Quality Checks<br/>ESLint, TypeScript]
    
    Quality -->|Pass| StagingFE[Deploy Staging<br/>Frontend]
    Quality -->|Pass| StagingBE[Deploy Staging<br/>Backend]
    
    StagingFE --> E2E[E2E Tests<br/>Playwright/Cypress]
    StagingBE --> E2E
    
    E2E -->|Aprobación Manual| ProdFE[Deploy Production<br/>Frontend]
    E2E -->|Aprobación Manual| ProdBE[Deploy Production<br/>Backend]
    
    ProdFE --> Monitor[Monitoreo<br/>Sentry + Analytics]
    ProdBE --> Monitor

    style Dev fill:#4CAF50
    style CI fill:#2196F3
    style Test fill:#FF9800
    style Quality fill:#9C27B0
    style E2E fill:#F44336
    style ProdFE fill:#00BCD4
    style ProdBE fill:#00BCD4
    style Monitor fill:#607D8B
\`\`\`

## Backup y Recuperación

\`\`\`mermaid
graph TB
    subgraph "Estrategia de Backup"
        Daily[Backup Diario<br/>Base de Datos<br/>3:00 AM UTC]
        Weekly[Backup Semanal<br/>Full System<br/>Domingos]
        Instant[Snapshots Instantáneos<br/>Antes de Deploys]
    end

    subgraph "Almacenamiento de Backups"
        S3Primary[S3 Primary<br/>us-east-1<br/>Retención 30 días]
        S3Replica[S3 Replica<br/>eu-west-1<br/>Disaster Recovery]
        Glacier[AWS Glacier<br/>Archivos Long-term<br/>Retención 1 año]
    end

    subgraph "Recuperación"
        PITR[Point-in-Time Recovery<br/>Últimas 7 días]
        DR[Disaster Recovery<br/>RTO: 4 horas<br/>RPO: 1 hora]
    end

    Daily --> S3Primary
    Weekly --> S3Primary
    Instant --> S3Primary
    S3Primary --> S3Replica
    S3Primary --> Glacier
    
    S3Primary --> PITR
    S3Replica --> DR

    style Daily fill:#4CAF50
    style Weekly fill:#2196F3
    style Instant fill:#FF9800
    style S3Primary fill:#9C27B0
    style S3Replica fill:#E91E63
    style Glacier fill:#607D8B
    style PITR fill:#00BCD4
    style DR fill:#F44336
\`\`\`

## Costos Estimados Mensuales (AWS)

| Servicio | Especificación | Costo Mensual (USD) |
|----------|---------------|---------------------|
| **Frontend (Vercel)** | Pro Plan | $20 |
| **EC2 (API Servers)** | 3x t3.medium | $75 |
| **RDS (PostgreSQL)** | db.t3.large | $120 |
| **ElastiCache (Redis)** | 2x cache.t3.medium | $80 |
| **S3 Storage** | 100GB + Transfer | $25 |
| **CloudFront CDN** | 1TB Transfer | $85 |
| **Load Balancer** | ALB | $20 |
| **Route 53** | DNS Hosting | $5 |
| **Backups & Snapshots** | EBS + S3 | $30 |
| **Monitoreo** | CloudWatch + Sentry | $40 |
| **Servicios Externos** | SendGrid, Twilio, etc. | $50 |
| **TOTAL ESTIMADO** | | **$550/mes** |

*Nota: Los costos pueden variar según el tráfico y uso real.*

## Requisitos del Sistema

### Cliente
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Conexión a Internet mínima: 2 Mbps
- JavaScript habilitado
- Cookies habilitadas

### Servidor (Producción)
- Node.js 18+ LTS
- PostgreSQL 14+
- Redis 7+
- Mínimo 4GB RAM por instancia de API
- Mínimo 2 vCPU por instancia
- 20GB de almacenamiento para la aplicación
- SSL/TLS certificates

### Desarrollo
- Docker 20+ y Docker Compose 2+
- Node.js 18+ LTS
- Git 2.30+
- Mínimo 8GB RAM
- 10GB espacio en disco
