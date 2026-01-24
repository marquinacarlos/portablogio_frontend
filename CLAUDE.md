# CLAUDE.md - Memoria del Proyecto

> Este archivo sirve como contexto persistente para Claude Code en el desarrollo de este proyecto.

## Visión General

**Proyecto:** Portfolio y Blog personal de Carlos Marquina
**Propósito:** Portafolio profesional con secciones de proyectos, servicios, blog y contacto
**Estado:** En desarrollo activo
**Idioma del contenido:** Español
**Idioma del código:** Inglés

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.3 | Framework UI |
| TypeScript | 5.9.3 | Tipado estático (strict mode) |
| React Router | 7.10.1 | Routing SPA |
| Zustand | 5.0.9 | Estado global (auth) |
| Axios | 1.13.2 | Cliente HTTP |
| Tailwind CSS | 4.1.18 | Estilos utility-first |
| Vite (Rolldown) | 7.2.5 | Build tool |
| Lucide React | 0.561.0 | Iconos |
| pnpm | 10.28.1 | Package manager |

---

## Estructura del Proyecto

```
src/
├── App.tsx                 # Router principal con rutas
├── main.tsx                # Entry point
├── components/             # Componentes reutilizables
│   ├── Layout.tsx          # Layout con Navbar y Outlet
│   ├── Navbar.tsx          # Navegación responsive
│   ├── ProtectedRoute.tsx  # HOC para rutas protegidas
│   ├── BackgroundAnimated.tsx
│   ├── Subtitle.tsx        # Título de sección (h2)
│   ├── ButtonWithIcon.tsx  # Botón con icono
│   ├── Blockquote.tsx      # Cita estilizada
│   ├── List.tsx            # Wrapper con compound components
│   ├── BlogCard.tsx
│   ├── ProjectCard.tsx
│   ├── ServiceCard.tsx
│   ├── CarouselOfItems.tsx # Carrusel horizontal
│   └── editor/             # Componentes del editor de posts
│       ├── index.ts        # Exports
│       ├── PostMetaFields.tsx    # Título, slug, excerpt, cover, status
│       ├── BlockToolbar.tsx      # Botones para agregar bloques
│       ├── BlockWrapper.tsx      # Wrapper con controles mover/eliminar
│       └── blocks/
│           ├── ParagraphEditor.tsx
│           ├── HeaderEditor.tsx
│           ├── ImageEditor.tsx
│           ├── CodeEditor.tsx
│           ├── VideoEditor.tsx
│           └── QuoteEditor.tsx
├── pages/                  # Páginas/rutas
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── ServicesPage.tsx
│   ├── ProjectsPage.tsx
│   ├── BlogPage.tsx        # Fetch dinámico desde API
│   ├── BlogPostPage.tsx    # Detalle de post
│   ├── LoginPage.tsx
│   ├── AdminPage.tsx       # Panel de administración
│   ├── PostEditorPage.tsx  # Editor de posts (crear/editar)
│   └── NotFound.tsx
├── services/
│   ├── authService.ts      # Login, verificar token
│   └── postService.ts      # CRUD de posts
├── store/
│   └── authStore.ts        # Zustand store (token, isAuthenticated)
├── lib/
│   ├── axios.ts            # Instancia axios configurada
│   └── utils.ts            # cn() helper para Tailwind
├── types/
│   └── index.ts            # Service, Project, BlogPost interfaces
├── config/
│   └── api.ts              # URL base de API
└── css/
    ├── styles.css          # Tailwind + utilities custom
    ├── background_animated.css
    └── blockquotes.css
```

---

## Rutas de la Aplicación

```
/ (Layout)
├── /                      → HomePage          # Hero, stack técnico, highlights, CTAs
├── /about                 → AboutPage         # Skills, formación, valores personales
├── /contact               → ContactPage       # Formulario, info contacto, redes sociales
├── /services              → ServicesPage      # 6 servicios con precios y features
├── /projects              → ProjectsPage      # Lista de proyectos con tech stack
├── /blog                  → BlogPage          # Posts dinámicos desde API
├── /blog/:slug            → BlogPostPage      # Detalle de post
├── /login                 → LoginPage         # Formulario con estados loading/error
├── /admin                 → AdminPage         # Panel admin (protegida)
├── /admin/posts/new       → PostEditorPage    # Crear post (protegida)
├── /admin/posts/:slug/edit → PostEditorPage   # Editar post (protegida)
└── /*                     → NotFound          # 404 en español con navegación
```

---

## Patrones y Convenciones

### Componentes
- **Functional components** con TypeScript
- **Named exports**: `export const ComponentName = () => {}`
- **Props interfaces** definidas inline o importadas de `types/`
- **Compound components** para composición: `List.ServiceCard`, `CarouselOfItems.Item`

### Estilos
- **Tailwind CSS v4** como base
- **cn() helper** para merge de clases: `cn("base", conditional && "extra")`
- **Colores principales:**
  - `text-orange-400` - Títulos, acentos primarios
  - `text-cyan-400` - Links, tecnologías, acentos secundarios
  - `text-amber-100` - Texto principal (con opacidades /90, /70, /60)
  - `bg-neutral-950` - Fondo principal
  - `bg-neutral-900/50` - Cards y secciones
  - `border-neutral-700` - Bordes sutiles
- **Patrones de cards:**
  ```tsx
  className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-md"
  ```
- **Patrones de secciones:**
  ```tsx
  <section className="space-y-4">
    <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
      <Icon className="text-orange-400" size={24} />
      Título
    </h3>
    {/* contenido */}
  </section>
  ```

### Estado
- **Local state** (`useState`) para UI y formularios
- **Global state** (Zustand) solo para autenticación
- **Datos estáticos** definidos como constantes fuera del componente

### Formularios
- **Patrón de inputs consistente:**
  ```tsx
  const inputClasses =
    "w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors";
  ```
- **Labels con iconos:**
  ```tsx
  <label className="flex items-center gap-2 text-sm text-amber-100/80">
    <Icon size={16} className="text-cyan-400" />
    Label text
  </label>
  ```
- **Estados manejados:** `formData`, `isSubmitting`, `error/submitStatus`
- **Mensajes de error:**
  ```tsx
  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
    <p className="text-red-400 text-sm">{error}</p>
  </div>
  ```

### API
- **Base URL:** `http://localhost:3000/api/v1`
- **Backend:** Express + TypeScript + PostgreSQL (ver sección Backend)
- **Autenticación:** JWT Bearer token (2h de validez)

---

## Tipos TypeScript

```typescript
// types/index.ts - Sincronizados con Backend

// === BLOG ===
interface BlogPost {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: ContentBlock[];  // Solo en detalle, no en listado
  cover_image_url?: string;
  type: 'blog' | 'collaboration';
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at?: string;
}

// Para listados (sin content)
interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image_url?: string;
  created_at: string;
}

// Bloques de contenido JSONB
type BlockType = 'paragraph' | 'header' | 'image' | 'code' | 'video' | 'quote';

interface ContentBlock {
  id: string;
  type: BlockType;
  data: {
    text?: string;      // paragraph, header, quote
    level?: number;     // header (1-6)
    url?: string;       // image, video
    caption?: string;   // image, video
    language?: string;  // code (js, ts, sql, css, etc.)
    code?: string;      // code content
  };
}

// === PROYECTOS ===
interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  image_url?: string;
  repo_url?: string;
  live_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

// === SERVICIOS ===
interface Service {
  id: number;
  title: string;
  description?: string;
  price: number;          // DECIMAL en BD
  currency?: string;      // EUR por defecto
  features: string[] | null;
  is_active?: boolean;
}

// === AUTH ===
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

interface AuthUser {
  id: number;
  username: string;
}
```

---

## Componentes Reutilizables

### Subtitle
```tsx
<Subtitle>Título de sección</Subtitle>
<Subtitle className="text-cyan-400">Con clase extra</Subtitle>
```

### ButtonWithIcon
```tsx
<ButtonWithIcon icon={<Icon size={18} />}>
  Texto del botón
</ButtonWithIcon>
```

### Blockquote
```tsx
<Blockquote className="max-w-xl border-l-4 border-orange-400">
  Texto de la cita
</Blockquote>
```

### List (Compound)
```tsx
<List>
  {items.map(item => (
    <List.ServiceCard key={item.id} service={item} />
  ))}
</List>
```

---

## Estado del Desarrollo

### Completado
- [x] HomePage con hero, stack, highlights y CTAs
- [x] AboutPage con skills, formación y valores
- [x] ContactPage con formulario y redes sociales
- [x] ServicesPage con 6 servicios y proceso de trabajo
- [x] ProjectsPage con intro, stats, lista de proyectos y quote
- [x] BlogPage con fetch desde API y diseño de cards
- [x] BlogPostPage con renderizado de Content Blocks (header, paragraph, code, image, video, quote)
- [x] LoginPage integrado con authStore y authService
- [x] NotFound (404) en español con sugerencias y navegación
- [x] Layout responsive con Navbar
- [x] Componentes reutilizables (Subtitle, ButtonWithIcon, etc.)
- [x] **Sistema de autenticación completo (JWT, Zustand, axios interceptors)**
- [x] **Tipos TypeScript sincronizados con backend**
- [x] **Todas las páginas con diseño unificado y responsive**
- [x] **ProtectedRoute para rutas que requieren autenticación**
- [x] **AdminPage - Panel de administración con lista de posts**
- [x] **PostEditorPage - Editor de posts estilo Medium con bloques**
- [x] **postService - CRUD completo de posts (create, read, update, delete)**
- [x] **contactService - Envio de formulario de contacto via Resend**

### Pendiente
- [ ] Crear custom hooks (useFetch, useForm)
- [ ] Añadir tests

---

## Mejoras Técnicas Pendientes

### Prioridad Alta
1. Unificar configuración de API (usar variables de entorno)
2. Eliminar `console.log` en producción

### Prioridad Media
1. Crear hook `useFetch` para llamadas API
2. Crear componente `FormInput` reutilizable
3. Centralizar datos estáticos en carpeta `/data`

### Prioridad Baja
1. Implementar tests con Vitest
2. Añadir lazy loading de imágenes
3. Considerar React Query para caché de API
4. Documentar componentes con JSDoc

---

## Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Build producción
pnpm build

# Preview build
pnpm preview

# Lint
pnpm lint

# Type check
pnpm exec tsc --noEmit
```

---

## Notas para el Desarrollo

1. **Contenido siempre en español**, código en inglés
2. **No usar emojis** en el código/UI a menos que se solicite
3. **Tailwind v4** no requiere archivo de configuración, usa CSS nativo
4. **React 19** soporta JSX transform automático (no importar React)
5. **Usar `cn()`** de `lib/utils.ts` para combinar clases
6. **Iconos de lucide-react** - Github y Linkedin están deprecated pero funcionan
7. **Administrador único:** Carlos Marquina es el único usuario del sistema

---

## Arquitectura de Páginas

Todas las páginas siguen esta estructura:

```tsx
export const PageName = () => {
  return (
    <>
      <Subtitle>Título</Subtitle>

      {/* Introducción */}
      <section className="space-y-2">
        <p className="text-lg text-amber-100/90">...</p>
        <p className="text-amber-100/70">...</p>
      </section>

      {/* Secciones con títulos */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
          <Icon className="text-orange-400" size={24} />
          Título sección
        </h3>
        {/* Grid o contenido */}
      </section>

      {/* Quote opcional */}
      <Blockquote>...</Blockquote>

      {/* Cierre */}
      <section className="pt-4 border-t border-neutral-700/50">
        <p className="text-amber-100/70 text-sm">...</p>
      </section>
    </>
  );
};
```

---

---

## Páginas - Detalle

### ProjectsPage
- Subtitle + introducción
- Stats (contador de proyectos)
- Lista con `List.ProjectCard` y carrusel de tech stack
- Quote motivacional
- Datos tipados con `Project[]` de types/

### NotFound (404)
- Título cyan para diferenciarse
- Icono AlertTriangle prominente
- Lista de sugerencias con bullets cyan
- Dos acciones: "Ir al inicio" (ButtonWithIcon) y "Volver atrás" (button secundario)

### LoginPage
- Formulario en card estilizada
- Inputs con iconos (Mail, Lock)
- Estados: `email`, `password`, `isSubmitting`, `error`
- Integrado con authStore y authService
- Muestra estado de sesión activa con opción de logout
- Redirige a home después de login exitoso

### AdminPage
- Panel de administración protegido
- Lista de posts con estado (publicado/borrador/archivado)
- Acciones: ver, editar, eliminar
- Link a crear nuevo articulo

### PostEditorPage
- Editor de bloques estilo Medium/CMS
- Usa `useReducer` para estado complejo
- Rutas: `/admin/posts/new` (crear) y `/admin/posts/:slug/edit` (editar)
- **Metadatos:** titulo (auto-genera slug), excerpt, cover image, status
- **Bloques soportados:** paragraph, header (H1-H6), image, code, video, quote
- **Controles:** mover arriba/abajo, eliminar bloque
- **Validaciones:** titulo min 3 chars, slug obligatorio, al menos 1 bloque con contenido
- **UX:** advertencia de cambios sin guardar, botones "Guardar borrador" y "Publicar"

---

## Sistema de Autenticación

### Archivos
```
src/
├── store/authStore.ts      # Zustand store con token, user, login, logout
├── services/authService.ts # Llamadas a API de auth
└── lib/axios.ts            # Interceptores para token automático
```

### authStore (Zustand)
```typescript
interface AuthState {
  token: string | null;
  user: AuthUser | null;       // { id, username }
  isAuthenticated: boolean;
  login: (token, user) => void;
  logout: () => void;
  initialize: () => void;      // Cargar desde localStorage
}

// Uso
const { isAuthenticated, user, login, logout } = useAuthStore();
```

### Flujo de autenticación
1. App.tsx llama `initialize()` al montar (carga token de localStorage)
2. Usuario va a `/login` y envía credenciales
3. authService.login() llama POST `/api/v1/auth/login`
4. Si éxito, decodifica JWT y llama `login(token, user)`
5. Token se guarda en localStorage y estado Zustand
6. axios interceptor añade `Authorization: Bearer <token>` a todas las requests
7. Si token expira o 401/403, se limpia auth y redirige a login

### localStorage keys
- `auth_token` - JWT token
- `auth_user` - JSON con { id, username }

### Helpers exportados
```typescript
import { decodeToken, isTokenExpired } from "../store/authStore";
```

---

## Backend - Referencia

**Ubicación:** `/Users/mordecai/dev/portablogio_backend`
**Stack:** Express 5.1 + TypeScript + PostgreSQL
**Puerto:** 3000

### Endpoints de la API

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| **AUTH** |
| POST | `/api/v1/auth/login` | No | Login, retorna JWT |
| POST | `/api/v1/auth/register` | No | Registro de usuario |
| **POSTS** |
| GET | `/api/v1/posts` | No | Listar posts publicados (paginado: ?limit=10&offset=0) |
| GET | `/api/v1/posts/:slug` | No | Detalle de post (incluye content) |
| POST | `/api/v1/posts` | JWT | Crear nuevo post |
| PUT | `/api/v1/posts/:slug` | JWT | Actualizar post existente |
| DELETE | `/api/v1/posts/:slug` | JWT | Eliminar post |
| **PROJECTS** |
| GET | `/api/v1/projects` | No | Listar proyectos |
| POST | `/api/v1/projects` | JWT | Crear proyecto |
| **SERVICES** |
| GET | `/api/v1/services` | No | Listar servicios activos |
| POST | `/api/v1/services` | JWT | Crear servicio |
| **CONTACT** |
| POST | `/api/v1/contact` | No | Enviar mensaje de contacto (envia email via Resend) |

### Respuestas de API

**GET /posts** (listado)
```json
{
  "data": [
    {
      "id": 1,
      "title": "Mi post",
      "slug": "mi-post",
      "excerpt": "Resumen...",
      "cover_image_url": "https://...",
      "created_at": "2025-01-22T12:00:00Z"
    }
  ]
}
```

**GET /posts/:slug** (detalle con content)
```json
{
  "data": {
    "id": 1,
    "title": "Mi post",
    "slug": "mi-post",
    "content": [
      { "id": "abc", "type": "header", "data": { "text": "Título", "level": 2 } },
      { "id": "def", "type": "paragraph", "data": { "text": "Contenido..." } },
      { "id": "ghi", "type": "code", "data": { "language": "typescript", "code": "..." } }
    ],
    ...
  }
}
```

**POST /auth/login**
```json
// Request
{ "email": "hola@miportafolio.com", "password": "..." }

// Response
{ "message": "Bienvenido", "token": "eyJhbG..." }
```

**POST /posts** (crear post)
```json
// Request
{
  "user_id": 1,
  "title": "Mi nuevo post",
  "slug": "mi-nuevo-post",
  "excerpt": "Resumen opcional",
  "content": [
    { "id": "abc123", "type": "paragraph", "data": { "text": "Contenido..." } }
  ],
  "cover_image_url": "https://...",
  "type": "blog",
  "status": "draft"
}

// Response
{ "message": "Post creado exitosamente", "data": { ...post } }
```

**PUT /posts/:slug** (actualizar post)
```json
// Request (campos opcionales, solo se actualizan los enviados)
{
  "title": "Titulo actualizado",
  "content": [...],
  "status": "published"
}

// Response
{ "message": "Post actualizado exitosamente", "data": { ...post } }
```

**DELETE /posts/:slug**
```json
// Response
{ "message": "Post eliminado exitosamente" }
```

### Autenticación JWT

- Token válido por **2 horas**
- Header requerido: `Authorization: Bearer <token>`
- Payload del token: `{ id, username, iat, exp }`

### Base de Datos (PostgreSQL)

**Tablas:**
- `users` - id, username, email, password_hash, created_at
- `posts` - id, user_id, title, slug, excerpt, **content (JSONB)**, cover_image_url, type, status, published_at, created_at
- `projects` - id, title, slug, description, **tech_stack (TEXT[])**, image_url, repo_url, live_url, is_featured
- `services` - id, title, description, price, currency, **features (JSONB)**, is_active

### Content Blocks (JSONB)

El campo `content` de posts es un array de bloques:

```typescript
type BlockType = 'paragraph' | 'header' | 'image' | 'code' | 'video' | 'quote';

// Ejemplos de bloques
{ "type": "header", "data": { "text": "Título", "level": 2 } }
{ "type": "paragraph", "data": { "text": "Contenido..." } }
{ "type": "code", "data": { "language": "typescript", "code": "const x = 1;" } }
{ "type": "image", "data": { "url": "https://...", "caption": "Mi imagen" } }
{ "type": "quote", "data": { "text": "Cita importante" } }
```

### Pendiente en Backend

- [x] PUT/DELETE para posts
- [ ] PUT/DELETE para projects y services
- [ ] Upload de imágenes (Multer/Cloudinary)
- [ ] Validación de input (Zod)
- [ ] Endpoint de contacto

---

*Última actualización: Enero 2026*
