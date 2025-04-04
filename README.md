# Plataforma de Gestión de Campañas Publicitarias
## Descripción
Esta plataforma permite a usuarios con distintos roles (Super Administrador y Administrador) gestionar campañas publicitarias, consultar métricas y mostrar resultados en una landing pública.

## Tecnologías utilizadas

- **Backend**: Django + Django REST Framework

- **Autenticación**: JWT (djangorestframework-simplejwt)

- **Base de datos**: PostgreSQL

- **Orquestación**: Docker Compose

## Estructura de carpetas
- backend/: contiene el código fuente de la API en Django
- frontend/: contiene la aplicación con VITE + React
- docker-compose.yml: orquesta los servicios de backend y base de datos

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/domer36/campaigns-project.git
```

2. Variables de entorno
Crear archivo .env en la raiz de la app.

Estas variables son las que permiten crear la base de datos en PostgreSQL, el usuario y contraseña. 
```bash
# PostgreSQL
POSTGRES_DB=admin
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

Crear archivo .env dentro del directorio backend, es la configuración para conectarse a la base de datos y los host permitidos que podrán consumir el servicio.
```bash
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1
DATABASE_NAME=admin # Nombre de la base de datos (tiene que ser el mismo que el archivo inicial)
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=db # Nombre del host de la base de datos, si corre con docker-compose 'db' es el nombre que se le asigna.
DATABASE_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080 # Habilitamos los CORS para estos origenes, el puerto 8080 es el configurado en docker compose
CSRF_TRUSTED_ORIGINS=https://localhost
```
Crear archivo .env dentro del directorio frontend, para indicar donde se encuentra el backend.
```bash
VITE_API_BASE_URL=http://localhost:8001/api
```
3. Construir los contenedores
```bash
docker-compose up --build
```

4. Crear super usuario
```bash
docker-compose exec web python manage.py createsuperuser
```

5. Modificar el rol del super usuario desde el admin de Django: http://localhost:8001/admin/

## Endpoints disponibles
### Autenticación

**Obtener token de acceso y refresh**
- POST /api/login/

**Renovar token de acceso**
- POST /api/token/refresh/

### Usuarios
**Registrar usuarios (solo Superadmin)**
- POST /api/register/

**Listado de usuarios (solo Superadmin)**
- GET /api/users/

### Campañas

**Listado de campañas**

Superadmin ve todas, Admin solo las suyas
- GET /api/campaigns/

**Filtro por estatus**
- GET /api/campaigns/?status=ACTIVE

**Crear nueva campaña**
- POST /api/campaigns/

**Actualizar campaña**

Superadmin puede modificar todas, y cada admin solo las suyas.
- PUT /api/campaigns/<id>/

**Eliminar campaña (solo Superadmin)**
- DELETE /api/campaigns/<id>/

### Dashboard
**Mostrar resumen de campañas**

Muestra total de campañas, presupuesto y desglose por estatus.
- GET /api/dashboard/

## Autenticación
Para endpoints protegidos se requiere enviar el token en los headers:

```bash
Authorization: Bearer <access_token>
````
