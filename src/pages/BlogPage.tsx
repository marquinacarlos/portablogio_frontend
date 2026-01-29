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
        <p className="text-lg text-amber-100/90 leading-relaxed max-w-2xl">
          Artículos sobre desarrollo web, tecnología y aprendizajes.
        </p>
        <p className="text-amber-100/70 leading-relaxed max-w-2xl">
          Comparto experiencias, tutoriales y reflexiones sobre el mundo del
          desarrollo de software.
        </p>
      </section>

      {/* Estado de carga */}
      {isLoading && (
        <div className="flex items-center gap-3 text-amber-100/70">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Cargando artículos...</span>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 underline"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* Lista de posts */}
      {!isLoading && !error && posts.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
            <BookOpen className="text-orange-400" size={24} />
            Artículos recientes
          </h3>

          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="group p-4 bg-neutral-900/50 border border-neutral-800 rounded-md hover:border-orange-400/30 transition-colors"
              >
                <Link to={`/blog/${post.slug}`} className="block space-y-3">
                  {/* Imagen de portada */}
                  {post.cover_image_url && (
                    <div className="aspect-video overflow-hidden rounded-md bg-neutral-800">
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
                    <h4 className="text-lg font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                      {post.title}
                    </h4>

                    {post.excerpt && (
                      <p className="text-amber-100/70 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <time
                        dateTime={post.created_at}
                        className="flex items-center gap-1.5 text-amber-100/50 text-xs"
                      >
                        <Calendar size={14} />
                        {formatDate(post.created_at)}
                      </time>

                      <span className="flex items-center gap-1 text-cyan-400 text-sm group-hover:gap-2 transition-all">
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
        <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-md text-center">
          <BookOpen className="mx-auto text-amber-100/30 mb-3" size={48} />
          <p className="text-amber-100/70">
            Aún no hay artículos publicados.
          </p>
          <p className="text-amber-100/50 text-sm mt-1">
            ¡Vuelve pronto para ver nuevo contenido!
          </p>
        </div>
      )}

      {/* Quote */}
      <Blockquote className="max-w-xl border-l-4 border-orange-400">
        Escribir es pensar en voz alta. Compartir es aprender dos veces.
      </Blockquote>

      {/* Cierre */}
      <section className="pt-4 border-t border-neutral-700/50">
        <p className="text-amber-100/70 text-sm leading-relaxed max-w-2xl">
          ¿Tienes algún tema que te gustaría que escribiera? Contáctame y
          cuéntame tus ideas.
        </p>
      </section>
    </>
  );
};
