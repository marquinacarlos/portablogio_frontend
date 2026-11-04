import api from "../lib/axios";
import type { BlogPost, CreatePostData, ApiResponse } from "../types";

/** Data to update a post */
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
   * Get a post by its slug (includes content)
   */
  getBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get<ApiResponse<BlogPost>>(`/posts/${slug}`);
    return response.data.data;
  },

  /**
   * Create a new post
   */
  create: async (data: CreatePostData): Promise<BlogPost> => {
    const response = await api.post<ApiResponse<BlogPost>>("/posts", data);
    return response.data.data;
  },

  /**
   * Update an existing post
   */
  update: async (slug: string, data: UpdatePostData): Promise<BlogPost> => {
    const response = await api.put<ApiResponse<BlogPost>>(`/posts/${slug}`, data);
    return response.data.data;
  },

  /**
   * Delete a post
   */
  delete: async (slug: string): Promise<void> => {
    await api.delete(`/posts/${slug}`);
  },
};
