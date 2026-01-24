import api from "../lib/axios";
import type { BlogPost, CreatePostData, ApiResponse } from "../types";

/** Datos para actualizar un post */
export interface UpdatePostData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: BlogPost["content"];
  cover_image_url?: string;
  type?: BlogPost["type"];
  status?: BlogPost["status"];
}

export const postService = {
  /**
   * Obtener un post por su slug (incluye content)
   */
  getBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get<ApiResponse<BlogPost>>(`/posts/${slug}`);
    return response.data.data;
  },

  /**
   * Crear un nuevo post
   */
  create: async (data: CreatePostData): Promise<BlogPost> => {
    const response = await api.post<ApiResponse<BlogPost>>("/posts", data);
    return response.data.data;
  },

  /**
   * Actualizar un post existente
   */
  update: async (slug: string, data: UpdatePostData): Promise<BlogPost> => {
    const response = await api.put<ApiResponse<BlogPost>>(`/posts/${slug}`, data);
    return response.data.data;
  },

  /**
   * Eliminar un post
   */
  delete: async (slug: string): Promise<void> => {
    await api.delete(`/posts/${slug}`);
  },
};
