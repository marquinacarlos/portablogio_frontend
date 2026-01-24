import { useEffect, useRef } from "react";
import { FileText, Link as LinkIcon, FileImage, Eye } from "lucide-react";
import type { PostStatus } from "../../types";

interface PostMetaFieldsProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  status: PostStatus;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
  onCoverImageUrlChange: (value: string) => void;
  onStatusChange: (value: PostStatus) => void;
  isEditing: boolean;
}

/**
 * Genera un slug URL-safe a partir de un titulo
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Solo letras, numeros, espacios y guiones
    .replace(/\s+/g, "-") // Espacios a guiones
    .replace(/-+/g, "-") // Multiples guiones a uno
    .replace(/^-|-$/g, ""); // Quitar guiones al inicio/final
};

const inputClasses =
  "w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-md text-amber-100 placeholder:text-amber-100/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors";

const labelClasses = "flex items-center gap-2 text-sm text-amber-100/80";

/**
 * Campos de metadatos del post (titulo, slug, excerpt, cover, status)
 */
export const PostMetaFields = ({
  title,
  slug,
  excerpt,
  coverImageUrl,
  status,
  onTitleChange,
  onSlugChange,
  onExcerptChange,
  onCoverImageUrlChange,
  onStatusChange,
  isEditing,
}: PostMetaFieldsProps) => {
  const debounceRef = useRef<number | null>(null);
  const slugManuallyEdited = useRef(false);

  // Auto-generar slug cuando cambia el titulo (solo si no se ha editado manualmente)
  useEffect(() => {
    if (isEditing || slugManuallyEdited.current) return;

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      const newSlug = generateSlug(title);
      if (newSlug && newSlug !== slug) {
        onSlugChange(newSlug);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [title, slug, onSlugChange, isEditing]);

  const handleSlugChange = (value: string) => {
    slugManuallyEdited.current = true;
    onSlugChange(generateSlug(value));
  };

  return (
    <div className="space-y-4 p-4 bg-neutral-900/30 border border-neutral-800 rounded-md">
      {/* Titulo */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <FileText size={16} className="text-cyan-400" />
          Titulo del articulo
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Escribe el titulo..."
          className={inputClasses}
          autoFocus
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <LinkIcon size={16} className="text-cyan-400" />
          URL del articulo
        </label>
        <div className="flex items-center gap-2">
          <span className="text-amber-100/50 text-sm">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="url-del-articulo"
            className={`${inputClasses} flex-1`}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <Eye size={16} className="text-cyan-400" />
          Resumen (opcional)
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Breve descripcion que aparecera en listados..."
          className={`${inputClasses} resize-none`}
          rows={2}
        />
      </div>

      {/* Cover Image URL */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <FileImage size={16} className="text-cyan-400" />
          Imagen de portada (URL)
        </label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => onCoverImageUrlChange(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          className={inputClasses}
        />
        {coverImageUrl && (
          <div className="mt-2 relative aspect-video max-w-xs overflow-hidden rounded border border-neutral-700">
            <img
              src={coverImageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className={labelClasses}>Estado</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={status === "draft"}
              onChange={() => onStatusChange("draft")}
              className="accent-cyan-400"
            />
            <span className="text-amber-100/80">Borrador</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="published"
              checked={status === "published"}
              onChange={() => onStatusChange("published")}
              className="accent-cyan-400"
            />
            <span className="text-amber-100/80">Publicado</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="archived"
              checked={status === "archived"}
              onChange={() => onStatusChange("archived")}
              className="accent-cyan-400"
            />
            <span className="text-amber-100/80">Archivado</span>
          </label>
        </div>
      </div>
    </div>
  );
};
