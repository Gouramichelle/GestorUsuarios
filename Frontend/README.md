# Frontend — Gestor de Usuarios

Vue 3 (Composition API) + **Pinia** + **Vue Router**, sin Vite ni build. Módulos ES cargados por CDN.

## Estructura

```
Frontend/
  index.html
  css/main.css
  js/
    models.js          # Tipos JSDoc (USUARIO, ROL, ROL_MODULO)
    contracts.js       # Contratos REST
    api/
      mock-data.js     # Persistencia mock en memoria
      auth-api.js      # fetch: login, logout, profile
    stores/auth.js     # Pinia
    router.js          # /login, /dashboard
    views/
      LoginView.js
      DashboardView.js
    App.js
    main.js
  docs/FASE-1-ARQUITECTURA.md
```

## Cómo ejecutar

```powershell
cd c:\Workspace\G-U\GestorUsuarios\Frontend
python -m http.server 8080
```

Abre: **http://localhost:8080** → rutas hash `#/login` y `#/dashboard`.

> **Importante:** no abras `index.html` con doble clic (`file://`). El navegador bloquea los módulos ES y verás pantalla en blanco. Siempre usa un servidor HTTP.

## Flujo

1. **Login** (`#/login`) → `POST /api/auth/login` (mock)
2. **Dashboard** (`#/dashboard`) → `GET /api/profile` al entrar
3. **Cerrar sesión** → `POST /api/auth/logout`

## Credenciales mock

| Email | Contraseña |
|-------|------------|
| admin@gestorusuarios.cl | Demo123! |
| supervisor@gestorusuarios.cl | Demo123! |
| usuario@gestorusuarios.cl | Demo123! |

## Conectar Spring Boot

En `js/contracts.js`:

```javascript
export const USE_MOCK = false
export const API_BASE = 'http://localhost:8080/api'
```

El backend debe habilitar CORS.

## Cumplimiento taller

| Requisito | Implementación |
|-----------|----------------|
| Login | `LoginView.js` |
| Dashboard usuario | `DashboardView.js` + `GET /api/profile` |
| Vue 3 + Composition API | `setup()` en vistas y store |
| Pinia | `stores/auth.js` |
| Vue Router | `router.js` |
| Modelos y contratos | `models.js`, `contracts.js` |
