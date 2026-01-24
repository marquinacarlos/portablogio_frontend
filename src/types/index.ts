// =============================================================================
// TIPOS SINCRONIZADOS CON BACKEND (portablogio_backend)
// =============================================================================

// -----------------------------------------------------------------------------
// BLOG - Content Blocks (JSONB)
// -----------------------------------------------------------------------------

export type BlockType = "paragraph" | "header" | "image" | "code" | "video" | "quote";

export interface ContentBlock {
  id: string;
  type: BlockType;
  data: {
    text?: string;      // paragraph, header, quote
    level?: number;     // header (1-6)
    url?: string;       // image, video
    caption?: string;   // image, video
    language?: string;  // code (js, ts, sql, css, python, etc.)
    code?: string;      // code content
  };
}

// -----------------------------------------------------------------------------
// BLOG - Post
// -----------------------------------------------------------------------------

export type PostType = "blog" | "collaboration";
export type PostStatus = "draft" | "published" | "archived";

/** Post completo (usado en detalle /blog/:slug) */
export interface BlogPost {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: ContentBlock[];
  cover_image_url?: string;
  type: PostType;
  status: PostStatus;
  published_at?: string;
  created_at: string;
  updated_at?: string;
}

/** Post resumido para listados (sin content) */
export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image_url?: string;
  created_at: string;
}

/** Datos para crear un nuevo post */
export interface CreatePostData {
  user_id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: ContentBlock[];
  cover_image_url?: string;
  type?: PostType;
  status?: PostStatus;
}

// -----------------------------------------------------------------------------
// PROYECTOS
// -----------------------------------------------------------------------------

export interface Project {
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

export interface CreateProjectData {
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  image_url?: string;
  repo_url?: string;
  live_url?: string;
  is_featured?: boolean;
}

// -----------------------------------------------------------------------------
// SERVICIOS
// -----------------------------------------------------------------------------

export interface Service {
  id: number;
  title: string;
  description?: string;
  price: number;
  currency?: string;
  features: string[] | null;
  is_active?: boolean;
}

export interface CreateServiceData {
  title: string;
  description?: string;
  price: number;
  features?: string[];
}

// -----------------------------------------------------------------------------
// AUTENTICACIÓN
// -----------------------------------------------------------------------------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface AuthUser {
  id: number;
  username: string;
}

// -----------------------------------------------------------------------------
// API RESPONSES
// -----------------------------------------------------------------------------

/** Respuesta genérica de la API */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Respuesta de error de la API */
export interface ApiError {
  error: string;
}
