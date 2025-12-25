export interface Service {
  id: number;
  title: string;
  description?: string;
  price: number;
  features: string[] | null; // JSONB viene como array aquí
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
}