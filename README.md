# 🚀 Documentación del Frontend: Zark Shortener (Angular)

Este proyecto de frontend se ha desarrollado utilizando **Angular** como framework principal, siguiendo prácticas de **SPA** y usando **Signals** para la gestión de estado reactiva.

---

## 💻 1. Tecnología y Arquitectura Principal

| Tecnología        | Propósito |
|-------------------|-----------|
| **Angular v17+**  | Desarrollo de SPA. |
| **RxJS**          | Manejo de operaciones asíncronas y flujo de datos. |
| **Angular Signals** | Estado reactivo que actualiza instantáneamente la interfaz. |
| **jwt-decode**    | Decodificación rápida de tokens JWT. |

---

## 🔒 2. Gestión de Autenticación (AuthService)

La autenticación se implementa con **OAuth 2.0 (GitHub)** y **JWT**.

### A. Flujo de Login Asíncrono

1. El usuario es redirigido a  
   `zarkshortener.onrender.com/api/auth/github`
2. Tras autorizar en GitHub, el backend genera un JWT y redirige al frontend:  
   `/auth-success?token=...`
3. El componente **AuthSuccess** ejecuta `AuthService.handleCallback(url)`.

### B. Reactividad del Estado con Signals

El servicio **AuthService** usa Signals para actualizar el estado sin recargar la página.

| Signal            | Origen  | Descripción |
|-------------------|---------|-------------|
| **isAuthenticated()** | `computed` | `true` si el token existe y es válido. Usado en Navbar y rutas protegidas. |
| **username()**        | `computed` | Extrae el nombre del usuario del JWT. |

El estado interno (`_user` Signal) se actualiza en  
`AuthService.setAuthSuccess(token)`.

---

## 🌐 3. Estructura de Componentes Clave

### A. Componente **AuthSuccess** (Ruta de Callback)

| Archivo                  | Ruta          | Propósito |
|--------------------------|---------------|-----------|
| `auth-success.component.ts` | `/auth-success` | No tiene interfaz. Solo captura el token, llama a `handleCallback` y redirige a `/`. |

### B. Componente **Shorten** (Listado de URLs)

| Archivo              | Ruta        | Propósito |
|----------------------|-------------|-----------|
| `shorten.component.ts` | `/` (principal) | Crear nuevas URLs y mostrar la lista del usuario. |

## 🛡️ 4. Peticiones HTTP Protegidas (Interceptors)

Todas las peticiones a las rutas protegidas del backend (p. ej., `/api/shorten`, `/api/urls`) requieren el token JWT en la cabecera. Esto se gestiona mediante un **Interceptor** de Angular (ubicado en `src/app/interceptors`).

**Flujo del Interceptor**

1. Inyecta `AuthService`.
2. Antes de enviar cualquier petición HTTP al backend, verifica si `AuthService.getToken()` existe.
3. Si existe, clona la petición y añade la cabecera:
