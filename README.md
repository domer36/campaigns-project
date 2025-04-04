# Plataforma de Gestión de Campañas Publicitarias
## Descripción
Esta plataforma permite a usuarios con distintos roles (Super Administrador y Administrador) gestionar campañas publicitarias, consultar métricas y mostrar resultados en una landing pública.

## Tecnologías utilizadas
**Backend**: Django + Django REST Framework
**Autenticación**: JWT (djangorestframework-simplejwt)
**Base de datos**: PostgreSQL
**Orquestación**: Docker Compose

## Estructura de carpetas
- backend/: contiene el código fuente de la API en Django
- docker-compose.yml: orquesta los servicios de backend y base de datos

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/domer36/campaigns-project.git
```

2. Crear el archivo .env en la carpeta backend/ con el siguiente contenido:
```bash
# PostgreSQL config
POSTGRES_DB=dbname
POSTGRES_USER=username
POSTGRES_PASSWORD=userpassword

# Backend config
DATABASE_NAME=dbname
DATABASE_USER=username
DATABASE_PASSWORD=userpassword
DATABASE_HOST=db # Nombre del servicio en docker compose
DATABASE_PORT=5432
SECRET_KEY=your_secret_key
```
3. Construir los contenedores
```bash
docker-compose up --build
```

4. Crear super usuario
```bash
docker-compose exec web python manage.py createsuperuser
```

5. Modificar el rol del super usuario desde el admin de Django: http://localhost:8000/admin/

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
