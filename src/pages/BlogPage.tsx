import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { Blockquote } from "../components/Blockquote";
import { API_URL } from "../config/api";
import type { BlogPostSummary, ApiResponse } from "../types";

export const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result: ApiResponse<BlogPostSummary[]> = await response.json();
        setPosts(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Subtitle>Blog</Subtitle>

      {/* Introducción */}
      <section className="space-y-2">
        <p className="text-lg text-text-primary/90 leading-relaxed max-w-2xl">
          Artículos sobre desarrollo web, tecnología y aprendizajes.
        </p>
        <p className="text-text-secondary leading-relaxed max-w-2xl">
          Comparto experiencias, tutoriales y reflexiones sobre el mundo del
          desarrollo de software.
        </p>
      </section>

      {/* Estado de carga */}
      {isLoading && (
        <div className="flex items-center gap-3 text-text-secondary">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span>Cargando artículos...</span>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-md">
          <p className="text-error">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-accent hover:text-accent-hover underline"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* Lista de posts */}
      {!isLoading && !error && posts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <BookOpen className="text-brand" size={24} />
            Artículos recientes
          </h3>

          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="group p-4 bg-surface/50 border border-border-subtle rounded-md hover:border-brand/30 transition-colors"
              >
                <Link to={`/blog/${post.slug}`} className="block space-y-3">
                  {/* Imagen de portada */}
                  {post.cover_image_url && (
                    <div className="aspect-video overflow-hidden rounded-md bg-surface-hover">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-brand group-hover:text-brand-hover transition-colors">
                      {post.title}
                    </h4>

                    {post.excerpt && (
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <time
                        dateTime={post.created_at}
                        className="flex items-center gap-1.5 text-text-muted text-xs"
                      >
                        <Calendar size={14} />
                        {formatDate(post.created_at)}
                      </time>

                      <span className="flex items-center gap-1 text-accent text-sm group-hover:gap-2 transition-all">
                        Leer más
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sin posts */}
      {!isLoading && !error && posts.length === 0 && (
        <div className="p-6 bg-surface/50 border border-border-subtle rounded-md text-center">
          <BookOpen className="mx-auto text-text-muted/50 mb-3" size={48} />
          <p className="text-text-secondary">
            Aún no hay artículos publicados.
          </p>
          <p className="text-text-muted text-sm mt-1">
            ¡Vuelve pronto para ver nuevo contenido!
          </p>
        </div>
      )}

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Escribir es pensar en voz alta. Compartir es aprender dos veces.
      </Blockquote>

      {/* Cierre */}
      <section className="pt-4 border-t border-border/50">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl">
          ¿Tienes algún tema que te gustaría que escribiera? Contáctame y
          cuéntame tus ideas.
        </p>
      </section>
    </>
  );
};
