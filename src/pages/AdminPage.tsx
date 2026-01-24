import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Calendar,
  CheckCircle,
  Clock,
  Archive,
  Filter,
} from "lucide-react";
import { Subtitle } from "../components/Subtitle";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { useAuthStore } from "../store/authStore";
import api from "../lib/axios";
import type { BlogPostSummary, ApiResponse, PostStatus } from "../types";

type FilterOption = PostStatus | "all";

const statusConfig: Record<PostStatus, { label: string; icon: React.ReactNode; color: string }> = {
  published: {
    label: "Publicado",
    icon: <CheckCircle size={14} />,
    color: "text-green-400 bg-green-400/10 border-green-400/30",
  },
  draft: {
    label: "Borrador",
    icon: <Clock size={14} />,
    color: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  archived: {
    label: "Archivado",
    icon: <Archive size={14} />,
    color: "text-neutral-400 bg-neutral-400/10 border-neutral-400/30",
  },
};

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "published", label: "Publicados" },
  { value: "draft", label: "Borradores" },
  { value: "archived", label: "Archivados" },
];

export const AdminPage = () => {
  const { user, logout } = useAuthStore();
  const [posts, setPosts] = useState<(BlogPostSummary & { status: PostStatus })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get<ApiResponse<(BlogPostSummary & { status: PostStatus })[]>>("/posts/admin");
        setPosts(response.data.data);
      } catch {
        setError("Error al cargar los posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filtrar posts segun el filtro seleccionado
  const filteredPosts = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((post) => post.status === filter);
  }, [posts, filter]);

  // Contar posts por estado
  const counts = useMemo(() => {
    return {
      all: posts.length,
      published: posts.filter((p) => p.status === "published").length,
      draft: posts.filter((p) => p.status === "draft").length,
      archived: posts.filter((p) => p.status === "archived").length,
    };
  }, [posts]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("¿Estas seguro de que quieres eliminar este post?")) {
      return;
    }

    try {
      await api.delete(`/posts/${slug}`);
      setPosts(posts.filter((p) => p.slug !== slug));
    } catch {
      alert("Error al eliminar el post");
    }
  };

  return (
    <>
      <Subtitle>Panel de administración</Subtitle>

      {/* Header con info de usuario */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center">
            <LayoutDashboard className="text-cyan-400" size={20} />
          </div>
          <div>
            <p className="text-amber-100 font-medium">
              Bienvenido, {user?.username}
            </p>
            <p className="text-amber-100/50 text-sm">Administrador</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-amber-100/70 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </section>

      {/* Acciones rápidas */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
          <Plus className="text-orange-400" size={24} />
          Acciones rápidas
        </h3>

        <div className="flex flex-wrap gap-3">
          <Link to="/admin/posts/new">
            <ButtonWithIcon icon={<FileText size={18} />}>
              Nuevo artículo
            </ButtonWithIcon>
          </Link>
        </div>
      </section>

      {/* Lista de posts */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-amber-50 flex items-center gap-2">
          <FileText className="text-orange-400" size={24} />
          Mis articulos
          {posts.length > 0 && (
            <span className="text-sm font-normal text-amber-100/50">
              ({posts.length})
            </span>
          )}
        </h3>

        {/* Filtros con scroll horizontal */}
        {posts.length > 0 && (
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
            style={{
              maskImage: 'linear-gradient(to right, black calc(100% - 16px), transparent)',
              WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 16px), transparent)'
            }}
          >
            <Filter size={16} className="text-amber-100/50 shrink-0" />
            <div className="flex gap-1">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap shrink-0 ${
                    filter === option.value
                      ? "bg-cyan-400/20 border-cyan-400/50 text-cyan-400"
                      : "bg-neutral-800/50 border-neutral-700 text-amber-100/60 hover:border-neutral-600"
                  }`}
                >
                  {option.label}
                  <span className="ml-1 opacity-60">
                    ({counts[option.value]})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center gap-3 text-amber-100/70">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span>Cargando articulos...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Lista vacia */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-md text-center">
            <FileText className="mx-auto text-amber-100/30 mb-3" size={48} />
            <p className="text-amber-100/70">No hay articulos todavia.</p>
            <p className="text-amber-100/50 text-sm mt-1">
              Crea tu primer articulo
            </p>
            <Link to="/admin/posts/new" className="inline-block mt-4">
              <ButtonWithIcon icon={<Plus size={18} />}>
                Crear articulo
              </ButtonWithIcon>
            </Link>
          </div>
        )}

        {/* Lista filtrada vacia */}
        {!isLoading && !error && posts.length > 0 && filteredPosts.length === 0 && (
          <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-md text-center">
            <p className="text-amber-100/70">No hay articulos con este estado.</p>
          </div>
        )}

        {/* Lista de posts */}
        {!isLoading && !error && filteredPosts.length > 0 && (
          <ul className="space-y-3">
            {filteredPosts.map((post) => {
              const status = statusConfig[post.status || "draft"];
              return (
                <li
                  key={post.id}
                  className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-md hover:border-neutral-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Info del post */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-amber-100 font-medium truncate">
                          {post.title}
                        </h4>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border ${status.color}`}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-amber-100/50">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.created_at)}
                        </span>
                        <span className="truncate">/blog/{post.slug}</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="p-2 text-amber-100/50 hover:text-cyan-400 transition-colors"
                        title="Ver"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/posts/${post.slug}/edit`}
                        className="p-2 text-amber-100/50 hover:text-orange-400 transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="p-2 text-amber-100/50 hover:text-red-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Info */}
      <section className="pt-4 border-t border-neutral-700/50">
        <p className="text-amber-100/50 text-sm">
          Panel de administración del blog. Aquí puedes gestionar todos tus
          artículos.
        </p>
      </section>
    </>
  );
};
